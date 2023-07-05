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
      }, {
        path: 'person',
        name: 'Person',
        meta: {
          title: '个人信息',
        },
        component: () => import('@/views/Person.vue'),
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
      {
        path: '/sys/role',
        name: 'Role',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/views/Role.vue'),
      },
      {
        path: '/sys/menu',
        name: 'Menu',
        meta: {
          title: '菜单管理',
        },
        component: () => import('@/views/Menu.vue'),
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
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('user') ?
      JSON.parse(localStorage.getItem('user')) : null;
  if (user && user.token !== undefined && to.path !== '/login') {
    next();
  } else if (user && user.token !== undefined && to.path === '/login') {
    next('/');
  } else if (!user && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
});

export default router;
