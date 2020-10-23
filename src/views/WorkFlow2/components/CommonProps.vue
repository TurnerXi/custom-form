<template>
    <el-form v-model="form">
        <el-form-item label="编号"> {{form.id}} </el-form-item>
        <el-form-item label="流程名称" prop="name">
            <el-input v-model="form.name" />
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
                    id: null,
                    name: null,
                }
            }
        },
        watch: {
            'form.name'(val) {
                this.updateProperties({ 'name': val });
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                let attrs = ['id', 'name'];
                for (const attr of attrs) {
                    this.form[attr] = this.moddle[attr];
                }
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
