<style lang="less" scoped>
.piece{
  width: 16px;
  height: 16px;
  margin: 4px;
  background-color: grey;
  display: inline-block;
  &.complete{
    background-color: green;
  }
}
</style>

<template>
  <div>
<dl v-if="task">
  <dt>任务名称</dt>
  <dd>{{ getFilename(task) }}</dd>
  <dt>任务大小</dt>
  <dd>{{ (task.files[0].length/1024/1024).toFixed(2) }}MB </dd>
  <dt>下载地址</dt>
  <dd>{{ task.files[0].uris[0].uri }}</dd>
  <dt>目标路径</dt>
  <dd>{{ task.files[0].path }}</dd>
  <dt>区块信息</dt>
  <dd>
    <span v-for="i of Number(task.numPieces)" :key="i" class="piece" :class="{complete: bitfield[i-1]=='1'}"></span>
    <!-- 完成的片为绿色，未完成的为灰色 -->
  </dd>
</dl>

  </div>
</template>

<script>
export default {
  name:'taskDetail',
  props:['aria2'],
  data(){
    return{
      task:null,
      bitfield:[]
    }
  },
  methods:{
     getFilename(task){
      if(task.files?.[0].path){
        return task.files[0].path.split('/').at(-1)
      }else{
        return task.files?.uris?.[0]?.uri.split('/').at(-1) ?? '未知'
      }
    },
  },
 async mounted(){
    this.task = await this.aria2.tellStatus(this.$route.params.gid)
    this.bitfield = this.task.bitfield.split('').map(it=>parseInt(it,16)).toString(2).padStart(4,'0')
  }
}
</script>