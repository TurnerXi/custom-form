<template>
    <el-form v-model="form">
        <el-form-item label="编号"> {{form.id}} </el-form-item>
        <el-form-item label="条件" v-if="hasCondition">
            <el-input v-model="form.condition" />
        </el-form-item>
    </el-form>
</template>

<script>
    import BasePropsModule from './BasePropsModule.vue'
    import EventDefinitionHelper from '../helper/EventDefinitionHelper';
    import ElementHelper from '../helper/ElementHelper';
    import { is } from 'bpmn-js/lib/util/ModelUtil'
    export default {
        mixins: [BasePropsModule],
        data() {
            return {
                hasCondition: false,
                form: {
                    id: null,
                    condition: null,
                }
            }
        },
        watch: {
            'form.condition'(val) {
                const conditionProps = { body: val }
                let conditionOrConditionExpression = ElementHelper.createElement('bpmn:FormalExpression', conditionProps,
                    this.moddle, this.bpmnFactory);
                const source = this.element.source;
                if (source && source.businessObject.default === this.moddle) {
                    this.updateProperties({ 'default': undefined }, source);
                }

                this.moddle.set('conditionExpression', conditionOrConditionExpression)
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                let attrs = ['id'];
                for (const attr of attrs) {
                    this.form[attr] = this.moddle[attr];
                }

                if (is(this.element.source, 'bpmn:ExclusiveGateway') ||
                    is(this.element.source, 'bpmn:InclusiveGateway')) {
                    this.hasCondition = true;
                }

                this.initConditionProp();
            },
            initConditionProp() {
                let conditionalEventDefinition = EventDefinitionHelper.getConditionalEventDefinition(this.element);

                const conditionExpression = conditionalEventDefinition ?
                    conditionalEventDefinition.condition :
                    this.moddle.conditionExpression;

                if (conditionExpression) {
                    // this.form.conditionType = 'expression';
                    this.form.condition = conditionExpression.get('body');
                }
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
