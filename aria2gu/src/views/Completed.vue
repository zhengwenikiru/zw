<template>
  <div class="completed">
    <h2>已完成</h2>
    <ul>
      <li v-for="task of tasks" :key="task.gid">
        {{ getFilename(task.files[0].path) }}
        /
        {{ (task.completedLength / task.totalLength) * 100 | fixed}}%
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Completed',
  props:['aria2'],
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    getFilename(path) {
      return path.split('/').at(-1)
    },
  },
  async mounted() {
    try{
      this.tasks = await this.aria2.tellStopped(0, 1000)
      this.intervalId = setInterval(async () => {
        this.tasks = await this.aria2.tellStopped(0, 1000)
      }, 1000)
    }catch(e){
          if(e == 'WS_CONNECT_ERROR'){
               clearInterval(this.intervalId)
             }else{
               throw e
             }
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
}
</script>
