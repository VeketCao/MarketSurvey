<template>
    <div class="page-item-view "
         v-if="element && element.key"
         :class="{active:curSelect.key==element.key}"
         @mousedown="handleClick(index)"
    >
        <component :is="element.name" :data="element" mode="designer"></component>
        <!--<div class="mask-layer"></div>-->
        <div class="tool-bar">
            <div class="right-btn">
                <a @click="deleteHandle(index)"><Icon type="ios-trash" size="20"/></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageItem",
        props:['element','select','index','data'],
        data(){
            return{
                curSelect:this.select,
            }
        },
        mounted(){
        },
        methods:{
            handleClick(){
                this.curSelect = this.data.items[this.index];
            },
            deleteHandle(index){
                if (this.data.items.length - 1 === index) {
                    if (index === 0) {
                        this.curSelect = {}
                    } else {
                        this.curSelect = this.data.items[index - 1]
                    }
                } else {
                    this.curSelect = this.data.items[index + 1]
                }

                this.$nextTick(() => {
                    this.data.items.splice(index, 1)
                    this.data.items.forEach((it,i) => {
                        it.opts.seq = i+1
                    })
                })
            }
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
        }

    }
</script>

<style scoped lang="less">
    .mask-layer{
        height: 100%;
        width: calc(100% - 30px);
        position:absolute;
        top :0px;
        left:0px;
        right: 0px;
        background-color: #0C1835;
        opacity:0;
        text-align:center;
        z-index:500;
    }
    .page-item-view{
        position: relative;
        border: 1px dashed #999;
        /*background-color: rgba(236,245,255,.3);*/
        min-height: 50px;
        &.ghost{
            list-style: none;
            font-size: 0;
            display: block;
            position: relative;
            border: 2px solid red!important;
            width: 100%;
            height: 1px!important;
            min-height: 1px!important;
        }
        &.active{
            border: 2px solid #409eff;
           /* background-color: #b3d8ff;*/
            .tool-bar{
                display: block;
                position: absolute;
                width: 20px;
                right: 0;
                bottom: 0;
                .right-btn{
                    position: relative;
                    float: right;
                    /*background-color: #409eff;*/
                    a{
                        padding: 0px 5px;
                        cursor: pointer;
                    }
                }
            }
        }
        &:after{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            display: block;
            z-index: 1001;
        }

        &:hover{
            background: #ecf5ff;
            //border-left: 1px solid #ecf5ff;
        }

        &.active{
            //border-left: 1px solid #409EFF;
           /* background: #b3d8ff;*/
        }
        .tool-bar{
            display: none;
        }
    }

</style>