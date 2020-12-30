<template>
    <div class="login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
            <div class="title">测试云APP后台管理系统</div>
            <el-form-item label="用户名" prop="userCode">
                <el-input v-model="loginForm.userCode"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="loginForm.pwd"></el-input>
            </el-form-item>
            <el-button type="primary" @click.enter="submitForm">登陆</el-button>
        </el-form>
    </div>
</template>
<script>
import {login} from '@/request/api'
export default {
    data(){
        return{
            loginForm:{
                userCode:'',
                pwd:''
            },
            rules: {
                userCode: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请填写密码', trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        var that = this;
        document.onkeydown = function(e){
            var key = window.event.keyCode;
            if(key == 13){
                that.submitForm()
            }
        }
    },
    methods:{
        submitForm(){
            var that = this
            const loading = this.$loading({
                lock: true,
                text: '正在登陆，请稍后……',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$refs.loginForm.validate(function(isTrue){
                if(isTrue){
                    login(that.loginForm).then(d=>{
                        loading.close()
                        if(d.resultCode == 200){
                            that.$message({
                                type: 'success',
                                message: '欢迎登陆!'
                            });
                            localStorage.setItem('backendToken',d.resultJson.token)
                            that.$router.push('/home')
                        }else{
                            that.$message({
                                type: 'error',
                                message: d.resultMessage || '登录失败!'
                            });
                        }
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
    .login{
        height: 100%;
        position: relative;
        background: whitesmoke;
        background-image: url('../../assets/login.jpg');
        background-size: 100vw 100vh;
    }
    .login .el-form{
        width: 500px;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 20px 50px;
        box-shadow: gray 0px 0px 10px;
        border-radius: 30px;
    }
    .login .title{
        color: #606266;
        font-size: 18px;
        padding-bottom: 20px;
        text-align: center;
    }
    .login button{
        margin: 0 auto;
        width: 50%;
        margin-left: calc((500px - 50%) / 2 - 50px);
    }
</style>