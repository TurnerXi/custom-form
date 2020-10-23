<template>
    <el-form v-model="form">
        <!-- <el-form-item label="编号"> {{form.id}} </el-form-item>
        <el-form-item label="流程名称">
            <el-input v-model="form.name" />
        </el-form-item> -->
    </el-form>
</template>

<script>
    import BasePropsModule from './BasePropsModule.vue'
    export default {
        mixins: [BasePropsModule],
        data() {
            return {
                form: {}
            }
        },
        created() {

        }
    }

</script>

<style lang="scss" scoped>

</style>
