<template>
    <div class="header">
        <div class="title">
            <i class="el-icon-s-operation">后台管理系统</i>
        </div>
        <div class="admin">
            <i class="el-icon-user-solid">欢迎登陆：admin</i>
            <i class="el-icon-right" @click="logout">退出</i>
        </div>
    </div>
</template>
<script>
import {logout} from '@/request/api'
export default {
    data(){
        return{

        }
    },
    created(){
    },
    methods:{
        logout(){
            this.$confirm('您确定退出登陆吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                logout().then(d=>{
                    if(d.resultCode = 200){
                        localStorage.removeItem('token')
                        this.$router.push('/')
                    }else{
                        that.$message({
                            type: 'error',
                            message: d.resultJson.resultMessage || '退出失败!'
                        });
                    }
                })
            }).catch(() => {

            });
        }
    }
}
</script>
<style scoped>
    .header{
        width: 100%;
        height: 100px;
        background:#51bba5;
        color:white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 25px;
    }
    .header .title{
        font-size: 24px;
    }
    .header .admin i{
        margin-left: 25px;
    }
    .header .el-icon-right{
        cursor: pointer;
    }
</style>