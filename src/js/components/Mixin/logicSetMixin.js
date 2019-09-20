export default {
    data(){
        return{
            showLogicModal:false,
            xtList:[],
            tmTemp:{id:AppUtil.getUUID(),gltmKey:'',glxxIndex:[]}
        }
    },
    methods:{
        topicSet(){//设置题目管理
            if(this.items.length == 1 || this.data.opts.seq==1){
                this.$Message.warning({ content: '第一项不能设置关联', duration: 3 })
                return
            }
            this.xtList = _.filter(this.items,(it)=>{
                return (it.opts.seq < this.data.opts.seq) && (it.name==='SingleChoice' || it.name==='MultiChoice')
            })
            if(this.xtList.length == 0){
                this.$Message.warning({ content: '此题前面没有单选题跟多选题，无法设置关联逻辑', duration: 3 })
                return
            }
            //复制一份临时的用来编辑，点击确定后给回去，如果取消就不用任何操作
            if(this.data.opts.logic.tmgl.length>0){
                this.tmTemp= JSON.parse(JSON.stringify(this.data.opts.logic.tmgl[0]))
            }else{
                this.tmTemp= {id:AppUtil.getUUID(),gltmKey:'',glxxIndex:[]}
            }
            this.showLogicModal = true
        },
        topicSetOkHandle(){
            if(this.tmTemp.gltmKey){
                this.data.opts.logic.tmgl = []
                this.tmTemp.glxxIndex=[]
                this.xtList.forEach((it)=>{
                    if(it.key == this.tmTemp.gltmKey){
                        it.opts.list.forEach((xxItem)=>{
                            if(xxItem.isgl){
                                this.tmTemp.glxxIndex.push(xxItem.index)
                            }
                        })
                    }
                })
                if(this.tmTemp.glxxIndex.length>0){
                    this.data.opts.logic.tmgl.push(JSON.parse(JSON.stringify(this.tmTemp)) )
                }else{
                    this.data.opts.logic.tmgl=[]
                }
            }
            this.showLogicModal = false
        }
    }
}