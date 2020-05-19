import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

//js引入区
import global_method from './js/global_method.js'
import marked from './components/marked'
//全局方法定义区
Vue.prototype.$globalMethod = global_method
Vue.prototype.$marked = marked

//组件引入区
import uniLoadMore from './components/uni-load-more/uni-load-more.vue';
import lightModal from './components/light-modal/light-modal.vue';

//组件注册区
Vue.component('uni-load-more', uniLoadMore)
Vue.component('light-modal', lightModal)

App.mpType = 'app'
Vue.prototype.$store = store;


const app = new Vue({
	store,
    ...App
})
app.$mount()
