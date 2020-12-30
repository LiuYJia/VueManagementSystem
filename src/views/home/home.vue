<template>
    <div class="home mainBox">
        <div class="tips">
            <p>欢迎登陆后台管理系统！</p>
            <div class="people">
                <i class="el-icon-user-solid"></i>
                <div class="textbox">
                    <div class="username">admin</div>
                    <div class="date">{{time}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            time:null
        }
    },
    created(){
        this.getTime()
    },
    methods:{
        getTime(){
            var myDate = new Date();
            var year = myDate.getFullYear()
            var mon = myDate.getMonth() + 1;
            var day = myDate.getDate();  
            this.time = year + '-' + mon + '-' +day
        }
    }
}
</script>
<style scoped>
    .home{
    }
    .home .tips{
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .home .tips p{
        font-size: 30px;
        color: #51bba5;
        padding-bottom: 50px;
        font-weight: bolder;
    }
    .home .tips i{
        font-size: 60px;
        color: #51bba5;
    }
    .home .people{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .home .textbox{
        margin-left: 20px;
    }
    .home .username{
        font-size: 16px;
    }
    .home .date{
        margin-top: 10px;
        font-size: 12px;
        color: gray;
    }
</style>