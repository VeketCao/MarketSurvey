<template>
    <div v-if="show">
        <Row type="flex" class="item-row">
            <Col span="6" style="margin: 8px 0px 0px 20px">问卷标题：</Col>
            <Col span="14"><Input v-model="data.title"></Input></Col>
        </Row>
        <Row type="flex" class="item-row">
            <Col span="6" style="margin: 8px 0px 0px 20px">问卷说明：</Col>
            <Col span="14">
                <Input v-model="data.desc" type="textarea" :autosize="{minRows: 5,maxRows: 10}"></Input>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "PageOpts",
        props:['show','data']
    }
</script>

<style lang="less" scoped>
    .item-row{
        margin: 25px 0px 0px 0px;
    }
</style>