<template>
    <div class="mid-page-container">
        <div class="page">
            <div class="header-title">
                <div class="t-name">{{data.opts.title || '标题'}}</div>
                <div class="t-des">{{data.opts.desc || '问卷说明xxxx'}}</div>
            </div>
            <draggable class="page-list"
                       v-model="data.items"
                       v-bind="{group:'g', ghostClass: 'ghost'}"
                       @end="refreshSeq"
                       @add="handleWidgetAdd">
                <template v-for="(it,index) in data.items">
                    <pageItem v-if="it" :key="it.key" :element="it" :index="index" :data="data" :select.sync="curSelect"></pageItem>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable'
    import PageItem from './PageItem/main'

    export default {
        name: "MidPage",
        props:['data','select'],
        data(){
            return{
                curSelect: this.select
            }
        },
        mounted(){
            Bus.$on('addItemClick', this.addItemClick);
        },
        methods:{
            refreshSeq(){
                this.data.items.forEach((it,i) => {
                    it.opts.seq = i+1
                })
            },
            addItem(newIndex,it){
                const key = AppUtil.getUUID();
                this.$set(this.data.items,newIndex,{
                    ...JSON.parse(JSON.stringify(it)),
                    key,
                })
                this.curSelect = this.data.items[newIndex];
                this.refreshSeq()
            },
            addItemClick(it){
                const newIndex = this.data.items.length
                this.addItem(newIndex,it)
            },
            handleWidgetAdd(e){//添加实例化后id
                const newIndex = e.newIndex
                this.addItem(newIndex,this.data.items[newIndex])
            }
        },
        components:{
            Draggable,
            PageItem,
        },
        watch: {
            select (val) {
                this.curSelect = val
            },
            curSelect: {
                handler (val) {
                    this.$emit('update:select', val)
                },
                deep: true
            }
        },
        beforeDestroy() {
            Bus.$off('addItem', this.addItemClick);
        }
    }
</script>
<style scoped lang="less">
    .mid-page-container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        .page{
            width: 100%;
            height: 100%;
            /*border: 1px dashed #999;*/
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }
            .header-title{
                width: 100%;
                height: 100px;
                border-bottom: 1px dashed #999;
                .t-name{
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    vertical-align: middle;
                    padding: 10px 0;
                    line-height: 30px;
                }
                .t-des{
                    color: #555555;
                    text-align: left;
                    font-size: 14px;
                    padding: 5px 50px;
                    border: 0;
                }
            }
            .page-list{
                /*border: 1px dashed #999;*/
                width: 100%;
                height: 100%;
                .column-layout-row{
                    position: relative;
                    width: 100%;
                    min-height: 60px;
                    padding: 5px;
                    border: 1px dashed goldenrod;
                    overflow: hidden;
                    .tool-bar{
                        display: none;
                    }
                    &.active{
                        border: 2px solid goldenrod;
                        .tool-bar{
                            display: block;
                            position: absolute;
                            width: 20px;
                            right: 0;
                            bottom: 0;
                            .right-btn{
                                position: relative;
                                float: right;
                                background-color: goldenrod;
                                a{
                                    padding: 0px 5px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    &.ghost{
                        &:after{
                            background: #fff;
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            display: block;
                            z-index: 10;
                        }
                    }

                    .column-layout-cell{
                        position: relative;
                        display: inline;
                        border: 1px dashed #999;
                        width: 50%;
                        float: left;
                        &.width3{
                            width: 33.33%!important;
                        }
                        &.width4{
                            width: 25%!important;
                        }
                        .cell-list{
                            z-index: 100001;
                            width: 100%;
                            min-height: 50px;
                        }
                    }

                }
            }

        }
    }

</style>