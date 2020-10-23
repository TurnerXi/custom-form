<template>
    <div class="wrapper">
        <div ref="container" class="chart-wrapper">
            <div id="item-start" class="state-item" style="left:0;">State 1</div>
            <div id="item-end" class="state-item" style="left:100px;">State 2</div>
        </div>

        <div v-show="isShowMenu" ref="menu" class="context-menu">
            <div @click="addNode">新增节点</div>
        </div>
    </div>
</template>
<script>
    import 'jsplumb/css/jsplumbtoolkit-defaults.css';
    import { jsPlumb } from 'jsplumb';

    const defaultConfig = {
        Connector: ['Flowchart'],
        Anchor: "AutoDefault",
        Endpoint: 'Dot',
        EndpointStyle: { fill: 'transparent' },
        EndpointHoverStyle: {
            radius: 5,
            fill: 'darkgray',
            outlineStroke: 'darkgray',
            outlineWidth: 1
        },
        Overlays: [
            ['Arrow', { width: 8, length: 8, location: 1 }]
        ],
        PaintStyle: { stroke: '#909399', strokeWidth: 2 },
        MaxConnections: -1
    };

    export default {
        data() {
            return {
                nodeid: 0,
                jsplumb: null,
                isShowMenu: false
            }
        },
        mounted() {
            this.initJsPlumb();
            this.initEvent();
        },
        methods: {
            initEvent() {
                document.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.isShowMenu = true;
                    this.$nextTick(() => {
                        this.$refs.menu.style.left = e.pageX + 'px';
                        this.$refs.menu.style.top = e.pageY + 'px';
                    })
                })
            },
            initJsPlumb() {
                this.jsplumb = jsPlumb.getInstance(defaultConfig);

                jsPlumb.importDefaults({
                    ConnectionsDetachable: false
                })
                this.jsplumb.ready(() => {
                    this.jsplumb.bind("click", function (connection, originalEvent) {
                        console.log(connection, originalEvent);
                    });

                    this.jsplumb.bind("contextmenu", function (component, originalEvent) {
                        originalEvent.preventDefault();
                        console.log(component, originalEvent);
                    });
                    this.jsplumb.draggable('item-end');

                    this.jsplumb.makeSource('item-start');
                    this.jsplumb.makeTarget('item-end');
                    this.jsplumb.connect({
                        source: 'item-start',
                        target: 'item-end',
                        label: "FOO"
                    })
                })
            },
            addNode(e) {
                const id = 'item-' + this.nodeid++;
                const div = document.createElement('div');
                div.setAttribute('id', id);
                div.setAttribute('class', 'state-item');
                div.style.left = e.pageX + 'px';
                div.style.top = e.pageY + 'px';
                div.innerText = id;
                this.$refs.container.appendChild(div);
                const common = {
                    isSource: true,
                    isTarget: true
                };
                this.jsplumb.draggable(id);
                this.jsplumb.makeTarget(id);
                this.jsplumb.addEndpoint(id, { anchor: 'Left' }, common)
                this.jsplumb.addEndpoint(id, { anchor: 'Right' }, common)
                this.jsplumb.addEndpoint(id, { anchor: 'Top' }, common)
                this.jsplumb.addEndpoint(id, { anchor: 'Bottom' }, common)
            }
        }
    }

</script>

<style lang="scss" scoped>
    .wrapper {
        // user-select: none;
    }

    .chart-wrapper {
        position: relative;
        background:
            radial-gradient(ellipse at top left,
                rgba(255, 255, 255, 1) 40%,
                rgba(229, 229, 229, .9) 100%);
        height: 100vh;
        padding: 60px 80px;
        width: 100vw;
        box-sizing: border-box;
    }

    ::v-deep .state-item {
        position: absolute;
        width: 80px;
        height: 40px;
        color: #606266;
        background: #f6f6f6;
        border: 2px solid rgba(0, 0, 0, 0.05);
        text-align: center;
        line-height: 40px;
        font-family: sans-serif;
        border-radius: 4px;
        margin-right: 60px;
    }

    .line-wrap {
        display: flex;
        margin-bottom: 40px;
    }

    .context-menu {
        position: fixed;
        width: 150px;
        text-align: center;
        border: 1px solid #333;
        border-bottom-width: 0;

        div {
            border-bottom: 1px solid #333;
            line-height: 32px;
        }
    }

</style>
