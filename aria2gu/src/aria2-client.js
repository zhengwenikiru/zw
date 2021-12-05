import EventEmitter from 'events'

class Aria2Client extends EventEmitter {
  constructor(options) {
    super()
    this.options = options
    this.websocket = new WebSocket(`ws://${options.host}:${options.port}/jsonrpc`)

    this.connectPromise = new Promise((resolve, reject) => {
      this.websocket.addEventListener('open', () => {
        resolve()
      })
      this.websocket.addEventListener('error', (e) => {
        reject('WS_CONNECTION_ERROR')
      })
    })

    this.lastId = 1

    this.callbacks = {} // 存放每个请求的回调函数

    this.websocket.addEventListener('message', e => {
      var data = JSON.parse(e.data)
      // 收到的消息中带有method字段，说明是事件
      if (data.method && data.method.startsWith('aria2.on')) {
        // 在client上触发相应的事件，监听相应事件的地方可以触发回调了

        // 触发用on绑定的相应事件，此处事件名称不带on，所以是slice(8)
        this.emit(data.method.slice(8), ...data.params)

        // 触发用 client.onDownloadStart 绑定的相应事件
        // 此处事件名称是带on的，所以是slice(6)
        var handler = this[data.method.slice(6)]
        if (typeof handler === 'function') {
          handler(...data.params)
        }
      } else {
        var callback = this.callbacks[data.id] // 通过响应消息的id在callbacks里查出对应请求的回调
        delete this.callbacks[data.id] // 从callbacks里删除这个回调
        if (typeof callback == 'function') {
          callback(data)
        }
      }
    })
  }
  ready() {
    return this.connectPromise
  }
  close() {
    this.websocket.close()
    return new Promise((resolve, reject) => {
      this.websocket.addEventListener('close', () => {
        resolve()
      })
    })
  }
}

;[
  "addUri",
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
  "saveSession"
].forEach(methodName => {
  Aria2Client.prototype[methodName] = function (...args) {
    return this.connectPromise.then(() => {
      return new Promise((resolve, reject) => {
        var id = this.lastId++
        this.callbacks[id] = function(data) {
          if (data.error) {
            reject(data.error)
          } else {
            resolve(data.result)
          }
        }
        if (this.websocket.readyState === WebSocket.OPEN) {
          this.websocket.send(JSON.stringify({
            jsonrpc: '2.0',
            id: id,
            method: `aria2.${methodName}`,
            params: [`token:${this.options.secret}`, ...args]
          }))
          console.log('after send')
        } else {
          reject('WS_CONNECTION_ERROR')
        }
      })
    })
  }

  // Aria2Client.prototype[methodName + 'post'] = function (...args) {
  //   return new Promise((resolve, reject) => {
  //     var xhr = new XMLHttpRequest()
  //     xhr.open('post', `http://${this.options.host}:${this.options.port}/jsonrpc`)
  //     xhr.setRequestHeader('content-type', 'application/json')
  //     xhr.onload = function () {
  //       var data = JSON.parse(xhr.responseText)
  //       if (data.errro) {
  //         reject(data.error)
  //       } else {
  //         resolve(data.result)
  //       }
  //     }
  //     xhr.send(JSON.stringify(
  //         {
  //             jsonrpc: '2.0',
  //             id: this.lastId++,
  //             method: `aria2.${methodName}`,
  //             params: ['token:abcdefg', ...args],
  //         }
  //     ))
  //   })
  // }
})

export default Aria2Client
