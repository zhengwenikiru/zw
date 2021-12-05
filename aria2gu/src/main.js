import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Aria2Client from './aria2-client';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false;

// const aria2 = new Aria2Client({
//   host: 'localhost',
//   port: 6800,
//   secret: 'abcdefg',
// })

// window.aria2 = aria2

Vue.filter('fixed', function (input, length = 2) {
  return input.toFixed(length)
})

let app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


