<template>
    <el-form v-model="form">
        <!-- <el-form-item label="编号"> {{form.id}} </el-form-item> -->
        <el-form-item label="流程名称">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="候选人">
            <el-select v-model="form.assignee">
                <el-option value="zhangsan">zhangsan</el-option>
                <el-option value="lisi">lisi</el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    import BasePropsModule from './BasePropsModule.vue'
    export default {
        mixins: [BasePropsModule],
        data() {
            return {
                form: {
                    name: null,
                    assignee: null
                }
            }
        },
    }

</script>

<style lang="scss" scoped>

</style>
