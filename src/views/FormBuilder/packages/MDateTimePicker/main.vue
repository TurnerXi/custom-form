<template>
    <el-date-picker type="datetime" :placeholder="placeholder" v-model="value" v-on="$listeners" />
</template>

<script>
    import BaseComp from '../common/BaseComp';
    export default {
        name: 'MDateTimePicker',
        mixins: [BaseComp],
        props: {
            defaultValue: [String, Number, Object],
            isRequire: {
                type: Boolean,
                default: false
            },
            isSelectNow: Boolean,
            placeholder: String
        },
        watch: {
            isSelectNow(val) {
                if (val) {
                    this.value = Date.now();
                } else {
                    this.value = null;
                }
            }
        },
        created() {
            if (this.isSelectNow) {
                this.value = Date.now();
            }
        }
    }

</script>
