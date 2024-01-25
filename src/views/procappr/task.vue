<template>
    <div>
        <p>
            任务查询
        </p>
        <a-form :model="formState" @finish="onSubmit" ref="formRef" style="width:500px;">
            <a-form-item label="角色" name="userID">
                <a-input v-model:value="formState.userID" placeholder="部门经理"></a-input>
            </a-form-item>
            <a-form-item label="公司" name="company">
                <a-input v-model:value="formState.company"></a-input>
            </a-form-item>
            <a-form-item label="部门" name="departments">
                <a-select v-model:value="formState.departments" mode="tags" style="width: 100%" placeholder="Tags Mode"
                    :options="[
                        {
                            value: '办公室',
                            label: '办公室',
                        },
                        {
                            value: '发展战略部',
                            label: '发展战略部',
                        }]">

                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" type="primary">查询</a-button>
            </a-form-item>
        </a-form>
        <a-table :columns="columns" :dataSource="data">
            <template #bodyCell="{ column, cell, record }">
                <template v-if="column.dataIndex == 'action'">
                    <a-button type="primary" ghost @click="getDetail(record)">历史详情</a-button>
                </template>
            </template>
        </a-table>
        <a-divider />
            <a-steps progress-dot :current="steps.length" direction="vertical" :items="steps"></a-steps>
    </div>
</template>

<script setup>
import request from '@/utils/request'
const columns = ref([
    {
        title: '发起人',
        dataIndex: 'startUserName',
        key: 'startUserName',
    },
    {
        title: '假期类型',
        dataIndex: 'procDefName',
        key: 'procDefName',
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '发起人ID',
        dataIndex: 'startUserId',
        key: 'startUserId',
    },
    {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: '历时',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: '是否结束',
        dataIndex: 'isFinished',
        key: 'isFinished',
    },
    {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
    },
    {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
    },
])
const data = ref([])
const formState = reactive({
    userID: "",//角色名称：如部门经理
    groups: [],
    departments: ["发展战略部", "技术部"],
    company: "达州葫芦科技v1",
    procName: "请假",
    pageIndex: 1,
    pageSize: 10
})



const onSubmit = async (value) => {
    const { rows } = await request({
        url: `/api/v1/workflow/process/findTask`,
        method: "post",
        data: formState
    })
    data.value = rows
}
const steps = ref([])
const getDetail = async (record) => {
   const data =  await request({
        url: `/api/v1/workflow/identitylink/findParticipant`,
        method: "POST",
        data: {
            procInstID: record.id
        }
    })
    steps.value=data.map(item=>{
        return {
            title:item.comment,
            subTitle:item.username,
            description:`流程ID：${item.id},用户ID:${item.userid},步骤：${item.step},`
        }
    })
}
</script>

<style lang="scss" scoped></style>