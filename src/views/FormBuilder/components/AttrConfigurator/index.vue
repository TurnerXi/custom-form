<template>
    <el-tabs class="configurator-tab" v-model="activeName" stretch @tab-click="handleTabClick">
        <el-tab-pane label="表单属性" name="form-attr" v-if="formAttrForm">
            <el-form ref="form" class="form-wrapper" size="mini" label-position="top" v-model="formAttrForm">
                <el-form-item label="表单名称" prop="name">
                    <el-input v-model="formAttrForm.name" />
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="表格属性" name="cell-attr" v-if="cellAttrForm">
            <el-form ref="form" class="form-wrapper" size="mini" label-position="top" v-model="cellAttrForm">
                <el-form-item label="文字位置" prop="textAlign">
                    <el-select v-model="cellAttrForm.textAlign">
                        <el-option label="居中" value="center" />
                        <el-option label="居左" value="left" />
                        <el-option label="居右" value="right" />
                    </el-select>
                </el-form-item>
                <el-form-item label="背景颜色" prop="backgroundColor">
                    <el-color-picker v-model="cellAttrForm.backgroundColor" size="mini" />
                </el-form-item>
                <el-form-item label="文字颜色" prop="textColor">
                    <el-color-picker v-model="cellAttrForm.textColor" size="mini" />
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="控件属性" name="control-attr" v-if="controlAttrForm">
            <el-form ref="form" class="form-wrapper" size="mini" label-position="top" v-model="controlAttrForm">
                <div v-for="(item,idx) in configItems"
                     :key="idx"
                     class="line-wrapper">
                    <el-form-item :label="item.fieldName || item.field" :prop="item.field">
                        <component :is="getComp(item.cType)"
                                   v-bind="item.config"
                                   v-model="controlAttrForm[item.field]"
                                   v-on="getListeners(item)" />
                    </el-form-item>
                </div>
            </el-form>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
    import { deepClone, isObject } from '~/glbcommon/utils';
    import packages from '../../packages';
    export default {
        props: {
            formAttrs: Object,
            cellAttrs: Object,
            controlType: String,
            controlAttrs: Object
        },
        data() {
            return {
                activeName: 'form-attr',
                formAttrForm: null,
                cellAttrForm: null,
                controlAttrForm: null
            }
        },
        computed: {
            configItems() {
                if (this.controlAttrs) {
                    const { createConfItems } = packages[this.controlType];
                    return createConfItems();
                } else {
                    return [];
                }
            }
        },
        watch: {
            controlAttrs(val) {
                this.activeName = val ? 'control-attr' : 'form-attr';
                this.initControlAttrForm();
            },
            cellAttrs(val) {
                if (!this.controlType || this.controlType === 'text') {
                    this.activeName = val ? 'cell-attr' : 'form-attr';
                }
                this.initCellAttrForm();
            },
            formAttrForm: {
                deep: true,
                handler(val) {
                    this.$emit('changeFormAttrs', val)
                }
            },
            cellAttrForm: {
                deep: true,
                handler(val) {
                    this.$emit('changeCellAttrs', val)
                }
            },
            controlAttrForm: {
                deep: true,
                handler(val) {
                    this.$emit('changeControlAttrs', val)
                }
            }
        },
        mounted() {
            this.formAttrForm = deepClone(this.formAttrs || {});
        },
        methods: {
            handleTabClick() {
                // console.log(val);
                // this.activeName = val;
            },
            initControlAttrForm() {
                if (!this.controlAttrs || this.controlType === 'text') {
                    this.controlAttrForm = null;
                } else {
                    const attrs = deepClone(this.controlAttrs);
                    this.controlAttrForm = {}
                    this.$nextTick(() => {
                        this.controlAttrForm = attrs;
                    })
                }
            },
            initCellAttrForm() {
                if (!this.cellAttrs) {
                    this.cellAttrForm = null;
                } else {
                    const attrs = deepClone(this.cellAttrs);
                    this.cellAttrForm = {}
                    this.$nextTick(() => {
                        this.cellAttrForm = attrs;
                    })
                }
            },
            getComp(controlType) {
                const item = packages[controlType];
                return item ? item.component : null;
            },
            getListeners(item) {
                let temp = {};
                let { listeners } = item;

                if (!listeners || !isObject(listeners)) return temp;
                for (const key of Object.keys(listeners)) {
                    if (typeof listeners[key] !== 'function') continue;

                    temp[key] = (e) => listeners[key].call(null, e, this.controlAttrForm);
                }
                return temp;
            }
        }
    }

</script>

<style lang="scss" scoped>
    .configurator-tab {
        height: 100%;
    }

    .form-wrapper {
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }

    .line-wrapper {
        position: relative;
        padding: 5px 100px 0 0;
    }

</style>
