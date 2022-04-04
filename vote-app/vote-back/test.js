const express = require('express')
const multer = require('multer')
const svgCaptcha = require('svg-captcha')
const cookieParser = require('cookie-parser')
const db = require('./db')
const accountRouter = require('./account')
const cors = require('cors')
const { WebSocketServer } = require('ws')
const http = require('http')
const server = http.createServer()
const querystring = require('querystring')
const _ = require('lodash')

const app = express()
const port = 8080

const cookieSecret = 'cookie sign secret'

//WebSocketServer 接管了server的upgrade事件，而不是接管了express的upgrade事件
const wss = new WebSocketServer({server})

//设置一个从投票id映射到响应这个投票最新信息的websocket
//因为查看同一个投票的请求可能有多个
const voteWsMap = {
  //2:[ws,ws]
  //3:[ws,ws,ws]
}

//ws://localhost:3000/realtime-voteinfo/2
wss.on('connection',(ws,req) =>{
  //此处的req不是express的，而是httpserver的
console.log('尝试连接')

var parsedCookie = cookieParser.signedCookies(querystring.parse(req.headers.cookie, '; '), cookieSecret)
console.log('cookie',req.headers.cookie)
  console.log(parsedCookie)
//cookieParser.signedCookie是用于解密cookie的
//将cookie字符串传给querystring解析出对象
  var loginUserName = parsedCookie.loginUser

  if(!loginUserName){
    ws.close()
    return
  }

  var user = db.prepare('SELECT * FROM users WHERE name = ?').get(loginUserName)
  ws.user = user


  //必须匹配到这种形式的地址才可以连接
  if(req.url.match(/^\/realtime-voteinfo\/\d+$/)){
    var voteId= req.url.match(/\d+$/)
    //ws需要保存起来以便每次最新的数据更新时发给该ws
    console.log('连接上了')
    if(voteWsMap[voteId]){
      voteWsMap[voteId].push(ws)
    }else{
      voteWsMap[voteId] = [ws]
    }

    //当连接断开时，从映射中删除这个ws连接
    ws.on('close',()=>{
      var idx = voteWsMap[voteId].indexOf(ws)
      voteWsMap[voteId].splice(idx,1)
    })
  }else{
    ws.close()
  }
})


app.use(cors({
  maxAge:86400,//预检请求的有效期，在该时间段内不会再次发送预检请求 单位为s 
  origin:true,//写为true时，响应头的Access-Control-Allow-Origin为请求者的域
 credentials:true//让预检请求的响应中有ACA-Credentials:true这个头，以允许跨域请求带上cookie
}))

let storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,__dirname + '/uploads')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+'-'+Math.random().toString(16).slice(2)+Path2D.extname(file.originalname))
  }
})

const upload = multer({storage:storage})

app.use((req,res,next) => {
  console.log(req.method,req.url)
  next()
})

app.use(express.static(__dirname + '/build'))
app.use(cookieParser('cookie sign secert')) // 解析cookie，可以给cookie签名
app.use('/uploads', express.static(__dirname + '/uploads')) // 用于响应用户上传的文件
app.use(express.json()) // 解析json请求体的中间件
app.use(express.urlencoded({extended:true})) // 解析url编码请求体的中间件

// 将用户是否登陆放到req的isLogin字段上的中件间
// 查出已登陆用户放到loginUser上
app.use((req, res, next) => {
  if (req.signedCookies.loginUser) {
    var name = req.signedCookies.loginUser
    req.isLogin = true
    req.loginUser = db.prepare('SELECT * FROM users WHERE name = ?').get(name)
  } else {
    req.isLogin = false
    req.loginUser = null
  }
  next()
})

app.use('/account',accountRouter)
//当使用use时，acconutRouter这个中间件读到的是/account路径后面的东西
//请求路径为/account时，会进入account文件中，再根据后续的路径选择中间件



//Restful模式
//POST /vote  创建投票，信息在请求体
//GET  /vote/8  获取投票题目8的信息
//DELETE  /vote/8 删除8号投票
//PUT  /vote/8  修改投票，信息在请求体


