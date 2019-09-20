<template>
    <div class="multi-choice-item-opt">
        <Row type="flex" class="item-row">
            <Col span="4" style="margin: 0px 0px 0px 20px">类型：</Col>
            <Col span="14"><span>{{data.desc}}</span></Col>
        </Row>
        <Row type="flex" class="item-row">
            <Col span="4" style="margin: 8px 0px 0px 20px">标题：</Col>
            <Col span="14"><Input v-model="data.opts.title"></Input></Col>
        </Row>
        <Row type="flex" class="item-row">
            <Col span="4" style="margin: 8px 0px 0px 20px">题说明：</Col>
            <Col span="14">
                <Input v-model="data.opts.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
        </Row>
        <Row type="flex" class="item-row">
            <Col span="8" style="margin-left: 21px;"><Checkbox v-model="data.opts.require">必答</Checkbox></Col>
            <Col span="10" ><Checkbox v-model="data.opts.vertical">选项垂直布局</Checkbox></Col>
        </Row>
        <div class="list-set">
            <Row type="flex" class="item-row list-set-header">
                <Col span="8" style="margin-left: 25px;">选项文字</Col>
                <Col span="3" style="margin-left: 0px">说明</Col>
                <Col span="5" style="margin-left: 0px">允许填空</Col>
                <Col span="4" style="margin-left: 0px">默认</Col>
            </Row>
            <Row type="flex" class="cell" v-for="(it,index) in data.opts.list" :key="index">
                <Col span="9" style="margin-left: 5px"><Input size="small" v-model="it.name"></Input></Col>
                <Col span="4" style="margin-left: 10px">
                    <Icon type="ios-list-box-outline" size="20" @click="descHandle(it.desc,index)" style="cursor: pointer"/>
                </Col>
                <Col span="4"><Checkbox v-model="it.isRemark"></Checkbox></Col>
                <Col span="2"><Checkbox v-model="it.isDefault" @on-change="defaultHandle(it.isDefault,it.index)"></Checkbox></Col>
                <Col span="1">
                    <Icon type="ios-arrow-round-down" size="18"  @click="moveHandle(index)" style="cursor: pointer"/>
                </Col>
                <Col span="1">
                    <Icon type="ios-remove-circle-outline" size="18"  @click="removeHandle(index)" style="cursor: pointer;margin-left: 12px"/>
                </Col>
            </Row>
            <Row type="flex" class="add">
                <Col span="6" style="margin: 5px 0px 5px 15px;"><a @click="addHandle"><Icon type="ios-add-circle-outline" size="18" />新增选项</a></Col>
            </Row>
        </div>
        <div class="logic-set">
            <Row type="flex" class="logic-row">
                <Col span="6">逻辑设置：</Col>
                <Col span="8" v-if="data.opts.logic.tmgl.length==0"><a @click="topicSet">题目关联</a></Col>
                <Col span="8" v-if="data.opts.logic.tmgl.length>0"><a @click="topicSet">编辑题目关联</a></Col>
            </Row>
        </div>
        <Modal v-model="showDescModal" class-name="vertical-center-modal" title="选项说明" @on-ok="descOkHandle">
            <template v-if="showDescModal">
                <Input v-model="descValue" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </template>
        </Modal>
        <Modal v-model="showLogicModal" class-name="vertical-center-modal" title="题目关联设置" @on-ok="topicSetOkHandle">
            <template v-if="showLogicModal">
                <div class="gl-set">
                    <Row type="flex" style="margin: 0px 0px 10px 10px">
                        <Col span="4" class="gl-title">当前题目：</Col>
                        <Col span="16" style="margin-top: 2px"><span>{{data.opts.seq +'.'+ data.opts.title}}</span></Col>
                    </Row>
                    <Row type="flex" style="margin: 0px 0px 10px 10px">
                        <Col span="4" class="gl-title">关联题目：</Col>
                        <Col span="18">
                            <Select placeholder="请选择关联的题目"  not-found-text="无数据" size="small" v-model="tmTemp.gltmKey">
                                <Option v-for="item in xtList" :value="item.key">{{item.opts.seq}}.{{item.opts.title}}</Option>
                            </Select>
                        </Col>
                        <Row v-if="tmTemp.gltmKey" class="tmts">
                            <Col class="tm-title">选择下面的选项中的任意一个时，“当前题目”才出现</Col>
                            <template v-for="(xtItem,j) in xtList">
                                <Row v-if="xtItem.key==tmTemp.gltmKey" v-for="it in xtItem.opts.list" style="margin: 10px 0px">
                                    <Checkbox v-model="it.isgl">{{it.name}}</Checkbox>
                                </Row>
                            </template>

                        </Row>
                    </Row>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
    import logicSetMixin from '../Mixin/logicSetMixin'
    export default {
        name: 'MultiChoiceOpt',
        mixins:[
            logicSetMixin
        ],
        props:{
            data:{
                type: Object,
                default:null
            },
            items:{
                type: Array,
                default: []
            }
        },
        data(){
            return{
                showDescModal:false,
                descValue:'',
                descIndex:-1
            }
        },
        mounted() {
        },
        methods:{
            descHandle(desc,index){//弹出窗填写说明
                this.showDescModal = true
                this.descValue = desc
                this.descIndex = index
            },
            descOkHandle(){
                this.showDescModal = false
                this.data.opts.list[this.descIndex].desc = this.descValue
            },
            defaultHandle(isDefault,index){//勾选默认值操作
                if(isDefault){
                    this.data.opts.answer.push(index)
                }else{
                    this.data.opts.answer = _.without(this.data.opts.answer,index)
                }
            },
            moveHandle(index){
                if(this.data.opts.list.length==1) return;
                let temp = JSON.parse(JSON.stringify(this.data.opts.list[index]))
                if(this.data.opts.list.length-1==index){//最后一项跟第一项交换
                    this.$set(this.data.opts.list,index,{
                        ...JSON.parse(JSON.stringify(this.data.opts.list[0]))
                    })
                    this.$set(this.data.opts.list,0,{
                        ...temp
                    })
                }else{
                    this.$set(this.data.opts.list,index,{
                        ...JSON.parse(JSON.stringify(this.data.opts.list[index+1]))
                    })
                    this.$set(this.data.opts.list,index+1,{
                        ...temp
                    })
                }
            },
            removeHandle(index){//删除选项
                if(this.data.opts.list.length==1){
                    this.$Message.warning({ content: '选项至少要保留一项', duration: 3 })
                    return
                }
                this.$nextTick(() => {
                    this.data.opts.list.splice(index, 1)
                })
            },
            addHandle(){//新增选项
                let tp = {index:AppUtil.getUUID(),name:`选项${this.data.opts.list.length+1}`,desc:'',isRemark:false,remark:'',isDefault:false,isgl:false}
                this.data.opts.list.push(tp)
            }
        }
    }
</script>

<style lang="less" scoped>
    .multi-choice-item-opt{
        width: 100%;
        height: 100%;
        .item-row{
            margin: 15px 0px 0px 0px;
        }
        .list-set{
            width: 100%;
            margin-top: 30px;
            .list-set-header{
                background: #FAFAFA;
                padding: 5px 0px;
            }
            .cell{
                margin-top: 5px;
            }
            .add{
            }
        }
        .logic-set{
            width: 100%;
            margin-top: 30px;
            .logic-row{
                background-color: #F4F4F4;
                border: 1px dashed #DBDBDB;
                margin: 5px 5px;
                padding: 5px 5px;
            }
        }
    }
    .gl-set{
        min-height: 250px;
        .gl-title{
            font-weight: bold;
            color: #333;
            font-size: 14px;
        }
        .tmts{
            margin:10px 0px 10px 80px;
            .tm-title{
                color: #333;
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
</style>