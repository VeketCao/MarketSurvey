<template>
    <div class="left-cate">
        <div class="cate-list">

            <div class="title">考试题型</div>
            <draggable tag='ul'
                       :list="basicComponents"
                       v-bind="{group:{ name:'g', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                       :move="allowMove"
            >
                <li class="cate-item" v-for="(item,index) in basicComponents" :key="index" :name="item.name">
                    <a @click="clickHandle(item)"><span>{{item.desc}}</span></a>
                </li>
            </draggable>

        </div>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable'
    import api from '@/api/main'

    export default {
        name: "LeftCate",
        data(){
            return{
                basicComponents:api.getBasicComponents()
            }
        },
        methods:{
            clickHandle(it){
                Bus.$emit('addItemClick', it);
            },
            allowMove(){
                return true
            }
        },
        components:{
            Draggable,
        }
    }
</script>

<style scoped lang="less">
    .left-cate{
        position: fixed;
        top: 50px;
        bottom: 0;
        left: 0;
        width: 250px;
        background-color: #fff;
        .cate-list{
            padding: 5px 0px;
            width: 100%;
            height: 100%;
            position: relative;
            .title{
                font-size: 14px;
                line-height: 20px;
            }
            ul{
                position: relative;
                overflow: hidden;
                padding: 4%;
                margin: 0;
            }
            .cate-item{
                position: relative;
                width: 48%;
                margin: 1%;
                line-height: 26px;
                border: 1px solid #f4f6fc;
                border-radius: 2px;
                background-color: #f4f6fc;
                cursor: move;
                transition: background ease-in-out 0.15s;
                float:left;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #333;
                font-size: 12px;
                &:hover{
                    color: #409EFF;
                    border: 1px dashed #409EFF;
                }

                &>a{
                    display: block;
                    cursor: move;
                    background: #F4F6FC;
                    border: 1px solid #F4F6FC;
                    text-align: center;
                    span{
                        display: inline-block;
                        vertical-align: middle;
                    }
                }

            }
        }
    }
</style>