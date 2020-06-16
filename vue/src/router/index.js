import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from,next) => {
  if(to.path == '/'){
    if(!window.loggedIn){
      next('/login')
    }
  }
  if(to.path == '/login'){
    if(window.loggedIn){
      next('/')
    }
  }
  next()
});

export default router;
