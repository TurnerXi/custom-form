<template>
    <div>
        <div v-for="(item,idx) in value" :key="idx" class="input-wrapper">
            <el-input size="mini" :placeholder="placeholder" v-model="value[idx]" @change="emitChangeEvent" />
            <el-button v-if="value.length>1" type="primary" size="mini" @click="deleteItem(idx)"><i class="el-icon-minus"></i></el-button>
        </div>
        <div class="add-item" @click="addItem">
            <el-button type="primary" size="mini"><i class="el-icon-plus" /></el-button><span class="add-item__desc">添加选项</span>
        </div>
    </div>
</template>

<script>
    import BaseComp from '../common/BaseComp';
    export default {
        name: 'MInputList',
        mixins: [BaseComp],
        props: {
            defaultValue: {
                type: Array,
                default: () => ['']
            },
            isRequire: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
        watch: {
            value() {
                this.emitChangeEvent();
            }
        },
        methods: {
            deleteItem(idx) {
                this.value.splice(idx, 1);
            },
            addItem() {
                this.value.push('');
            },
            emitChangeEvent() {
                this.$emit('change', this.value.filter(Boolean));
            }
        }
    }

</script>

<style lang="scss" scoped>
    .input-wrapper {
        display: flex;
        margin-bottom: 10px;

        ::v-deep .el-input {
            margin-right: 20px;
        }
    }

    .add-item {
        color: #fff;

        ::v-deep .el-button {
            margin-right: 10px;
        }
    }

</style>
