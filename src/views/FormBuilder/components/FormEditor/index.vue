<template>
    <div class="editor-wrapper">
        <table ref="table" class="editor-main">
            <tr v-for="row in rows" :key="row">
                <template v-for="(cell,idx) in cells">
                    <td v-if="cell && cell.start[1] === row"
                        :key="idx"
                        :data-idx="calcIdx(cell.start[0],cell.start[1])"
                        :colspan="colspan(cell)"
                        :rowspan="rowspan(cell)"
                        :class="['editor-cell',selected.indexOf(idx)>-1?'selected':'']"
                        :style="cellStyle(cell,idx)"
                        v-dropper="dropEvent"
                        @mousedown="cellBindEvent($event,idx)">
                        <div v-if="cell.cType === 'text'" :ref="'text'+idx"
                             class="editor-text-content"
                             @input="cellInputHandler(cell,$event)"
                             @blur="cellBlurHandler(cell,$event)">
                            {{cell.content}}
                        </div>
                        <div v-else>
                            <component :is="compMap[cell.cType]" v-bind="cell.content" v-model="cell.value" />
                            <el-button type="text"
                                       title="清除内容"
                                       class="el-icon-delete-solid clear-content"
                                       v-if="cell.cType && cell.cType !== 'text'"
                                       @click="clearContent(idx)" />
                        </div>
                    </td>
                </template>
            </tr>
        </table>
    </div>
</template>

