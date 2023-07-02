import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import '@/assets/global.css';
import request from '@/utils/request';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$http = request;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
