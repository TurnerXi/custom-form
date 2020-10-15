<template>
    <div class="wrapper">
        <div class="head-wrapper">
            <ToolBar @exec="execCmd" />
        </div>
        <div class="body-wrapper">
            <SideDrawer class="sider" direction="ltr">
                <ControlPanel />
            </SideDrawer>

            <FormEditor class="main"
                        :rows="rows"
                        :cols="cols"
                        :cmd="cmd"
                        v-model="layout"
                        @select="selectItemHandler" />

            <SideDrawer class="sider" direction="rtl">
                <AttrConfigurator :formAttrs="formAttrs"
                                  :cellAttrs="cellAttrs"
                                  :controlAttrs="controlAttrs"
                                  :controlType="controlType"
                                  @changeFormAttrs="changeFormAttrsHandler"
                                  @changeCellAttrs="changeCellAttrsHandler"
                                  @changeControlAttrs="changeControlAttrsHandler" />
            </SideDrawer>
        </div>
    </div>
</template>

<script>
    import SideDrawer from '~/glbcommon/components/SideDrawer';
    import AttrConfigurator from './components/AttrConfigurator';
    import ControlPanel from './components/ControlPanel';
    import FormEditor from './components/FormEditor';
    import ToolBar from './components/ToolBar';

    export default {
        components: {
            AttrConfigurator,
            ControlPanel,
            FormEditor,
            ToolBar,
            SideDrawer
        },
        data() {
            return {
                cmd: '',
                rows: 10,
                cols: 24,
                layout: [],
                formAttrs: { name: '表单名称' },
                selected: []
            }
        },
        computed: {
            selectedCells() {
                return this.selected.map(idx => this.layout[idx]);
            },
            cellAttrs() {
                if (this.selectedCells.length === 1) {
                    return this.selectedCells[0].attrs;
                } else if (this.selectedCells.length > 1) {
                    return {};
                } else {
                    return null;
                }
            },
            controlType() {
                if (this.selectedCells.length === 1) {
                    return this.selectedCells[0].cType;
                } else {
                    return null;
                }
            },
            controlAttrs() {
                if (this.selectedCells.length === 1) {
                    const cell = this.selectedCells[0];
                    return cell.cType !== 'text' ? cell.content : null;
                } else {
                    return null;
                }
            }
        },
        created() {
            this.initLayout();
        },
        mounted() {
            window.onbeforeunload = () => {
                if (JSON.stringify(this.layout) !== window.localStorage.getItem('formjson'))
                    return "表单未保存，是否继续退出?";
            }
        },
        methods: {
            initLayout() {
                const json = window.localStorage.getItem('formjson')
                if (json) {
                    this.layout = JSON.parse(json);
                } else {
                    const arr = []
                    for (let y = 1; y <= this.rows; y++) {
                        for (let x = 1; x <= this.cols; x++) {
                            arr.push({ start: [x, y], end: [x, y] })
                        }
                    }
                    this.layout = arr;
                }
            },
            execCmd(cmd) {
                if (cmd === 'save') {
                    window.localStorage.setItem('formjson', JSON.stringify(this.layout));
                    return;
                }
                this.cmd = cmd;
                this.$nextTick(() => {
                    this.cmd = '';
                })
            },
            changeFormAttrsHandler(val) {
                this.formAttrs = val;
            },
            changeCellAttrsHandler(val) {
                if (this.selectedCells.length === 1) {
                    let { attrs } = this.selectedCells[0];
                    for (const key of Object.keys(val)) {
                        this.$set(attrs, key, val[key]);
                    }
                } else {
                    for (const cell of this.selectedCells) {
                        const { attrs } = cell;
                        for (const key of Object.keys(val)) {
                            this.$set(attrs, key, val[key]);
                        }
                    }
                }
            },
            changeControlAttrsHandler(val) {
                if (this.controlAttrs) {
                    let { content } = this.selectedCells[0];
                    for (const key of Object.keys(val)) {
                        this.$set(content, key, val[key]);
                    }
                }
            },
            selectItemHandler(selected) {
                this.selected = selected;
            }
        }
    }

</script>

<style lang="scss" scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .head-wrapper {
        height: .55rem;
        background-color: gray;
    }

    .body-wrapper {
        flex: 1;
        position: relative;
        display: flex;
        background-color: gray;

        .main {
            flex: 1;
        }

        .sider {
            position: relative;
        }

    }

</style>
