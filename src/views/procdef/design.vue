<template>
    <div>
        <Main :data="insDate" @ok="ok" />
    </div>
</template>

<script>
import Main from '@/components/Generator/Main.vue'
import request from '@/utils/request'
import router from '@/plugins/router'
//从router中解析出query

export default defineComponent({
    name: "Design",
    components: { Main },
    setup(props) {
        const query = router.currentRoute.value.query
        const insDate = ref({})
        insDate.value = query
        
        const ok = async (data) => {
            await request({
                url: "/api/v1/workflow/procdef/save",
                method: "post",
                data: data
            })
        }
        return {
            ok,
            insDate
        }
    }

})

</script>

<style lang="scss" scoped></style>