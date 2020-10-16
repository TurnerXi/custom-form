<template>
    <el-switch v-model="value"
               :active-value="options[0]"
               :inactive-value="options[1]"
               v-on="$listeners">
    </el-switch>
</template>

<script>
    import BaseComp from '../common/BaseComp';
    export default {
        name: 'MSwitch',
        mixins: [BaseComp],
        props: {
            defaultValue: [String, Boolean],
            options: {
                type: Array,
                default: () => [true, false]
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
