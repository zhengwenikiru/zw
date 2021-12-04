import Vue from "vue";
import VueRouter from "vue-router";
import Downloading from "../views/Downloading.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Downloading",
    component: Downloading,
  },
  {
    path: "/completed",
    name: "Completed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/Completed.vue"),
  },
  {
    path:'/new',
    name:'New',
    component:() =>
    import("../views/Newtask.vue")
  },
  {
    path:'/task/:gid',
    name:'taskDetail',
    component:()=>
    import("../views/taskDetail.vue")
  },
  {
    path:'/settings',
    name:'Settings',
    component:()=>
    import("../views/Settings.vue")
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router;
