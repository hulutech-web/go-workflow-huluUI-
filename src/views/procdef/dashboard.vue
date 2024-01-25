<template>
    <a-card>
        <template #title>
            <div>
                流程查询
            </div>
        </template>
        <template #extra>
            <div>
                <a-button type="primary" @click="getToken">获取授权</a-button>
            </div>
        </template>
        <!-- 根据ID搜索 -->
        <div style="display: flex;justify-content: space-between; align-items: center;">
            <a-form :model="formState" name="basic" autocomplete="off" @finish="onSearch">
                <a-form-item label="id" name="id" :rules="[{ required: true, message: 'Please input id' }]">
                    <a-input style="width:100px;" v-model:value="formState.id" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">搜索</a-button>
                </a-form-item>
            </a-form>
            <section style="height:200px;width:400px;background-color: aquamarine;padding: 12px;box-sizing: border-box;">
                <a-button type="link" @click="showJSON">
                    {{ defIns.company }}{{ defIns.name }}{{ defIns.deployTime }}
                </a-button>
            </section>
            <section>

            </section>
        </div>

    </a-card>
    <a-modal v-model:open="visable" title="数据结构" width="700px" :footer="false">
        <pre
            style="font-family: Monaco,Menlo,Consolas,Bitstream Vera Sans Mono,monospace;font-size: 14px;">{{ JSON.parse(defIns.resource) }}</pre>
        <a-button type="primary" @click="copy">
            <template #icon>
                <CopyOutlined />
            </template>
            复制
        </a-button>
    </a-modal>
    <a-card>
        <a-table :columns="columns" :data-source="dataSource">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-button-group>
                        <a-button type="primary">操作</a-button>
                        <a-button type="primary" danger>编辑</a-button>
                        <a-button type="primary" danger ghost @click="del(record)">删除</a-button>
                        <a-button type="link" @click="router.push({ path: `preview/${record.id}` })">查看</a-button>
                    </a-button-group>
                </template>
            </template>
        </a-table>
    </a-card>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import request from '@/utils/request'
import columns from './columns.js'
import router from '@/plugins/router'

const getToken = async (record) => {
    const { message } = await request.get(`/api/v1/workflow/token`)
    localStorage.setItem('token', message.token)
}
const formState = reactive({
    id: null
})
const defIns = ref({
    company: null,
    name: null,
    deployTime: null
})
const dataSource = ref([])
const queryData = async () => {
    const { rows } = await request({
        url: "/api/v1/workflow/procdef/findAll",
        method: "post",
        data: {
            pageSize: 10,
            pageIndex: 1
        }
    })
    dataSource.value = rows
};
onMounted(() => {
    queryData()
})
const del = async (record) => {
    await request({
        url: `/api/v1/workflow/procdef/delById`,
        method: "post",
        data: { id: record.id + "" }
    })
    queryData()
}
const onSearch = async (values) => {
    const { message } = await request({
        url: `/api/v1/workflow/procdef/findById`,
        method: "POST",
        data: values
    })
    defIns.value = message
}
const visable = ref(false)
const showJSON = () => {
    visable.value = !visable.value
}
const isCopy = ref(false)
const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(defIns.value))
    isCopy.value = true
}
</script>

<style lang="scss" scoped></style>