//返回当前登陆用户创建的所有投票
app.get('/vote',(req,res,next) => {
  if (req.loginUser) {
    var votes = db.prepare('SELECT * FROM votes WHERE userId = ?').all(req.loginUser.userId)
    res.json({
      code:0,
      result:votes
    })
  }else{
    res.status(403).json({
      code:-1,
      msg:'user not login'
    })
  }
})







//axios的请求体是json形式发过来的
//向/vote地址发送post请求时走下面的中间件
app.post('/vote',(req,res,next)=>{
  var vote = req.body
console.log(vote)
  var userId = req.loginUser?.userId
  console.log(req.loginUser)
  if(userId!=undefined){
    var stmt = db.prepare('INSERT INTO votes (userId,title,desc,deadline, anonymous, multiple) VALUES(?,?,?,?,?,?)')
    var result = stmt.run(req.loginUser.userId,vote.title,vote.desc,vote.deadline,Number(vote.anonymous),Number(vote.multiple))
    var voteId = result.lastInsertRowid
    console.log(voteId)
    var stmt2 = db.prepare('INSERT INTO options (voteId,content) VALUES (?,?)')
    for(var option of vote.options){
      stmt2.run(voteId,option)
    }
    res.json({
      code:0,
      result:{
        voteId,
      }
    }
    )
  }else{
    res.json({
      code:-1,
      msg:"无用户登陆"
    })
  }
})

//拿到对应voteId的投票信息
//从浏览器url里拿到请求的投票id，从数据库的投票表里拿到对应的投票，
//从另一个表里拿到对应投票的选项，然后挂载响应体的result字段上传给前端。
app.get('/vote/:voteId',(req,res,next)=>{
  var {voteId} = req.params
  var vote = db.prepare('SELECT * FROM votes WHERE voteId = ?').get(voteId)
  if(vote){
    var options = db.prepare('SELECT * FROM options WHERE voteId = ?').all(voteId)
    var userVotes = db.prepare('SELECT optionId,avatar,voteOptions.userId FROM voteOptions JOIN users ON voteOptions.userId  WHERE voteId = ?').all(voteId)
    console.log(vote,options)

    if(vote.anonymous && req.loginUser.userId !=vote.userId){//匿名且登陆用户不是投票的创建者
      userVotes.forEach(it=>{
        if(it.userId !==req.loginUser.userId){
          //不是当前登陆用户的投票信息置为*
          it.userId = '*'
          it.avatar = '*'
        }
      })
    }
    res.json({
      code:0,
      result:{
        vote,
        options,
        userVotes
      }
    })
  } //多条记录用all，get只能拿到一条记录
  else{
    res.status(404).json({
      code:-1,
      msg:'can not find this vote:' +voteId
    })
  }
})

//删除记录
app.delete('/vote/:voteId',(req,res,next)=>{
if(req.loginUser){
  var { voteId } = req.params
  var vote = db.prepare('SELECT FROM votes WHERE voteId = ?').run(voteId)
  if(vote.userId = req.loginUser.userId){//登陆的用户ID与投票的用户ID匹配，删除投票
    db.prepare('DELETE FORM votes WHERE voteId = ?').run(voteId)
  }else{
    res.status(401).json({
      code:-1,
      msg:'当前投票不是您所创建'
  })
}
}else{
  res.status(401).json({
    code:-1,
    msg:'未登陆'
  })
}
})

  


