export default{
    //验证邮箱
    regEmail:function(str){
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!reg.test(str)) {
            return false;
        }
        return true
    },
    // 验证手机号
    regTel:function(str){
        var reg = /^1(3|4|5|6|7|8|9)\d{9}$/
        if (!reg.test(str)) {
            return false;
        }
        return true
    },
    // 验证固定电话
    regFixTel:function(str){
        var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
        if (!reg.test(str)) {
            return false;
        }
        return true
    }
}