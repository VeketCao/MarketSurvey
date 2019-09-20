<template>
    <div class="multi-choice" v-if="data && (mode=='designer' || data.opts.logic.tmgl.length==0 ||toShow)">
        <div class="t-header">
            <span style="color: red" v-if="data.opts.require">*</span>
            <span>{{data.opts.seq}}.</span>
            <span style="margin-left: 5px">{{data.opts.title || '题标题'}}</span>
        </div>
        <div class="t-desc" v-if="data.opts.desc">{{data.opts.desc}}</div>
        <div class="t-list">
            <CheckboxGroup v-model="data.opts.answer" :vertical="data.opts.vertical" :class="{'ivu-checkbox-group-vertical':data.opts.vertical}" @on-change="changeHandle">
                <Checkbox v-for="(item,index) in data.opts.list" :label="item.index" :key="index" style="height: 40px">
                    <span>{{item.name}}</span><input v-if="item.isRemark" v-model="item.remark" class="i-remark"></input>
                    <div v-if="item.desc" class="s-desc">{{item.desc}}</div>
                </Checkbox>
            </CheckboxGroup>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MultiChoice',
        props:{
            data:{
                type: Object,
                default:null
            },
            mode:{
                type:String,
                default: ''
            }
        },
        data(){
            return{
                toShow:false
            }
        },
        mounted() {
            if(this.data && this.data.opts.logic.tmgl.length>0){//有题目关联开启监听
                Bus.$on('tmglEvent',this.toShowHandle)
            }
        },
        methods:{
            changeHandle(it){
                Bus.$emit('tmglEvent',{key:this.data.key,v:this.data.opts.answer})
            },
            toShowHandle(p){
                if(p.key == this.data.opts.logic.tmgl[0].gltmKey){//多选的p.v是个数组
                    if(_.isArray(p.v)){//多选的p.v是个数组
                        if(_.intersection(this.data.opts.logic.tmgl[0].glxxIndex,p.v).length>0){
                            this.toShow = true
                        }else{
                            this.toShow = false
                        }
                    }else{
                        if(this.data.opts.logic.tmgl[0].glxxIndex.indexOf(p.v)!=-1){
                            this.toShow = true
                        }else{
                            this.toShow = false
                        }
                    }
                }
            }
        },
        beforeDestroy() {
            if(this.data && this.data.opts.logic.tmgl.length>0){
                Bus.$off('tmglEvent',this.toShowHandle)
            }
        }
    }
</script>
<style lang="less">
    .ivu-checkbox-wrapper{
        position: relative;
        white-space: nowrap;
        vertical-align: middle;
    }
    .ivu-checkbox-group-vertical .ivu-checkbox-wrapper{
        display: block!important;
    }
</style>

<style scoped lang="less">
    .multi-choice{
        position: relative;
        width: 100%;
        min-height: 80px;
        padding: 10px 46px;
        .t-header{
            font-size: 15px;
            color: #444444;
            font-weight: bold;
        }
        .t-desc{
            padding:3px 0px 0px 22px;
            color: #666666;
            line-height: 18px;
            font-size: 13px;
            clear: both;
            word-break: break-all;
        }
        .t-list{
            padding: 10px 0px 0px 19px;
            .i-remark{
                border: solid 1px transparent;
                border-bottom: solid 1px #cdcdcd;
                background-color: white;
                height: 18px;
            }
            .s-desc{
                color: #999999;
                font-size: 8px;
                margin: 2px 0px 0px 0px;
            }
        }
    }
</style>