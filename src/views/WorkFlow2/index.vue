<template>
    <div class="wrapper">
        <div ref="container" class="container">

            <pre class="debug-bpmn">
            {{xml}}
            </pre>
        </div>
        <div ref="properties" class="properties">
            <component :is="propComponent" :element="element" :key="elementId" />
        </div>

        <a ref="download" class="download" href="javascript:;">下载</a>
        <!-- <a ref="export" class="export" href="javascript:;">导出</a> -->

    </div>

</template>

<script>
    import Modeler from 'bpmn-js/lib/Modeler';
    // import PropertiesPanelModule from 'bpmn-js-properties-panel'
    // import PropertiesProviderModule from './provider/property';
    import PaletteProviderModule from './provider/palette';
    import ContextPadProviderModule from './provider/context';
    import TranslateProviderModule from './provider/translate';
    import ModdleDescriptor from './descriptor/ModdleDescriptor.json';
    import CommonProps from './components/CommonProps';
    import diagramXML from './diagram.bpmn';
    import { debounce } from 'min-dash';
    import { getComponentByEleType } from './helper';

    require('./provider/replace-menu/index.js');
    export default {
        provide: function () {
            return {
                getModeler: this.getModeler
            }
        },
        data() {
            return {
                modeler: null,
                propComponent: null,
                element: null,
                rootElement: null,
                xml: null
            }
        },
        computed: {
            elementId() {
                return this.element ? this.element.id : null;
            }
        },
        watch: {
            xml(val) {
                window.localStorage.setItem('__FS_BPMN', val);
            }
        },
        mounted() {
            this.xml = window.localStorage.getItem('__FS_BPMN') || diagramXML;
            this.initModeler();
        },
        methods: {
            getModeler() {
                return this.modeler;
            },
            initModeler() {
                this.modeler = new Modeler({
                    container: this.$refs.container,
                    propertiesPanel: {
                        parent: this.$refs.properties
                    },
                    additionalModules: [ // 右边的属性栏
                        TranslateProviderModule,
                        // PropertiesPanelModule,
                        // PropertiesProviderModule,
                        PaletteProviderModule,
                        ContextPadProviderModule
                    ],
                    moddleExtensions: {
                        magic: ModdleDescriptor
                    },
                    keyboard: {
                        bindTo: document.body
                    }
                })

                this.modeler.importXML(this.xml, (err) => {
                    if (err) {
                        console.error('加载流程定义失败！');
                    } else {
                        this.rootElement = this.modeler.get('canvas')._rootElement;
                        this.element = this.rootElement;
                        this.propComponent = CommonProps;
                        this.addModelerlistener();
                        this.addEventBusListener();
                    }
                });
                createDownloadLink(this.modeler, this.$refs.download);
            },
            addModelerlistener() {},
            addEventBusListener() {
                const evnetBus = this.modeler.get('eventBus');
                const events = ['elements.changed', 'selection.changed'];
                for (const event of events) {
                    evnetBus.on(event, e => {
                        if (event === 'elements.changed') {
                            this.modeler.saveXML({ format: true }).then(({ xml }) => {
                                this.xml = xml;
                            })
                            this.elementChangedHandler(e);
                        } else if (event === 'selection.changed') {
                            this.elementSelectionHandler(e);
                        }
                    })
                }
            },
            elementChangedHandler(e) {
                if (e.elements.indexOf(this.element) > -1) {
                    // const element = this.element;
                    // this.element = null;
                    // this.$nextTick(() => {
                    //     this.element = element;
                    // })
                }
            },
            elementSelectionHandler(e) {
                const element = e.newSelection[0];
                if (!element) {
                    this.propComponent = CommonProps;
                    this.element = this.rootElement;
                } else {
                    this.propComponent = getComponentByEleType(element.type);
                    this.element = element;
                }
            },
            elementClickedHandler(e) {
                if (!e || e.element.type === 'bpmn:Process') {
                    this.propComponent = CommonProps;
                    this.element = e.element;
                } else {
                    this.propComponent = getComponentByEleType(e.element.type);
                    this.element = e.element;
                }
            },
            setDefaultProperties() {}
        }
    }

    function createDownloadLink(modeler, downloadLink) {
        var exportArtifacts = debounce(async function () {
            try {
                const { xml } = await modeler.saveXML({ format: true });
                setEncoded(downloadLink, 'diagram.bpmn', xml);
            } catch (err) {
                console.log('Error happened saving XML: ', err);
                setEncoded(downloadLink, 'diagram.bpmn', null);
            }
        }, 500);

        modeler.on('commandStack.changed', exportArtifacts);
    }

    function setEncoded(link, name, data) {
        var encodedData = encodeURIComponent(data);

        if (data) {
            link.classList.add('active')
            link.setAttribute('href', 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
            link.setAttribute('download', name);
        } else {
            link.classList.remove('active');
        }
    }

</script>

<style lang="scss" scoped>
    .wrapper {
        height: 100vh;
        display: flex;
    }

    .container {
        position: relative;
        flex-basis: 80%;
    }

    .properties {
        flex-basis: 20%;
        padding: 20px;
        background-color: #eee;
        border-left: 1px solid #333;

    }

    ::v-deep {

        .bpp-properties-panel [type=text],
        .bpp-properties-panel [contenteditable],
        .bpp-properties-panel textarea,
        .bpp-properties-panel select {
            box-sizing: border-box;
        }
    }

    .download,
    .export {
        position: absolute;
        display: inline-block;
        right: 20px;

        padding: 2px 6px;
        color: #000;
        border-radius: 2px;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, .3);
        background-color: #ddd;
        border: 1px solid #333;

        text-decoration: none;

        &:hover,
        &:active,
        &:visited {
            text-decoration: none;
        }
    }

    .download {

        bottom: 80px;
    }

    .export {
        bottom: 40px;
    }

    .debug-bpmn {
        position: absolute;
        width: 100%;
        max-height: 300px;
        overflow: auto;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        margin: 0;
        font-size: 14px;
        padding: 20px 10px;
        box-sizing: border-box;
        z-index: 999;
    }

</style>
