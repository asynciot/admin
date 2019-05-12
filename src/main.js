// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import iView from 'iview';
import base64url from 'base64url';
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
import 'babel-polyfill';
import Icon from 'vue2-svg-icon/Icon.vue';
import './lib/jquery-vender.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'admin-lte'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import '@/assets/public.scss';    // 使用 CSS
import vueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// import language from "./language"; //国际化语言包
import VueI18n from 'vue-i18n'
import en from 'iview/dist/locale/en-US';
import zh from 'iview/dist/locale/zh-CN';
import app_zh from './language/zh-CN.json'
import app_en from './language/en-US.json';
// import zh from "iview/src/locale/lang/zh-CN";
// import en from "iview/src/locale/lang/en-US";
// import cn from "./lang/zh";
// import us from "./lang/en";
Vue.use(VueI18n);
import global from './global'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
 const  i18n = new VueI18n({
     locale: 'zh',          //默认语言
     message: {
         'zh': require('./lang/zh'),
         'en': require('./lang/en')
     }
 })

Vue.prototype.global = global
Vue.use(vueAwesomeSwiper);
Vue.component('icon', Icon);
Vue.use(vuescroll);
Vue.use(ElementUI, { size: 'small' });
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false
Vue.use(iView).use(VueCookie);
Vue.use(iView,{
	i18n: (key, value) => i18n.t(key, value)
});

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
Vue.locale = () => {};
const i18n = new VueI18n({
  locale: localStorage.getItem("language") || 'zh-CN',    // 语言标识
  messages: {
    'zh-CN': Object.assign(zh,app_zh),   // 中文语言包
    'en-US': Object.assign(en,app_en)    // 英文语言包
  },
})

// Vue.config.lang = 'zh-CN';
// Vue.locale('zh-CN', Object.assign(zh,app_zh));
// Vue.locale('en-US', Object.assign(en,app_en));

new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
