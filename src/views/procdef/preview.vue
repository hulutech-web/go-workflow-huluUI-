<template>
    <div>
        <Main ref="mainRef" v-model:data="data" @ok="ok" />
    </div>
</template>

<script>
import Main from '@/components/Generator/Main.vue'
import request from '@/utils/request'

export default {
    name: 'Preview',
    components: {
        Main
    },
    data() {
        return {
            id: this.$route.params.id,
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
    mounted() {
        this.getFlowData()
    },
    methods: {
        ok() {

        },
        async getFlowData() {
            if (this.id) {
                const { message } = await request({
                    url: "/api/v1/workflow/procdef/findById",
                    method: "POST",
                    data: {
                        id: this.id
                    }
                })
                this.data.company = message.company
                this.data.name = message.name
                this.data.node = JSON.parse(message.resource)
                this.data.resource = JSON.parse(message.resource)
                this.$nextTick(
                    () => {
                        this.$refs.mainRef.initialNode()
                        this.$refs.mainRef.iteratorData(this.data.node)
                    }
                )
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>