<template>
    <div class="wrapper">
        <div ref="container" class="container">
            <pre class="debug-bpmn">
            {{xml}}
            </pre>
        </div>
        <div ref="properties" class="properties">

        </div>
        <a ref="download" class="download" href="javascript:;">下载</a>
        <a ref="export" class="export" href="javascript:;">导出</a>
    </div>

</template>

<script>
    import Modeler from 'bpmn-js/lib/Modeler';
    import PropertiesPanelModule from 'bpmn-js-properties-panel'
    import PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
    import ModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
    import diagramXML from './diagram.bpmn';
    import { debounce } from 'min-dash';
    export default {
        data() {
            return {
                modeler: null,
                xml: null
            }
        },
        mounted() {
            this.modeler = new Modeler({
                container: this.$refs.container,
                propertiesPanel: {
                    parent: this.$refs.properties
                },
                additionalModules: [ // 右边的属性栏
                    PropertiesPanelModule,
                    PropertiesProviderModule,
                ],
                moddleExtensions: {
                    camunda: ModdleDescriptor
                },
                keyboard: {
                    bindTo: document.body
                }
            })

            this.modeler.importXML(diagramXML);

            this.modeler.get('eventBus').on('elements.changed', () => {
                this.modeler.saveXML({ format: true }).then(({ xml }) => {
                    this.xml = xml;
                })
            })

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

            var downloadLink = this.$refs.download;
            var downloadSvgLink = this.$refs.export;
            const modeler = this.modeler;
            var exportArtifacts = debounce(async function () {

                try {

                    const { svg } = await modeler.saveSVG();

                    setEncoded(downloadSvgLink, 'diagram.svg', svg);
                } catch (err) {

                    console.error('Error happened saving SVG: ', err);

                    setEncoded(downloadSvgLink, 'diagram.svg', null);
                }

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
    }

</script>

<style lang="scss" scoped>
    .wrapper {
        position: relative;
        height: 100vh;
        display: flex;
    }

    .container {
        position: relative;
        flex-basis: 80%;
    }

    .properties {
        flex-basis: 20%;
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
        background-color: #ddd;
        border: 1px solid #333;

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
