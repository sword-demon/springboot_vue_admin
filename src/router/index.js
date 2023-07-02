import Vue from 'vue';
import VueRouter from 'vue-router';
import Manage from '../views/Manage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Manager',
    component: Manage,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页',
        },
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/sys',
    component: Manage,
    redirect: '/sys/user',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting',
    },
    children: [
      {
        path: '/sys/user',
        name: 'User',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/views/User.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
