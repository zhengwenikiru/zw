<style lang="less" scoped>
  ul {
    list-style: none;
  }
  li {
    /* display: flex; */
    cursor: pointer;
    &.selected {
      background-color: #ddd;
    }
    &:hover {
      background-color: #eee;
    }
  }
</style>
<template>
  <div class="downloading">
    <h2>正在下载</h2>
    <div>
      <button @click="execSelected('pause')">暂停</button>
      <button @click="execSelected('unpause')">开始</button>
      <button @click="execSelected('remove')">删除</button>
      <button @click="selectAll">全选</button>
      搜索: <input type="text" v-model="searchText"/>
    </div>
    <ul>
      <li v-for="task of visibleTasks" :class="{selected: selected.includes(task.gid)}" :key="task.gid" @click="toggleSelect(task)">
        <input type="checkbox" :checked="selected.includes(task.gid)" >
        <span>{{ getFilename(task) }}</span>
        |
        <span>{{ getPercent(task) }}</span>
        |
        <span>{{ task.downloadSpeed / 1024 | fixed }}k/s</span>
        |
        <span>{{ task.status }}</span>
        |
        <!-- <button @click.stop="goDetail(task)">详情</button> -->
        <router-link @click.native.stop :to="{name: 'taskDetail', params: {gid: task.gid}}">详情</router-link>
      </li>
    </ul>

    <div>当前排序列：{{ sortColumn.label }} - {{ sortColumn.order }}</div>
    <el-table
      @sort-change="sortChange"
      :data="visibleTasks"
      style="width: 100%">
      <el-table-column
        prop="gid"
        label="名称"
        sortable>
      </el-table-column>
      <el-table-column
        :formatter="getPercent"
        label="进度"
        sortable>
      </el-table-column>
      <el-table-column
        :formatter="getSpeed"
        label="速度"
        sortable>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        sortable>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Downloading",
  props: ['aria2'],
  data() {
    return {
      tasks: [],
      selected: [],
      searchText: '',
      sortColumn: '',
    }
  },
  computed: {
    visibleTasks() {
      if (this.searchText == '') {
        return this.tasks
      } else {
        return this.tasks.filter(it => {
          return it.files[0].path.toLowerCase().includes(this.searchText.toLowerCase())
        })
      }
    }
  },
  watch: {
    aria2() {
      this.tasks = []
      this.updateList()
    }
  },
  mounted() {
    this.aria2.on('DownloadStart', () => {
      this.updateList()
    })
    this.aria2.on('DownloadComplete', () => {
      this.updateList()
    })

    this.intervalId = setInterval(async () => {
      try {
        await this.updateList()
      } catch(e) {
        if (e == 'WS_CONNECTION_ERROR') {
          clearInterval(this.intervalId)
        } else {
          throw e
        }
      }
    }, 100)
  },
  methods: {
    sortChange({ column, prop, order }) {
      this.sortColumn = column
    },
    getSpeed(row) {
      // console.log(args)
      return (row.completedLength / row.totalLength * 100).toFixed(2) + '%'
    },
    // goDetail(task) {
    //   this.$router.push('/task/' + task.gid)
    // },
    async updateList() {
      try {
        this.tasks = [
          ...await this.aria2.tellActive(),
          ...await this.aria2.tellWaiting(0, 100)
        ]
      } catch(e) {
        this.tasks = []
        throw e
      }
    },
    // 对选中的任务执行某种操作：开始，暂停，删除
    async execSelected(action) {
      if (action == 'remove') {
        try {
          await this.$confirm('确定删除吗?')
        } catch(e) {
          return
        }
      }

      var selectedTask = this.tasks.filter(task => {
        return this.selected.includes(task.gid)
      })
      for (let task of selectedTask) {
        try {
          if (action == 'pause' && task.status == 'paused') {
            continue
          }
          if (action == 'unpause' && task.status == 'active') {
            continue
          }
          await this.aria2[action](task.gid)
        } catch(e) {
          this.$alert(e.message).then(() => {
            console.log('okkkkk')
          })
        }
      }
      this.updateList()
    },
    selectAll() {
      if (this.selected.length == this.tasks.length) {
        this.selected = []
      } else {
        this.selected = this.tasks.map(it => it.gid)
      }
    },
    toggleSelect(task) {
      var idx = this.selected.indexOf(task.gid)

      if (idx == -1) {
        this.selected.push(task.gid)
      } else {
        this.selected.splice(idx, 1)
      }
    },
    getFilename(task) {
      if (task.files?.[0].path) {
        return task.files[0].path.split('/').at(-1)
      } else {
        return task.files?.uris?.[0]?.uri.split('/').at(-1) ?? '未知'
      }
    },
    getPercent(task) {
      if (task.completedLength == 0) {
        return 0
      } else {
        return (task.completedLength / task.totalLength * 100) ||fixed +'%'
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  components: {

  },
};
</script>