<script>
    import packages from '../../packages'
    export default {
        model: {
            event: 'change',
            prop: 'layout'
        },
        props: {
            cmd: String,
            rows: {
                type: Number,
                default: 0
            },
            cols: {
                type: Number,
                default: 0
            },
            layout: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                editIdx: -1,
                selected: [],
                cells: []
            }
        },
        computed: {
            compMap() {
                let map = {};
                for (const key of Object.keys(packages)) {
                    map[key] = packages[key].component;
                }
                return map;
            }
        },
        watch: {
            cmd(val) {
                if (val === 'merge') {
                    this.mergeCell();
                } else if (val === 'split') {
                    this.splitCell();
                }
            },
            layout(val) {
                if (this.cells !== val) {
                    this.initCells();
                }
            }
        },
        mounted() {
            this.initCells();
        },
        methods: {
            initCells() {
                this.cells = this.layout.map(item => {
                    return item ? {
                        start: item.start,
                        end: item.end,
                        state: item.state || 'cell',
                        cType: item.cType || 'text',
                        content: item.content || '',
                        attrs: item.attrs || {}
                    } : null
                });
                this.emitEvent();
            },
            emitEvent() {
                this.$emit('change', this.cells);
            },
            colspan(item) {
                return item.end[0] - item.start[0] + 1;
            },
            rowspan(item) {
                return item.end[1] - item.start[1] + 1;
            },
            cellStyle(cell, idx) {
                return {
                    width: this.cellWidth(idx),
                    height: this.cellHeight(idx),
                    lineHeight: this.cellHeight(idx),
                    textAlign: cell.attrs.textAlign || 'center',
                    backgroundColor: cell.attrs.backgroundColor,
                    color: cell.attrs.textColor,
                    fontSize: cell.attrs.fontSize
                }
            },
            cellWidth(idx) {
                let item = this.cells[idx];
                return `${this.colspan(item) * 100/this.cols}%`;
            },
            cellHeight(idx) {
                let item = this.cells[idx];
                return `${this.rowspan(item) * .25}rem`;
            },
            calcIdx(x, y) {
                return (y - 1) * this.cols + x - 1;
            },
            mergeCell() {
                if (this.selected.length <= 1) return;

                for (const idx of this.selected) {
                    if (this.cells[idx].state === 'merge') {
                        return;
                    }
                }
                const selected = this.selected;
                const cells = [...this.cells];
                const startItem = cells[selected[0]];
                const endItem = cells[selected[selected.length - 1]];
                startItem.end[0] = endItem.end[0];
                startItem.end[1] = endItem.end[1];
                startItem.state = 'merge';
                this.cells = cells.map((item, idx) => selected.indexOf(idx) > 0 ? null : item);
                this.selected = [this.selected[0]];
                this.emitEvent();
            },
            splitCell() {
                const selected = [...this.selected];
                const cells = [...this.cells];
                const { cType, content } = this.cells[selected[0]];
                for (const idx of selected) {
                    if (cells[idx] && cells[idx].state === 'merge') {
                        const { start, end } = cells[idx];
                        for (let y = start[1]; y <= end[1]; y++) {
                            for (let x = start[0]; x <= end[0]; x++) {
                                const k = this.calcIdx(x, y);
                                this.cells[k] = { start: [x, y], end: [x, y], state: 'cell' }
                                if (selected.indexOf(k) === -1) {
                                    selected.push(k);
                                }
                            }
                        }
                    }
                }
                this.cells[selected[0]].cType = cType;
                this.cells[selected[0]].content = content;
                this.selected = selected.sort((a, b) => (a - b));
                this.emitEvent();
            },
            dropEvent(data, e) {
                const idx = Number(e.currentTarget.dataset.idx);
                const { cType } = data;
                const { createDefaultConf } = packages[cType];

                this.cells[idx].cType = cType;
                this.cells[idx].content = createDefaultConf();
                this.selected = [idx];
                this.$emit('select', this.selected);
                this.emitEvent();
            },
            cellBlurHandler(cell, e) {
                const el = e.currentTarget;
                el.contentEditable = false;
                el.innerText = cell.content;
                this.editIdx = -1;
                this.emitEvent();
            },
            cellInputHandler(cell, e) {
                cell.content = e.currentTarget.innerText;
            },
            clearContent(idx) {
                this.$set(this.cells[idx], 'cType', 'text')
                this.$set(this.cells[idx], 'content', '')
                this.emitEvent();
            },
            cellBindEvent(e, idx) {
                const { currentTarget } = e;
                let isClick = true;
                let startX = e.pageX;
                let startY = e.pageY;

                const list = this.$refs.table.querySelectorAll('td');
                const mousemove = (ev) => {
                    ev.preventDefault();
                    if (this.editIdx > -1) return;
                    const { pageX, pageY } = ev;
                    const [distX, distY] = [pageX - startX, pageY - startY];
                    if (isClick && distX * distX + distY * distY > 10) {
                        isClick = false;
                    }

                    if (!isClick) {
                        // 拖动
                        let px = Math.min(startX, pageX);
                        let py = Math.min(startY, pageY);
                        let width = Math.abs(distX);
                        let height = Math.abs(distY);

                        this.selected = [];
                        // drawHelper(startX, startY, pageX, pageY);
                        for (let i = 0; i < list.length; i++) {
                            const element = list[i];
                            const idx = Number(element.dataset.idx);
                            if (this.selected.indexOf(idx) < 0) {
                                const box = element.getBoundingClientRect();
                                if (isRectCollision(box.left, box.top, box.width, box.height, px, py, width, height)) {
                                    // drawBox(box);
                                    this.selected.push(idx);
                                }
                            }
                        }
                    }

                }

                const mouseup = (ev) => {
                    ev.preventDefault();
                    document.removeEventListener('mousemove', mousemove, false);
                    document.removeEventListener('mouseup', mouseup, false);

                    if (this.editIdx > -1) return;

                    if (isClick) {
                        if (this.editIdx === -1) {
                            this.selected = [idx];
                            this.$emit('select', this.selected);
                        }
                    } else {
                        this.selected = this.selected.sort((a, b) => (a - b));
                        this.$emit('select', this.selected);
                    }

                }

                document.addEventListener('mousemove', mousemove, false);
                document.addEventListener('mouseup', mouseup, false);

                if (this.cells[idx].cType !== 'text') return;

                // dblclick
                if (currentTarget.clicked) {
                    currentTarget.clicked = false;
                    this.selected = [];
                    this.editIdx = idx;
                    const el = this.$refs['text' + idx][0];
                    el.contentEditable = true;
                    el.focus();
                    return;
                } else {
                    currentTarget.clicked = true;
                    setTimeout(() => {
                        currentTarget.clicked = false;
                    }, 200);
                }
            }
        }
    }


    function isRectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x1 > x2 && x1 > x2 + w2) {
            return false;
        } else if (x1 < x2 && x1 + w1 < x2) {
            return false;
        } else if (y1 > y2 && y1 > y2 + h2) {
            return false;
        } else if (y1 < y2 && y1 + h1 < y2) {
            return false;
        }
        return true;
    }


    // 画辅助线
    // const drawHelper = (() => {
    //     let div;
    //     return function (startX, startY, endX, endY) {
    //         if (div) {
    //             document.body.removeChild(div);
    //         }
    //         div = document.createElement('div');
    //         let px = Math.min(startX, endX);
    //         let py = Math.min(startY, endY);
    //         let width = Math.abs(startX - endX);
    //         let height = Math.abs(startY - endY);
    //         div.style.position = 'fixed';
    //         div.style.left = px + 'px';
    //         div.style.top = py + 'px';
    //         div.style.width = width + 'px';
    //         div.style.height = height + 'px';
    //         div.style.border = '1px solid #f00';
    //         document.body.appendChild(div);
    //     }
    // })();

    // 画辅助线
    // const drawBox = (() => {
    //     let div;
    //     return function ({ left, top, width, height }) {
    //         console.log(left, top, width, height)
    //         if (div) {
    //             // document.body.removeChild(div);
    //         }
    //         div = document.createElement('div');
    //         div.style.position = 'fixed';
    //         div.style.left = left + 'px';
    //         div.style.top = top + 'px';
    //         div.style.width = width + 'px';
    //         div.style.height = height + 'px';
    //         div.style.border = '1px solid #0f0';
    //         document.body.appendChild(div);
    //     }
    // })();

</script>

<style lang="scss" scoped>
    .editor-wrapper {
        // width: 80%;
        height: 80%;
        margin: auto 1rem;
        margin-top: .5rem;
        background-color: #fff;
    }

    .editor-main {
        width: 100%;
    }

    table {
        border-collapse: collapse;
        table-layout: fixed;
        word-break: break-all;
    }

    td.editor-cell {
        position: relative;
        border: 1px solid #000;

        &.selected {
            background-color: #bde9ff !important;
        }

        .clear-content {
            position: absolute;
            display: none;
            right: .02rem;
            top: .02rem;
            padding: 0;
            font-size: .14rem;
            color: #f40;
        }

        &:hover {
            .clear-content {
                display: block;
            }
        }
    }

    .editor-text-content {
        height: 100%;
    }

</style>
