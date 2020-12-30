<template>
    <div class="navbar">
        <el-menu :default-active="$route.path" @select="handleselect" router>
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                <el-submenu :index="index+''" v-if="!item.leaf">
                    <template slot="title"><i :class="item.iconClass"></i>{{item.name}}</template>
                    <el-menu-item v-for="child in item.children" :index="child.path+''" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path+''"><i :class="item.iconClass"></i>{{item.children[0].name}}</el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){
    },
    methods:{
        handleselect(path){
            console.log(path)
        }
    }
}
</script>
<style scoped>
    .navbar{
        width: 300px;
        height: 100%;
    }
    .navbar ul{
        height: 100%;
    }
    .navbar i{
        position: relative;
        top: -2px;
    }
</style>