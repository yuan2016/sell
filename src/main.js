// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';
import './common/stylus/include.styl';
import store from './store/'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import './config/rem'
import routes from './router/router'

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
new Vue({
  template: '<App></App>',
  components: { App },
  router: router,
  store: store
}).$mount('#app');

router.push('/home');
