// import { reject } from "core-js/fn/promise"

class Aria2Client{
  constructor(options){
    this.options = options
    this.websocket = new WebSocket(`ws://${options.host}:${options.port}/jsonrpc`) 
    // 只有websocket连接上了才会resolve
    this.connectPromise = new Promise(resolve =>{
      this.websocket.addEventListener('open',()=>{
        resolve()
      })
    })// 只考虑连接成功的情况
    this.lastId = 1
  // 标记每个请求的ID  如果采用Http，单向传输，每次创建的都是新连接就不用标记
    this.callbacks = {}
    // 存放每个请求的回调

   
// 根据接收到的消息的id属性，调用相应的回调函数
    this.websocket.addEventListener('message',e=>{
      var data = JSON.parse(e.data)
      var callback  = this.callbacks[data.id]
      delete this.callbacks[data.id]

      if(typeof callback == 'function'){
        callback(data)
      }
    })
  }
}


  ["addUri",
    "addTorrent",
    "getPeers",
    "addMetalink",
    "remove",
    "pause",
    "forcePause",
    "pauseAll",
    "forcePauseAll",
    "unpause",
    "unpauseAll",
    "forceRemove",
    "changePosition",
    "tellStatus",
    "getUris",
    "getFiles",
    "getServers",
    "tellActive",
    "tellWaiting",
    "tellStopped",
    "getOption",
    "changeUri",
    "changeOption",
    "getGlobalOption",
    "changeGlobalOption",
    "purgeDownloadResult",
    "removeDownloadResult",
    "getVersion",
    "getSessionInfo",
    "shutdown",
    "forceShutdown",
    "getGlobalStat",
    "saveSession",
].forEach(methodName => {
  Aria2Client.prototype[methodName] = function(...args){
    return this.connectPromise.then(()=>{
      return new Promise((resolve,reject)=>{
        var id = this.lastId++
        this.callbacks[id] = function(data){
          if(data.error){
            reject(data.error)
          }else{
            resolve(data.result)
          }
        }
        // 向后端发一个JSON对象
        this.websocket.send(JSON.stringify({
          jsonrpc:'2.0',
          id:id,
          method: `aria2.${methodName}`,
          params:[`token:${this.options.secret}`,...args]
        }))
      })
    })
  }
})
// 根据每个请求返回一个promise，
export default  Aria2Client


