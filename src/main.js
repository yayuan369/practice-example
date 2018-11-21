// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;


// icon小图标
import './assets/icon/iconfont'
// 引入element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 引入Muse-UI框架
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
Vue.use(MuseUI);

//import * as obj from "xxx" 会将 "xxx" 中所有 export 导出的内容组合成一个对象返回
import * as filters from'./util/filter';  
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
