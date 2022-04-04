<style scoped>
label{
  border:1px solid;
  border-radius: 3px;
}
</style>

<template>
  <div>
    <h2>新建下载</h2>
    <input type="file" hidden id="bt-file-select">
    <label for="bt-file-select">选择BT种子</label>
    <input type="file" hidden id="meta-file-select">
    <label for="meta-file-select">选择Metalink种子</label>
    <div>
      <textarea v-model="uris" cols="50" rows="8"></textarea>
    </div>
    <el-button type="primary" plain @click="start">确定</el-button>
  </div>
</template>

<script>
function getFileContent(file){
  return new Promise((resolve,reject)=>{
    var fr = new FileReader()
    // 用来将bt文件转换
    fr.onload = function(){
      var commaPos = fr.result.indexOf(',')
      resolve(fr.result.slice(commaPos + 1))
      // 成功读取则运行此函数，去掉文件读取后前面的data:URL,
     // onload是文件读取完成时触发
    }
    fr.onerror = reject // 出错事件函数赋为reject(文件读取时触发)
    fr.readAsDataURL(file)
  })
}
export default { 
  name:'Newtasks',
  props:['aria2'],
  data(){
    return{
      uris:''
    }
  },
  methods:{
    async startBT(e){
      var file = e.target.files[0]
      var btFileContent=await getFileContent(file)
      await this.aria2.addTorrent(btFileContent)
      this.$router.push('/')
    },
   async start(){
      var uris = this.uris.split('/n').map(it=>it.trim())
      var taskIds = await this.aria2.addUri(uris)
      this.$router.push('/')// 回到首页
    }
  }
}
</script>