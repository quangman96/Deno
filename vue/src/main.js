import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/style.css";
Vue.config.productionTip = false;

Vue.use(require('vue-cookies'))
window.loggedIn = !! Vue.$cookies.get('token')
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
