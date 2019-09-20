<template>
    <div class="preview">
        <!--<div class="tool-bar">
            <div>
                电脑预览
            </div>
        </div>-->
        <div class="content">
            <div class="box">
                <div class="page" v-if="pageConfig">
                    <div class="header-title">
                        <div class="t-name">{{pageConfig.opts.title || '标题'}}</div>
                        <div class="t-des">{{pageConfig.opts.desc || '问卷说明xxxx'}}</div>
                    </div>
                    <div class="item-list">
                        <template v-for="(it,index) in pageConfig.items">
                            <component :is="it.name" :data="it" :key="it.key" mode="edit"></component>
                        </template>
                    </div>
                </div>
                <div class="footer-btn">
                    <Button type="primary" style="width: 200px" @click="commitHandle">提交</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Preview",
        data(){
            return{
                pageConfig:null
            }
        },
        mounted() {
            this.pageConfig = JSON.parse(localStorage.getItem('pageConfig'))
            console.log('Preview',this.pageConfig)
        },
        methods:{
            commitHandle(){
                console.log('commitHandle',this.pageConfig)
            }
        }
    }
</script>

<style lang="less" scoped>
    .preview{
        background-color: #F3F6FA;
        background-image: url(../../../img/bg@2x.jpg);
        background-repeat: repeat-x;
        background-size: 1px 300px;
        .tool-bar{
            position: fixed;
            top:0;
            z-index: 1;
            height: 70px;
            width: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0px 1px 0px 0px rgba(232,232,232,1);
        }
        .content{
            width: 920px;
            background: url(../../../img/bk@2x.jpg) no-repeat top center;
            background-size: 910px 144px;
            padding-top: 120px;
            margin: 0 auto;
            min-height: 900px;
            .box{
                background: white;
                width: 920px;
                min-height: 660px;
                margin: 0 auto;
                box-shadow: 0px 1px 6px 0px rgba(205,220,245,1);
                .page{
                    min-height: 600px;
                    .header-title{
                        width: 100%;
                        height: 100px;
                        .t-name{
                            text-align: center;
                            font-size: 24px;
                            font-weight: bold;
                            vertical-align: middle;
                            padding: 20px 0;
                            line-height: 30px;
                        }
                        .t-des{
                            color: #555555;
                            text-align: left;
                            font-size: 14px;
                            padding: 0px 50px;
                            border: 0;
                        }
                    }
                    .item-list{
                        width: 100%;
                        padding: 0px 49px;
                    }
                }
            }
            .footer-btn{
                width: 100%;
                height: 100px;
                text-align: center;
            }
        }
    }
</style>