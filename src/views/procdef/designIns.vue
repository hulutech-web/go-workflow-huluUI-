<template>
    <div>
        <p>
            流程表单填写
        </p>

        <a-row :gutter="[48, 16]">
            <a-col :span="12">
                <a-form :model="formState" @finish="onSave" ref="formRef" v-show="current == 1">
                    <a-form-item label="公司" name="company" :rules="[
                        {
                            required: true,
                            message: '请输入公司名称'
                        }
                    ]">
                        <a-input v-model:value="formState.company" placeholder=""></a-input>
                    </a-form-item>
                    <a-form-item label="流程名称" name="name" :rules="[
                        {
                            required: true,
                            message: '请输入流程名称'
                        }
                    ]">
                        <a-input v-model:value="formState.name" placeholder="如：请假、公文、采购"></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit">
                            下一步
                            <template #icon>
                                <RightOutlined />
                            </template>
                        </a-button>
                    </a-form-item>
                </a-form>
                <a-descriptions title="流程信息" v-show="current == 2" layout="vertical" bordered>
                    <a-descriptions-item label="公司名称">{{ formState.company }}</a-descriptions-item>
                    <a-descriptions-item label="流程名称">{{ formState.name }}</a-descriptions-item>
                    <a-descriptions-item label="默认初始节点信息">
                        node: {
                        name: '发起人',
                        type: 'start',
                        nodeId: 'sid-startevent',
                        childNode: {}
                        },
                    </a-descriptions-item>
                </a-descriptions>
                <div style="margin-top: 12px;" v-show="current == 2">
                    <a-space>
                        <a-button type="primary" @click="current = 1">上一步 </a-button>
                        <a-button type="primary" danger @click="routeTo">
                            <template #icon>
                                <HighlightOutlined />
                            </template>
                            制作
                        </a-button>
                    </a-space>
                </div>
            </a-col>
            <a-col :span="12">
                <a-steps :current="current" direction="vertical" :items="[
                    {
                        title: '填写基础信息',
                        description: '定义流程名称',
                        subTitle: '设计审批路径及条件',
                        icon: h(UserOutlined)
                    },
                    {
                        title: '流程设计',
                        description: '设计审批路径及条件',
                        subTitle: '设计审批路径及条件',
                    },
                ]"></a-steps>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { UserOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import router from '@/plugins/router'
const current = ref(1)
const formState = reactive({
    userid: "1",
    name: '请假',
    company: "达州葫芦科技v1",
})
const formRef = ref()
const onSave = (values) => {
    //验证
    formRef.value.validate().then(() => {
        current.value++
    })
}

const routeTo = () => {
    router.push({
        path: "design", query: {
            ...formState
        }
    })
}
</script>

<style lang="scss" scoped></style>