//更新当前登陆用户对voteId问题的optionId选项的投递情况
//匿名的情况下无法更新
app.post('/vote/:voteId',(req,res,next)=>{
  var { voteId } = req.params
  var { optionIds } = req.body
  //如果请求体没有选项
  if(optionIds.length == 0){
    res.status(401).json({
      code:-1,
      msg:'必须有选项'
    })
  }

  var optionId = optionIds[0]//单选只有一个ID

  var userId = req.loginUser?.userId

  console.log('投票时的用户id',userId)

//如果用户未登陆，则不能投票
  if(!userId){
    res.status(401).json({
      code:-1,
      msg:'user not login'
    })
    return
  }
  var vote = db.prepare('SELECT * FROM votes WHERE voteId = ?').get(voteId)
  if(vote){
    //投票超过了截止时间
    if(Date.now()>new Date(vote.deadline).getTime()){
      res.status('403').json({
        code:-1,
        msg:'vote deadline passed'
      })
      return
    }
    var multiple = vote.multiple
    if(multiple){//多选
      //匿名投票
      if(vote.anonymous){
        let voted = db.prepare('SELECT * FROM voteOptions WHERE  userId = ? AND voteId = ?').get(userId,voteId)
        if(voted){//投票已存在
          res.status(403).json({
            code:-1,
            msg:'当前用户已投过该匿名投票'
          })
        }else{//投票不存在
          let insertVotes = db.prepare('INSERT INTO voteOptions (userId, voteId,optionId) VALUES (?,?,?)')
          optionIds.forEach(optionId => {
            insertVotes.run(userId,voteId,optionId)
          });//该用户该投票下所有投的选项插入
          res.end()
        }
      }else{
        //检查用户是否已投过该选项
      var voted = db.prepare('SELECT * FROM voteOptions WHERE userId = ? AND voteId = ? AND optionId = ?')
      .get(userId,voteId,optionId)
      if(voted){
        //删除投过的这行
        db.prepare('delete from voteOptions where voteOptionId = ?').run(voted.voteOptionId)
      }else{//没投过，则增加一行记录
        db.prepare('INSERT INTO voteOptions (userId, voteId, optionId) VALUES (?,?,?)')
          .run(userId,voteId,optionId)
      }
      res.end()
      }    
    }else{//单选
      let voted = db.prepare('select * from voteOptions where userId = ? and voteId = ?')
      .get(userId,voteId)
      if(voted){//投过，修改或取消

        //匿名且单选
        if(vote.anonymous){
          res.status(403).json({
            code: -1,
            msg:'匿名投票已投过，无法修改!'
          })
        }else{
            if(voted.optionId == optionId){//已经投的就是这次点击的，则直接取消
          //取消
          db.prepare('DELETE FROM voteOptions WHERE voteOptionId = ?').run(voted.voteOptionId)
        }else{
          //修改
          db.prepare('UPDATE voteOptions SET optionId = ? WHERE voteOptionId = ?').run(optionId,voted.voteOptionId)
        }
        }
      }else{//没投过
        db.prepare('insert into voteOptions (userId, voteId,optionId) values (?,?,?)')
        .run(userId,voteId,optionId)
      }
      res.end()
    }
    //拿到最新数据，发给对应的WS
    var userVotes = db.prepare(`
    SELECT optionId,avatar,voteOptions.userId
    FROM voteOptions
    JOIN users
    ON voteOptions.userId = users.userId
    WHERE voteId = ?
    `).all(voteId)

    if(voteWsMap[voteId]){
      voteWsMap[voteId].forEach(ws =>{
        var userId =ws.user.userId
        var cloned = _.cloneDeep(userVotes)
//深度克隆一份数据发给前端
        //匿名登陆下，当前用户不是该投票的创建者，隐藏其他用户的信息
        if(vote.anonymous && userId !== vote.userId){
          cloned.forEach(it =>{
            if(it.userId !==userId){
              it.userId = '*'
              it.avatar = '*'
            }
          })
        }
        ws.send(JSON.stringify(cloned))
      })
    }

  }else{//投票不存在
    res.status(404).json({
      code:-1,
      msg:'vote'+voteId+'not exist'
    })
  }
})



//上传数据
app.post('/upload', upload.any(), (req, res, next) => {
  var files = req.files
  // console.log(files)
  var urls = files.map(file => `/uploads/` + file.filename)
  res.json(urls)
})

app.use(function (req,res,next){
  res.end('ok')
})

//将express创建的app绑定到http server的request事件上
server.on('request',app)

server.listen(port,()=>{
  console.log('vote app listening on port',port)
})
//express监听端口是用的http服务器，如果还需要在同一个端口跑ws服务器。