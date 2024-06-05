import Vue from "vue";
import router from "./router/routes";
import { createPinia, PiniaVuePlugin } from "pinia";
import App from "./App.vue";
import "./assets/tailwind.css";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
