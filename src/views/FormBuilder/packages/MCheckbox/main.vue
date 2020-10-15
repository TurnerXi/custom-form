<template>
    <el-checkbox-group v-model="value" v-on="$listeners">
        <el-checkbox v-for="(v,k) in options" :label="v" :key="k">
            {{isObject(options)?k:v}}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script>
    import BaseComp from '../common/BaseComp';
    export default {
        name: 'MCheckbox',
        mixins: [BaseComp],
        props: {
            defaultValue: {
                type: Array,
                default: () => []
            },
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
    // ::v-deep .el-checkbox__label {
    //     color: #fff;
    // }

</style>
