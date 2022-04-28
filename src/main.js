import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed';

axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if(response.status == 200){
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


Vue.config.productionTip = false
// Vue.use(axios)
Vue.prototype.$ajax = axios

Vue.use(VueLazyLoad,{
  
})
Vue.use(ElementUI,{size:'small',zIndex:3000})
new Vue({
  render: h => h(App),
}).$mount('#app')
