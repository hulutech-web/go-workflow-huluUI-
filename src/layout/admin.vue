<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible width="240">
            <div class="logo">
                <img src="@/assets/images/hulu-logo-white.png" width="120px;" alt="">
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @select="selectRoute">
                <a-sub-menu key="sub1">
                    <template #title>
                        <user-outlined />
                        <span>流程存储</span>
                    </template>
                    <a-menu-item key="designIns">
                        <span>存储流程定义</span>
                    </a-menu-item>
                    <a-menu-item key="dashboard">
                        <span>查询流程定义</span>
                    </a-menu-item>
                </a-sub-menu>

                <a-sub-menu key="sub2">
                    <template #title>
                        <user-outlined />
                        <span>启动流程</span>
                    </template>
                    <a-menu-item key="start">
                        <desktop-outlined />
                        <span>启动</span>
                    </a-menu-item>
                </a-sub-menu>

                <a-sub-menu key="sub4">
                    <template #title>
                        <user-outlined />
                        <span>审批</span>
                    </template>
                    <a-menu-item key="myapprove">
                        <desktop-outlined />
                        <span>审批</span>
                    </a-menu-item>
                    <a-menu-item key="withdraw">
                        <desktop-outlined />
                        <span>撤回审批</span>
                    </a-menu-item>
                    <a-menu-item key="task">
                        <desktop-outlined />
                        <span>任务查询</span>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub5">
                    <template #title>
                        <desktop-outlined />
                        <span>查询历史流程</span>
                    </template>
                    <a-menu-item key="historyAppr">
                        <span>查询我审批的流程</span>
                    </a-menu-item>
                    <a-menu-item key="startAppr">
                        <span>查询我发起的流程</span>
                    </a-menu-item>
                    <a-menu-item key="nextAppr">
                        <span>查询抄送我的流程</span>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <p style="font-size: 36px;display: flex;justify-content: center;align-items: center;">
                    欢迎使用流程设计系统
                </p>
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                版权信息
                达州葫芦科技
                <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备202201569号-1</a>
                copyright © 2022-2023 All Rights Reserved.
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import router from '../plugins/router';
const collapsed = ref(false);
const selectedKeys = ref(['dashboard']);
const selectRoute = (route) => {
    router.push(route.key)
}
</script>
<style scoped>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height:120px;
}
</style>