<template>
  <div>
    <h2>管理服务器</h2>
    <el-button type="primary" @click="dialogFormVisible = true; editIndex = -1">添加</el-button>

    <el-dialog title="添加服务器" :visible.sync="dialogFormVisible">

      <el-form :model="newServer">
        <el-form-item label="Name" label-width="80px">
          <el-input v-model="newServer.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Host" label-width="80px">
          <el-input v-model="newServer.host" :min="1" :max="65535"></el-input>
        </el-form-item>
        <el-form-item label="Port" label-width="80px">
          <el-input-number v-model="newServer.port" auto-complete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="Secret" label-width="80px">
          <el-input type="password" v-model="newServer.secret" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; addServer()">确 定</el-button>
      </div>
    </el-dialog>

    <ul>
      <li v-for="(server, idx) of servers" :key="idx">
        名称: {{ server.name }}
        域名: {{ server.host }}
        端口: {{ server.port}}
        密码: <input type="password" :value="server.secret" />
        <button @click="removeServer(idx)">删除</button>
        <button @click="editServer(idx)">编辑</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    var servers = JSON.parse(localStorage.getItem('aria2Servers')) || []
    // jsonparse不能解析undefined 用getItem就能返回null，而null是能解析的
    return {
      servers: servers,
      dialogFormVisible: false,
      editIndex: -1, // 当前正在编辑的服务器下标，如果是-1表示添加
      newServer: {
        name: '',
        host: '127.0.0.1',
        port: 6800,
        secret: '',
      }
    }
  },
  watch: {
    servers(servers) {
      console.log('servers changed....')
      localStorage.setItem('aria2Servers', JSON.stringify(servers))
      this.$emit('servers-changed', this.servers)
    },
  },
  methods: {
    async removeServer(idx) {
      try {
        await this.$confirm('确定要删除吗？')
        this.servers.splice(idx, 1)
      } catch(e) {
        if (e == 'cancel') {

        } else {
          throw e
        }
      }
    },
    editServer(idx) {
      this.editIndex = idx
      var targetServer = this.servers[idx]

      Object.assign(this.newServer, targetServer)

      this.dialogFormVisible = true
    },// 显示编辑页面，并将当前编辑的服务器信息传到编辑页面
    addServer() {
      if (this.editIndex == -1) { // 添加服务器
        this.servers.push(this.newServer)
        this.newServer = {
          host: '127.0.0.1',
          port: 6800,
          secret: '',
        }
      } else { // 修改现存的服务器
        console.log('changed server')
        // this.servers[this.editIndex] = this.newServer
        this.servers.splice(this.editIndex, 1, this.newServer)
        // Vue.set(this.servers, this.editIndex, this.newServer)
        this.newServer = {
          host: '127.0.0.1',
          port: 6800,
          secret: '',
        }
      }
    }
  },
}
</script>
