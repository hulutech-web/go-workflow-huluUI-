<template>
    <div>
        <a-form :model="formState" @finish="onSearch" style="width:500px;">
            <a-form-item label="角色" name="userID">
                <a-input v-model:value="formState.userID" placeholder="部门经理"></a-input>
            </a-form-item>
            <a-form-item label="公司" name="company">
                <a-input v-model:value="formState.company" placeholder="达州葫芦科技v1"></a-input>
            </a-form-item>
            <a-form-item label="流程类型" name="procName">
                <a-select v-model:value="formState.procName" placeholder="请假，公文">
                    <a-select-option v-for="(pro, ind) in procOpts" :key="ind" :value="pro.label">
                        {{ pro.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="部门" name="departments">
                <a-select v-model:value="formState.departments" mode="tags" placeholder="技术部、发展战略部"  :options="[
                        {
                            value: '办公室',
                            label: '办公室',
                        },
                        {
                            value: '技术部',
                            label: '技术部',
                        },
                        {
                            value: '发展战略部',
                            label: '发展战略部',
                        }]">>

                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" type="primary">搜索</a-button>
            </a-form-item>
        </a-form>
        <a-table :columns=" columns " :dataSource=" data ">
            <template #bodyCell="{ column, cell, record }">
                <template v-if=" column.dataIndex === 'action' ">
                    <div>
                        <a-button type="primary" @click="action(record)">审批</a-button>
                    </div>
                </template>
            </template>
        </a-table>
        <a-modal v-model:open=" visable " title="审批流程" ok-text="确认" cancel-text="取消" :footer=" false">
            <a-form @finish=" submitAppr " ref="approFormRef" :model=" approForm ">
                <a-form-item label="备注" name="comment" :rules="
                        [
                        {
                            required: true,
                            message: '请填写备注'
                        }
                        ]">
                    <a-input type="textarea" v-model:value=" approForm.comment "></a-input>
                </a-form-item>
                <a-form-item label="备注" name="pass" :rules="
                        [
                        {
                            require: true,
                            message: '请选择审批结果'
                        }
                        ]">
                    <a-radio-group v-model:value=" approForm.pass ">
                        <a-radio value="true">同意</a-radio>
                        <a-radio value="false">不同意</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
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
const procOpts = ref([])
const approFormRef = ref()
const approForm = reactive({
    comment: "",
    candidate: "",//审批人candidate指定下一步执行人或者审批组如：candidate: "人事组"（一般不指定）
    taskID: null,//任务id
    pass: "true",//or false
    userID: "",//用户id
    username: "",//用户名字
    company: "",//公司
})
const getOptions = async () => {
    const { rows } = await request({
        url: "/api/v1/workflow/procdef/findAll",
        method: "post",
        data: {
            pageSize: 10,
            pageIndex: 1,
        }
    })
    procOpts.value = rows.map(item => {
        return {
            label: item.name,
            value: item.name,
            id: item.id
        }
    })
}
getOptions()
const formState = reactive({
    userID:"",//角色名字
    procName: "",
    company: "达州葫芦科技v1",
    departments: ["发展战略部"]
})
const action = (row) => {
    visable.value = true
    approForm.taskID = row.taskID
    approForm.userID = row.startUserId
    approForm.username = row.startUserName
    approForm.company = row.company
}
const onSearch = async (value) => {
    const { rows } = await request({
        url: `/api/v1/workflow/process/findTask`,
        method: "post",
        data: formState
    })
    data.value = rows
}
const visable = ref(false)

const submitAppr = async (value) => {
    console.log(value)
    console.log(approForm)
    approFormRef.value.validate().then(async _ => {
        await request({
            url: `/api/v1/workflow/task/complete`,
            method: "post",
            data: approForm
        })
    })
}
</script>

<style lang="scss" scoped></style>