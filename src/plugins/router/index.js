import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/admin.vue'

import Dashboard from '@/views/procdef/Dashboard.vue'
import DesignIns from '@/views/procdef/designIns.vue'
import Design from "@/views/procdef/Design.vue"
import Preview from '@/views/procdef/Preview.vue'

import Start from '@/views/procstart/start.vue'

import MyApprove from '@/views/procappr/myapprove.vue'
import Task from '@/views/procappr/task.vue'
import WithDraw from '@/views/procappr/withdraw.vue'


import HistoryAppr from '@/views/prochistory/historyAppr.vue'
import NextAppr from '@/views/prochistory/nextAppr.vue'
import StartAppr from '@/views/prochistory/startAppr.vue'

const routes = [
    {
        path: "/", component: Layout,
        children: [
            { path: '/dashboard', component: Dashboard },
            { path: '/design', component: Design },
            { path: '/designIns', component: DesignIns },
            { path: '/preview/:id', component: Preview },
            { path: '/start', component: Start },
            { path: '/myapprove', component: MyApprove },
            {
                path: "/task", component: Task
            },
            {
                path: "/withdraw", component: WithDraw
            },
            {
                path: "/historyappr", component: HistoryAppr
            },
            {
                path: "/nextappr", component: NextAppr
            },
            {
                path: "/startappr", component: StartAppr
            },
        ]
    }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router