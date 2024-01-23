<template>
    <div>
        <Main  :data="data" @ok="ok" />
    </div>
</template>

<script>
import Main from '@/components/Generator/Main.vue'
import request from '@/utils/request'
export default {
    name: 'App',
    components: {
        Main
    },
    data() {
        return {
            mainRef: null,
            // 当userid和company不同，后台生成的流程定义实例也不同
            data: {
                userid: "11025",
                name: '请假',
                company: "达州葫芦科技v1",
                node: {
                    name: '发起人',
                    type: 'start',
                    nodeId: 'sid-startevent',
                    childNode: {}
                },
                resource: {

                }
            }
        }
    },
    methods: {
        async ok(data) {
            await request({
                url: "/api/v1/workflow/procdef/save",
                method: "post",
                data: data
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>