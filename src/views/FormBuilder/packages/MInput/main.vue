<template>
    <el-input :placeholder="placeholder" v-model="value" v-on="$listeners" />
</template>

<script>
    import BaseComp from '../common/BaseComp';
    export default {
        name: 'MInput',
        mixins: [BaseComp],
        props: {
            defaultValue: {
                type: String,
                default: () => ''
            },
            isRequire: {
                type: Boolean,
                default: false
            },
            placeholder: String
        },
    }

</script>
