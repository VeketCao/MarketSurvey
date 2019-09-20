<template>
    <div class="fill-blank-item-opt">
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
        </Row>
        <Row type="flex" class="item-row">
            <Col span="6" style="margin: 8px 0px 0px 20px">输入框类型：</Col>
            <Col span="14">
                <Select v-model="data.opts.type" @on-change="typeChange">
                    <Option value="text">文本</Option>
                    <Option value="textarea">文本域</Option>
                    <Option value="number">数字</Option>
                    <Option value="password">密码</Option>
                    <Option value="date">日期</Option>
                    <Option value="email">邮箱</Option>
                    <!--<Option value="url">URL</Option>-->
                    <Option value="tel">电话</Option>
                </Select>
            </Col>
        </Row>
        <Row type="flex" class="item-row" v-if="isTextArea">
            <Col span="6" style="margin: 8px 0px 0px 20px">文本域行数：</Col>
            <Col span="14"><input type="number" v-model="data.opts.rows" min="2" max="10" class="num-ipt"/></Col>
        </Row>
        <div class="logic-set">
            <Row type="flex" class="logic-row">
                <Col span="6">逻辑设置：</Col>
                <Col span="8" v-if="data.opts.logic.tmgl.length==0"><a @click="topicSet">题目关联</a></Col>
                <Col span="8" v-if="data.opts.logic.tmgl.length>0"><a @click="topicSet">编辑题目关联</a></Col>
            </Row>
        </div>
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
        name: 'FillBlankOpt',
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
              isTextArea:false
          }
        },
        methods:{
            typeChange(v){
                if(v==='textarea'){
                    this.isTextArea = true
                }else{
                    this.isTextArea = false
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .fill-blank-item-opt{
        width: 100%;
        height: 100%;
        .item-row{
            margin: 15px 0px 0px 0px;
            .num-ipt{
                margin-top: 5px;
                padding: 3px 0px 3px 10px;
                border: 1px solid #dcdee2;
                border-radius: 4px;
                width: 80px;
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