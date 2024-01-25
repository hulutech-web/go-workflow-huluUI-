import { createApp } from 'vue'
import App from './App.vue'
import router from '@/plugins/router'
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/reset.css';
import Node from '@/components/Generator/node.vue'
import setUpIcons from './plugins/icons';
const app = createApp(App)
app.use(router)
app.use(Antd)
app.component('Node', Node)
setUpIcons(app)
app.mount('#app')
