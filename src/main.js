// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import iView from 'iview';
import base64url from 'base64url';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import '@/assets/public.scss';    // 使用 CSS
import api from './api'
import moment from 'moment'
import _ from 'lodash'
import { format } from 'date-fns'
import "printthis";
import VueResource from 'vue-resource'; 
import 'font-awesome/scss/font-awesome.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import 'babel-polyfill'
import Icon from 'vue2-svg-icon/Icon.vue'

Vue.component('icon', Icon)
Vue.use(vuescroll);
Vue.use(ElementUI, { size: 'small' });
Vue.use(VueResource); 
Vue.http.options.emulateJSON = true; 
Vue.config.productionTip = false
Vue.use(iView).use(VueCookie);
window.$cookie = VueCookie
window._ = _
window.moment = moment;
window.base64url = base64url
window.format = (val, type) => val ? format(val, type) : null;

Vue.prototype.$api = api
Vue.prototype.$format = window.format
Vue.prototype.$echarts = echarts
router.beforeEach((to, from, next) => {
	if(window.localStorage.getItem('username')||to.name=='login'||to.name=='register'){	
		next()
	}else {
		next({name:'login'})
	}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
