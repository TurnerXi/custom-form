<template>
    <el-radio-group v-model="value" v-on="$listeners">
        <el-radio v-for="(v,k) in options" :label="v" :key="k">
            {{isObject(options)?k:v}}
        </el-radio>
    </el-radio-group>
</template>

<script>
    import BaseComp from '../common/BaseComp';
    export default {
        name: 'MRadio',
        mixins: [BaseComp],
        props: {
            defaultValue: [String, Boolean, Number],
            options: {
                type: [Array, Object],
                default: () => ['选项一', '选项二']
            },
            isRequire: {
                type: Boolean,
                default: false
            }
        }
    }

</script>

<style lang="scss" scoped>
    // ::v-deep .el-radio__label {
    //     color: #fff;
    // }

</style>
