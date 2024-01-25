<template>
    <div>
        <a-card>
            <template #title>
                <div>
                    启动流程
                </div>
            </template>
            <a-row :gutter="[48, 16]">
                <a-col :span="12">
                    <a-form :model="formState" name="basic" @finish="onSubmit" style="width:500px;">
                        <a-form-item label="用户ID" name="userId">
                            <a-input v-model:value="formState.userId" placeholder="1"></a-input>
                        </a-form-item>
                        <a-form-item label="用户名称" name="username">
                            <a-input v-model:value="formState.username" placeholder="袁浩"></a-input>
                        </a-form-item>
                        <a-form-item label="审批类型" name="procName">
                            <a-select v-model:value="formState.procName" @change="changeProc" placeholder="请假，公文">
                                <a-select-option v-for="(pro, ind) in procOpts" :key="ind">
                                    {{ pro.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="公司" name="company">
                            <a-input v-model:value="formState.company" placeholder="达州葫芦科技v1"></a-input>
                        </a-form-item>
                        <a-form-item label="请假标题" name="title">
                            <a-input v-model:value="formState.title"></a-input>
                        </a-form-item>
                        <a-form-item label="请假天数" name="day">
                            <a-input  v-model:value="formState.day"></a-input>
                        </a-form-item>
                        <a-form-item label="部门" name="department" placeholder="战略发展部">
                            <a-input v-model:value="formState.department"></a-input>
                        </a-form-item>
                        <a-form-item type="submit">
                            <a-button type="primary" html-type="submit">提交</a-button>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :span="12">
                    var:数据结构
                    <pre
                        style="font-family: Monaco,Menlo,Consolas,Bitstream Vera Sans Mono,monospace;font-size: 14px;">{{ formState.var }}</pre>
                </a-col>
            </a-row>

        </a-card>
    </div>
</template>

<script setup>
import request from '@/utils/request'
const formState = reactive({
    userId: "1",
    username: "",
    company: "",
    procName: "",
    procInstID: null,
    title: "",
    department: "",
    day: "",
    var: {
        procDefId: "",
        procDefName: "",
        title: "",
        department: "",
        company: "",
        startUserId: "",
        startUserName: "",
        options: "",
        day: "",

    }
})

const onSubmit = async (values) => {
    await request({
        url: `api/v1/workflow/process/start`,
        method: "post",
        data: formState
    })
    console.log('Success:', values);
}

const procOpts = ref([])
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
    formState.var.options = rows.map(item => item.name);
    //初始化var数据
    formState.var.department = formState.department
}

//watch监听formState中的数据,动态给var中的数据赋值
/**
 * title
department
company
startUserId
startUserName
 */
watch(() => formState.title,
    (newVal, oldVal) => {
        formState.var.title = newVal
    }
)
watch(() => formState.department,
    (newVal, oldVal) => {
        formState.var.department = newVal
    }
)
watch(() => formState.company,
    (newVal, oldVal) => {
        formState.var.company = newVal
    }
)
watch(() => formState.userId,
    (newVal, oldVal) => {
        formState.var.startUserId = newVal
    }
)
watch(() => formState.username,
    (newVal, oldVal) => {
        formState.var.startUserName = newVal
    }
)
watch(() => formState.day,
    (newVal, oldVal) => {
        formState.var.day = newVal
    }
)



getOptions()
const changeProc = (val) => {
    formState.procName = procOpts.value[val]['value']
    formState.procInstID = procOpts.value[val]['id'] + ""
    formState.var.procDefId = procOpts.value[val]['id'] + ""
    formState.var.procDefName = procOpts.value[val]['value']
    formState.var.options = procOpts.value[val]['value']
}
</script>

<style lang="scss" scoped></style>