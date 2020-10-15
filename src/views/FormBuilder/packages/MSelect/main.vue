<template>
    <el-select :placeholder="placeholder"
               :multiple="multiple"
               :filterable="filterable"
               :allow-create="allowCreate"
               :default-first-option="defaultFirstOption"
               :clearable="clearable"
               v-model="value"
               v-on="$listeners">
        <el-option v-for="(v,k) in options" :label="isObject(options)?k:v" :value="v" :key="k" />
    </el-select>
</template>

<script>
    import BaseComp from '../common/BaseComp';
    export default {
        name: 'MSelect',
        mixins: [BaseComp],
        props: {
            defaultValue: [String, Array],
            options: [Array, Object],
            isRequire: Boolean,
            placeholder: String,
            multiple: Boolean,
            filterable: Boolean,
            allowCreate: Boolean,
            defaultFirstOption: Boolean,
            clearable: Boolean
        }
    }

</script>
