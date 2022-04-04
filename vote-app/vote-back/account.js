//账户系统中间件


const express = require('express')
const db = require('./db')
const md5 = val=>val

const app = express.Router()


//用post方法向‘/register’地址发请求，走后面的中间件
//注册
app.post('/register',((req,res,next)=>{
  var regInfo = req.body

  var USERNAME_RE = /^[0-9a-z_]+$/i
  if(!USERNAME_RE.test(regInfo.name)){
    res.status(400).json({
      code:-1,
      msg:'username invalid,can only contain digit and letter and "_"'
    })
  }else if (regInfo.password == 0){
    res.status(400).json({
      code:-1,
      msg:'password may not be empty'
  }) 
  }else{
    var addUser = db.prepare('INSERT INTO users (name, password, email, avatar) VALUES (?, ?, ?, ?)')
    var result = addUser.run(regInfo.name, md5(regInfo.password), regInfo.email, regInfo.avatar)
    console.log(result)
    res.json({
      code: 0,
      result: {},
    })
  }
}))

//用post方法向/login发请求，走后面的中间件
//登陆
app.post('/login',(req,res,next)=>{
  var loginInfo = req.body
  var user = db.prepare('select * from users where name = ? and  password = ?').get(loginInfo.name, md5(loginInfo.password))
  // var user = db.exec("select * from users where name = ? and password = ?",(loginInfo.name,loginInfo.password))
//从数据库里选出所有的
  if(user){
    res.cookie('loginUser',user.name,{
      signed:true
    })
    res.json({
      code:0,
      result:user
    })
  }else{
    res.status(400).json({
      code:-1,
      msg:'username of password incorrect'
    })
  }
})

//获取当前可能已经登陆的用户信息
app.get('/current-user',(req,res,next)=>{
  if(req.loginUser){//在app的第一个中间件里已经拿到了
    var{userId, name, avatar} = req.loginUser
    res.json({
      code:0,
      result:{
        userId,
        name,
        avatar,
      }
    })
  }else{
    res.status(404).json({
      code:-1,
      msg:'No Login'
    })
  }
})

//登出
app.get('/logout',(req,res,next)=>{
  res.clearCookie('loginUser')
  res.json({
    code:0,
    result:{}
  })
})

module.exports = app
//在另一个文件中可以通过require('./account')来引用app这个对象。