<template>
    <div v-if="show && data">
        <template v-if="data.name === 'SingleChoice'">
            <SingleChoiceOpt :data="data" :items="items"></SingleChoiceOpt>
        </template>
        <template v-if="data.name === 'MultiChoice'">
            <MultiChoiceOpt :data="data" :items="items"></MultiChoiceOpt>
        </template>
        <template v-if="data.name === 'FillBlank'">
            <FillBlankOpt :data="data" :items="items"></FillBlankOpt>
        </template>
    </div>
</template>

<script>
    import SingleChoiceOpt from '../../../components/SingleChoice/SingleChoiceOpt'
    import MultiChoiceOpt from '../../../components/MultiChoice/MultiChoiceOpt'
    import FillBlankOpt from '../../../components/FillBlank/FillBlankOpt'

    export default {
        name: 'ItemOpts',
        props:{
            show:{
                type: Boolean,
                default: true
            },
            data:{
                type: Object,
                default: null
            },
            items:{
                type: Array,
                default: []
            }
        },
        data(){
            return{

            }
        },
        components:{
            SingleChoiceOpt,
            MultiChoiceOpt,
            FillBlankOpt
        }
    }
</script>

<style lang="less" scoped>

</style>