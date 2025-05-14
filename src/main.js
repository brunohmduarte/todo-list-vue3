import { createApp } from 'vue'

import App from './App.vue'
import Store from "./store/index.js";

import './assets/css/tailwind.css'

createApp(App)
  .use(Store)
  .mount('#app')
