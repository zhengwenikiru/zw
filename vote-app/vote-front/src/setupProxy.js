const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = function(app){
  app.use(
    createProxyMiddleware('/account',{target:'http://localhost:8080'}),
    createProxyMiddleware('/vote',{target:'http://localhost:8080'}),
    createProxyMiddleware('/realtime-voteinfo',{target:'ws://localhost:8080',ws:true})
  )
}

//该文件内的中间件函数会在其他其他中间件函数之前执行