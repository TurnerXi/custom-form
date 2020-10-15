<template>
    <div class="wrapper">
        <div class="head-wrapper">
            <ToolBar @exec="execCmd" />
        </div>
        <div class="body-wrapper">
            <SideDrawer class="sider" direction="ltr">
                <ControlPanel />
            </SideDrawer>
            <FormEditor class="main" :cmd="cmd" />
            <SideDrawer class="sider" direction="rtl">
                <AttrConfigurator />
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
                isShowLeft: true,
                cmd: ''
            }
        },
        methods: {
            execCmd(cmd) {
                this.cmd = cmd;
                this.$nextTick(() => {
                    this.cmd = '';
                })
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
