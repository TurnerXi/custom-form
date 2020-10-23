<script>
    import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
    export default {
        inject: ['getModeler'],
        props: {
            element: {
                type: Object,
                default: () => null
            }
        },
        data() {
            return {
                modeler: null, // 设计器
                moddle: null, // businessObject
                bpmnFactory: null
            }
        },
        created() {
            this.modeler = this.getModeler();
            this.moddle = getBusinessObject(this.element);
            this.bpmnFactory = this.modeler.get('bpmnFactory');
        },
        methods: {
            updateProperties(entry, element = this.element) {
                const modeling = this.modeler.get('modeling')
                modeling.updateProperties(element, entry);
                console.log(modeling);
            }
        }
    }

</script>
