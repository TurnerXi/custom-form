<script>
    export default {
        model: {
            prop: 'mvalue',
            event: 'mchange'
        },
        props: ['mvalue'],
        computed: {
            value: {
                get() {
                    return this.mvalue;
                },
                set(val) {
                    this.$emit('mchange', val);
                }
            }
        },
        created() {
            this.value = this.defaultValue;
        },
        methods: {
            isObject(obj) {
                return Object.prototype.toString.call(obj) === "[object Object]";
            }
        }
    }

</script>
