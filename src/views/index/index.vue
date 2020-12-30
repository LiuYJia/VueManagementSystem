<template>
    <div class="index">
        <headers></headers>
        <div class="content">
            <navbar></navbar>
            <div class="content-main">
                <el-breadcrumb separator="/" class="breadcrumb-inner" v-if="$route.path != '/home'">
                    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import headers from '@/components/header'
import navbar from '@/components/navbar'
export default {
    data(){
        return{

        }
    },
    components:{navbar,headers},
    created(){
        console.log(this.$route)
    },
    methods:{

    }
}
</script>
<style>
    .index{
        height: 100%;
    }
    .content{
        height: calc(100% - 100px);
        display: flex;
    }
    .content-main{
        flex: 1;
        position: relative;
    }
    .index .el-breadcrumb{
        padding-left: 2.5%;
        height: 30px;
        line-height: 30px;
    }
    .index .mainBox{
        height: calc(100% - 30px);
        position: relative;
        padding: 0 2.5%;
    }
    .searchBox{
        background:rgb(247, 247, 247);
        border-radius: 10px;
        height: 100px;
    }
    .searchBox .el-form{
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 20px;
    }
    .searchBox .el-form-item{
        margin-bottom: 0;
    }
    .el-pagination{
        text-align: right;
        padding-top: 10px;
    }
    .el-button-group{
        height: 50px;
        display: flex;
        align-items: center;
    }
    .configDialog .el-dialog__body .el-transfer{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>