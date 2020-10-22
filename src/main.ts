import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'
import './style/rest.css'
import 'swiper/css/swiper.min.css'

createApp(App).use(store).use(router).mount('#app')
