<template>
    <div :class="[direction,'drawer-wrapper']">
        <transition name="collapse">
            <div v-if="!isCollapse" class="drawer">
                <div class="drawer-inner">
                    <slot />
                </div>
            </div>
        </transition>
        <div :class="['handler',handlerClz]" @click="isCollapse=!isCollapse" />
    </div>
</template>

<script>
    export default {
        props: {
            direction: {
                type: String,
                default: 'ltr'
            }
        },
        computed: {
            handlerClz() {
                return this.direction === 'ltr' && this.isCollapse ||
                    this.direction === 'rtl' && !this.isCollapse ?
                    'el-icon-d-arrow-right' :
                    'el-icon-d-arrow-left'
            }
        },
        data() {
            return {
                isCollapse: false
            }
        }
    }

</script>

<style lang="scss" scoped>
    .drawer-wrapper {
        position: absolute;
        height: 100%;
    }

    .drawer {
        width: 3rem;
        height: 100%;
        overflow: hidden;
    }

    .drawer-inner {
        width: 3rem;
        height: 100%;
        background-color: #eee;
    }

    .handler {
        position: absolute;
        top: .2rem;
        width: .3rem;
        height: .6rem;
        line-height: .6rem;
        background-color: #ccc;
        color: #333;
        font-size: .16rem;
        box-sizing: border-box;
        cursor: pointer;
    }


    .ltr {
        left: 0;
        top: 0;
        bottom: 0;

        .handler {
            left: 100%;
            padding-left: .05rem;
            border-radius: 0 .6rem .6rem 0;
            text-align: left;
        }
    }

    .rtl {
        right: 0;
        top: 0;
        bottom: 0;

        .handler {
            right: 100%;
            padding-right: .05rem;
            border-radius: .6rem 0 0 .6rem;
            text-align: right;
        }
    }

    .collapse-enter-active,
    .collapse-leave-active {
        transition: width .5s;
    }

    .collapse-enter,
    .collapse-leave-to {
        width: 0;
    }

</style>
