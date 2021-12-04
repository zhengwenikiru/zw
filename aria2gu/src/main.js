import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Aria2Client from "./aria2-client";
// Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
const aria2 = new Aria2Client({
  host:'localhost',
  port:6800,
  secret:'88888888'
})

window.aria2 = aria2

Vue.filter('fixed',function(value,length=2){
return value.toFixed(length)
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


// 模块里可以直接使用await