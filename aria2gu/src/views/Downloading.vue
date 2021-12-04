<style lang="less" scoped>
ul{
  list-style: none;
}
li{
  /* display: flex; */
    cursor: pointer;
  &.selected{
    background-color: #ddd;
  }
  &:hover{
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
    搜索：<input type="text" v-model="searchText">
    </div>
  <ul>
    <li v-for="task of visibleTasks" :key = "task.gid" :class="{selected:selected.includes(task.gid)}" @click="toggleSelected(task)">
      <input type="checkbox" :checked="selected.includes(task.gid)">
      <span>{{ getFilename(task) }}</span>
      |
      <span>{{ getPercent(task) |fixed }}%</span>
      |
      <span>{{ task.downloadSpeed /1024 |fixed }}k/s</span>
      |
      <span>{{ task.status }}</span>
      |
      <!-- <button @click.stop="goDetail">详情</button> -->
      <router-link @click.native.stop :to="{name:'taskDetail',params:{gid:task.gid}}">详情</router-link>
      <!-- stop 使click事件不会冒泡到父元素上 -->
    </li>
  </ul>


  <el-table
    :data="visibleTasks"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="gid"
      label="名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="completedLength"
      label="进度"
      sortable
      width="180">
    </el-table-column>
     <el-table-column
      :formater="getSpeed"      
       label="速度"
      sortable
      width="180">
    </el-table-column>
       <el-table-column
      prop="status"
      label="状态"
      sortable
      width="180">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
// @ is an alias to /src
//formatter的值决定渲染的值

export default {
  name: "Downloading",
  data(){
    return{
      tasks:[],
      selected:[],
      searchText:'',
    }
  },
  computed:{
    visibleTasks(){
      if(this.searchText == ''){
        return this.tasks
      }else{
        return this.tasks.filter(it => {
          it.files[0].path.toLowerCase().includes(this.searchText.toLowerCase())
        })
      }
    }
  },
  mounted(){
    this.updateList()
    this.intervalId = setInterval(async()=>{
      this.updateList()
    },1000)
  },
  methods:{
    getSpeed(row){
      return (row.completedLength / row.totalLength * 100).toFixed(2) + '%'
    },
    // goDetail(task){
    //   this.$router.push('/task/'+task.gid)
    // },
   async updateList(){
       this.tasks = [
        ...await window.aria2.tellActive(),
        ...await window.aria2.tellWaiting(0,100)]
    },
    // 对选中的任务执行操作,每操作一次更新一次任务列表状态
   async execSelected(action){
     if(action == 'remove'){
       try{
         await this.$confirm('确定删除吗？')
       }catch(e){
          return
       }
     }
      for(let gid of this.selected){
        try{
          await window.aria2[action](gid)
        }catch(e){
          this.$alert(e.message)
          console.log(e)
        }
      }
      this.updateList()
    },
    selectAll(){
      if(this.selected.length == this.tasks.length){
        this.selected=[]
      }else{
        this.selected = this.tasks.map(it =>it.gid)
      }
    },
    toggleSelected(task){
      var idx = this.selected.indexOf(task.gid)
      if(idx ==-1){
        this.selected.push(task.gid,true)
      }else{
        this.selected.splice(idx,1)
      }
    },
    getFilename(task){
      if(task.files?.[0].path){
        return task.files[0].path.split('/').at(-1)
      }else{
        return task.files?.uris?.[0]?.uri.split('/').at(-1) ?? '未知'
      }
    },
     getPercent(task) {
      if (task.completedLength == 0) {
        return 0
      } else {
        return task.completedLength / task.totalLength * 100
      }
    },
     },
  beforeDestroy(){
    clearInterval(this.intervalId)
  },
  components: {
  },
};
</script>
