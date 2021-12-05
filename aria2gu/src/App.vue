<style lang="less">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.main {
  flex-grow: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  display: flex;
  h2 {
    margin: 0;
  }
}

#nav {
  width: 120px;
  border-right: 1px solid;
  padding: 10px;
  flex-grow: 0;
  flex-shrink: 0;

  a {
    display: block;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.global-stat {
  text-align: right;
}
</style>
<template>
  <div id="app">
    <div class="main">
      <div id="nav">
        <select v-model="selectedServer" @change="switchServer">
          <option v-for="(server, idx) of servers" :value="server" :key="idx">{{ server.name || (server.host + ':' + server.port) }}</option>
        </select>
        {{ connectionStatus }}
        <router-link to="/">正在下载({{ -(-globalStat.numWaiting - globalStat.numActive) }})</router-link>
        <router-link to="/completed">已完成({{ globalStat.numStopped }})</router-link>
        <router-link to="/new">新建下载</router-link>
        <router-link to="/settings">设置</router-link>
        <router-link to="/servers">服务器列表</router-link>
      </div>
      <router-view :aria2="aria2" @servers-changed="servers = $event"/>
    </div>
    <div class="global-stat">全局上传速度: {{  globalStat.uploadSpeed  }} 全局下载速度: {{globalStat.downloadSpeed}}</div>
  </div>
</template>
<script>
import Aria2Client from './aria2-client.js'

export default {
  data() {
    var servers = JSON.parse(localStorage.getItem('aria2Servers')) || []
    return {
      globalStat: {},
      servers: servers,
      selectedServer: null,
      connectionStatus: '连接中...',
      aria2: null,
    }
  },
  methods: {
    async switchServer() {
      console.log('switch server')
      console.log('关闭现有服务器...')
      this.aria2?.close()

      this.globalStat = {}

      console.log('连接新的服务器...')
      this.connectionStatus = '连接中...'
      var aria2 = new Aria2Client(this.selectedServer)

      this.aria2 = aria2

      try {
        await aria2.ready()
        this.connectionStatus = '已连接'
      } catch(e) {
        this.connectionStatus = '连接失败'
      }
    },
    startIntervalUpdate() {
      this.intervalId = setInterval(async () => {
        try {
          this.globalStat = await this.aria2.getGlobalStat()
        } catch(e) {
          if (e == 'WS_CONNECTION_ERROR') {
            this.$alert('连接失败')
            console.log(this.intervalId)
            clearInterval(this.intervalId)
          } else {
            throw e
          }
        }
      }, 3000)
      console.log('app interval id', this.intervalId)
    }
  },
  created() {
    console.log('app created')
    this.selectedServer = this.servers[0]
    this.switchServer()
  },
  async mounted() {

    this.aria2.on('DownloadStart', async task => {
      console.log('有任务开始了', task.gid)
      this.globalStat = await this.aria2.getGlobalStat()
    })
    this.aria2.on('DownloadComplete', async task => {
      console.log('有任务完成了', task.gid)
      this.globalStat = await this.aria2.getGlobalStat()
    })


    try {
      this.globalStat = await this.aria2.getGlobalStat()
      this.startIntervalUpdate()

    } catch(e) {
      if (e == 'WS_CONNECTION_ERROR') {
        this.$alert('连接失败')
      } else {
        throw e
      }
    }
  },
  watch: {
    async aria2() {
      clearInterval(this.intervalId)
      this.globalStat = await this.aria2.getGlobalStat()
      this.startIntervalUpdate()
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
}
</script>
