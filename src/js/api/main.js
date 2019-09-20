
/**定义接口**/
export default {
    /**
     * 获取左侧栏基础组件配置
     * mode:设计designer，默认人normal
     */
    getBasicComponents(){

        return [
            {
                name:'SingleChoice',
                desc:'单选题',
                opts:{
                    seq:0,
                    title:'题标题',
                    desc:'',
                    require:false,
                    list:[
                        {index:AppUtil.getUUID(),name:'选项1',desc:'',isRemark:false,remark:'',isDefault:false,isgl:false},
                        {index:AppUtil.getUUID(),name:'选项2',desc:'',isRemark:false,remark:'',isDefault:false,isgl:false}
                    ],
                    vertical:false,
                    answer:'',
                    logic:{
                        tmgl:[]
                    }
                }
            },
            {
                name:'MultiChoice',
                desc:'多选题',
                opts:{
                    seq:0,
                    title:'题标题',
                    desc:'',
                    require:false,
                    list:[
                        {index:AppUtil.getUUID(),name:'选项1',desc:'',isRemark:false,remark:'',isDefault:false,isgl:false},
                        {index:AppUtil.getUUID(),name:'选项2',desc:'',isRemark:false,remark:'',isDefault:false,isgl:false}
                    ],
                    vertical:false,
                    answer:[],
                    logic:{
                        tmgl:[]
                    }
                }
            },
            {
                name:'FillBlank',
                desc:'单项填空题',
                opts:{
                    seq:0,
                    title:'题标题',
                    desc:'',
                    type:'text',
                    require:false,
                    answer:'',
                    rows:'5',
                    logic:{
                        tmgl:[]
                    }
                }
            }
        ]
    }

}