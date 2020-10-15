<template>
    <div class="menu-wrapper">
        <ul class="list-wrapper">
            <li :class="['item-wrapper', selectedIdx === idx ? 'selected':'']"
                v-for="(item,idx) in formItems"
                :key="item.cType"
                v-dragger="item"
                @click="selectItem(idx)"
                @dblclick="emitItem(item)">
                <div class="item-content">
                    <i class="iconfont icon-danxuankuang" v-if="item.cType === 'radio'" />
                    <i class="iconfont icon-duoxuankuang" v-else-if="item.cType === 'checkbox'" />
                    <i class="iconfont icon-kaiguan" v-else-if="item.cType === 'switch'" />
                    <i class="iconfont icon-shurukuang" v-else-if="item.cType === 'input'" />
                    <i class="iconfont icon-xialacaidan" v-else-if="item.cType === 'select'" />
                    <i class="iconfont icon-shijianxuanze" v-else-if="item.cType === 'timepicker'" />
                    <i class="iconfont icon-riqixuanze" v-else-if="item.cType === 'datepicker'" />
                    <i class="iconfont icon-riqishijian" v-else-if="item.cType === 'datetimepicker'" />
                </div>
                <div class="item-title">{{item.name}}</div>
            </li>
            <!-- <li class="item-wrapper">
                <div class="item-title">文件上传</div>
                <div class="item-content">
                    <el-upload :file-list="fileList"
                               class="upload-demo"
                               action="https://jsonplaceholder.typicode.com/posts/">
                        <el-button size="small" cType="primary">点击上传</el-button>
                    </el-upload>
                </div>
            </li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                startDrag: false,
                formItems: [
                    { cType: 'radio', name: '单选框' },
                    { cType: 'checkbox', name: '多选框' },
                    { cType: 'switch', name: '开关' },
                    { cType: 'input', name: '输入框' },
                    { cType: 'select', name: '选择器' },
                    { cType: 'timepicker', name: '时间选择器' },
                    { cType: 'datepicker', name: '日期选择器' },
                    { cType: 'datetimepicker', name: '日期时间选择器' }
                ],
                options: [
                    { value: '选项1', label: '黄金糕' },
                    { value: '选项2', label: '双皮奶' },
                    { value: '选项3', label: '蚵仔煎' },
                    { value: '选项4', label: '龙须面' },
                    { value: '选项5', label: '北京烤鸭' }
                ],
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                selectedIdx: -1
            }
        },
        methods: {
            selectItem(idx) {
                if (this.selectedIdx === idx) {
                    this.selectedIdx = -1;
                } else {
                    this.selectedIdx = idx;
                }
            },
            emitItem({ cType }) {
                this.$emit('add', {
                    id: Date.now().toString(16),
                    ccType: cType
                })
            },
            startDragHandler() {

            }
        }
    }

</script>

<style lang="scss" scoped>
    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .menu-wrapper {
        padding: .05rem;
        font-size: .14rem;
        box-sizing: border-box;
    }

    .list-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        row-gap: .05rem;
    }


    .item-wrapper {
        width: 49%;
        padding: .1rem 0;
        user-select: none;
        cursor: pointer;
        background: #fff;

        // &.selected {
        // background: rgba(0, 255, 220, .15);
        // }
    }

    ::v-deep .el-radio__label {
        vertical-align: text-bottom;
    }

    .item-content {
        text-align: center;

        i {
            font-size: .24rem;
            color: #0091f1;
            font-weight: 400;
        }
    }

    .item-title {
        line-height: .25rem;
    }

    .hide-wrapper {
        background: #0f0;
    }

</style>
