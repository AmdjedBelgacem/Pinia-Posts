import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../components/LoginView.vue";
import PostsView from "../components/PostsView.vue";
import PostDetailsView from "../components/PostDetailsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: PostsView,
  },
  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetailsView,
    props: true,
  },
];

const router = new VueRouter({
  history: true,
  routes,
});

export default router;