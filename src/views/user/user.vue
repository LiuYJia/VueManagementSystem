<template>
    <div class="user mainBox">
        <div class="searchBox">
            <el-form :inline="true" :model="userForm" :rules="rules" ref="userForm">
				<el-form-item prop="userName">
					<el-input v-model="userForm.userName" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchClick">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="resetClick">重置</el-button>
				</el-form-item>
			</el-form>
        </div>

        <el-button-group>
            <el-button type="primary" size="small" @click="viewClick(1)">查看</el-button>
            <el-button type="primary" size="small" @click="viewClick(2)">修改</el-button>
            <el-button type="primary" size="small" @click="deleteClick()">删除</el-button>
            <el-button type="primary" size="small" @click="configClick()">配置角色</el-button>
            <el-button type="primary" size="small" @click="resetpassClick()">重置密码</el-button>
        </el-button-group>

        <el-table
            ref="table"
            v-loading="loading"
            :data="tableData"
            @selection-change="handleSelectionChange"
            stripe
            height="calc(100% - 210px)">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                type="index"
                label="#">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="用户名">
            </el-table-column>
            <el-table-column
                prop="roleList"
                label="已选角色">
                <template slot-scope="scope">
                    <span>{{scope.row.roleList[0]?handelRolelist(scope.row.roleList):'——'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="iscSpecialorgName"
                label="所属组织">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
        </el-table>

        <el-pagination
            background
            :current-page='userForm.pageNum'
            @current-change='currentChange'
            :page-size="20"
            layout="prev, pager, next"
            :page-count="totalCount">
        </el-pagination>

        <el-dialog
            :title="dialogTitle"
            :visible.sync="viewVisible"
            width="30%">
            <el-form :model="viewForm" :rules="viewFromrules" ref="viewForm" label-width="100px">
				<el-form-item prop="userName" label="用户名">
					<el-input v-model="viewForm.userName" placeholder="用户名" disabled></el-input>
				</el-form-item>
                <el-form-item prop="iscSpecialorgName" label="所属组织">
					<el-input v-model="viewForm.iscSpecialorgName" placeholder="所属组织" disabled></el-input>
				</el-form-item>
				<el-form-item prop="mobile" label="手机号">
					<el-input v-model="viewForm.mobile" placeholder="手机号"></el-input>
				</el-form-item>
                <el-form-item prop="email" label="邮箱">
					<el-input v-model="viewForm.email" placeholder="邮箱"></el-input>
				</el-form-item>
			</el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="viewVisible = false">取 消</el-button>
                <el-button type="primary" @click="viewDialogConfirm" :disabled="dialogTitle!='修改'">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            class="configDialog"
            title="配置角色"
            :visible.sync="configVisible"
            width="50%">
            <el-transfer 
                v-model="configRightData" 
                :titles="['未选角色', '已选角色']"
                :data="configLeftData"></el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="configVisible = false">取 消</el-button>
                <el-button type="primary" @click="configDialogConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="重置密码"
            :visible.sync="resetVisible"
            width="30%">
            <el-form :model="resetForm" :rules="resetFromrules" ref="resetForm" label-width="100px">
				<el-form-item prop="oldPass" label="旧密码">
					<el-input v-model="resetForm.oldPass" placeholder="旧密码"></el-input>
				</el-form-item>
                <el-form-item prop="newPass" label="新密码">
					<el-input v-model="resetForm.newPass" placeholder="新密码"></el-input>
				</el-form-item>
				<el-form-item prop="newPassConfirm" label="确认新密码">
					<el-input v-model="resetForm.newPassConfirm" placeholder="确认新密码"></el-input>
				</el-form-item>
			</el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetDialogConfirm">确 定</el-button>
                <el-button type="primary" @click="resetDialogDefault">重置为默认密码</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// import { xxx } from '@/request/api';
export default {
    data(){
        var regTel = (rule, value, callback) => {
            if(!value || this.$common.regTel(value)){
                callback();
            }else{
                callback(new Error('手机号格式不正确'));
            }
        };
        var regEmail = (rule, value, callback) => {
            if(!value || this.$common.regEmail(value)){
                callback();
            }else{
                callback(new Error('邮箱格式不正确'));
            }
        };
        var newPassConfirm = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.resetForm.newPassConfirm) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return{
            loading:false,
            userForm:{
                userName:'',
                pageNum:1,
                pageSize:20
            },
            rules: {},
            viewForm:{
                userName:'',
                iscSpecialorgName:'',
                mobile:'',
                email:''
            },
            viewFromrules:{
                mobile:[{validator:regTel, trigger:'blur'}],
                email:[{validator:regEmail, trigger:'blur'}]
            },
            resetForm:{
                oldPass:'',
                newPass:'',
                newPassConfirm:''
            },
            resetFromrules:{
                oldPass:[{required: true, message: '请填写旧密码', trigger:'blur'}],
                newPass:[{required: true, message: '请填写新密码', trigger:'blur'}],
                newPassConfirm:[{required: true,validator:newPassConfirm, trigger:'blur'}] 
            },
            totalCount:0,
            tableData: [],
            selectedItems:[],
            viewVisible:false,
            dialogTitle:'',
            configVisible:false,
            configLeftData:[],
            configRightData:[],
            resetVisible:false
        }
    },
    created(){
        // this.getTableData()
    },
    methods:{
        //查询
        searchClick(){
            var that = this
            this.$refs.userForm.validate(function(d){
                that.userForm.pageNum = 1
                that.getTableData()
            })
        },
        resetClick(){
            for(var i in this.userForm){
                if(i != 'pageNum' && i != 'pageSize'){
                    this.userForm[i] = ''
                }
            }
        },
        getTableData(pageNum){
            if(pageNum){
                this.userForm.pageNum = pageNum
            }
            this.loading = true
            getUserList(this.userForm).then(d => {
                if(d.resultCode == 200){
                    this.tableData = d.resultJson.list.map(ele=>{
                        ele.isBindIsc = ele.iscSpecialorgId ? true : false
                        return ele
                    })
                    console.log(this.tableData)
                    this.totalCount = d.resultJson.pages
                }else{
                    this.$message({
                        showClose: true,
                        message: '暂无数据',
                        type: 'error'
                    });
                }
                this.loading = false
            })  
        },
        handelRolelist:function(list){
            var newArr = []
            list.forEach(ele=>{
                newArr.push(ele.roleName)
            })
            return newArr.join('、')
        },
        // 查看、修改
        viewClick(type){
            if(type == 1){
                this.dialogTitle = '查看'
            }else if(type == 2){
                this.dialogTitle = '修改'
            }
            if(this.selectedItems.length == 0){
                this.$message({
                    showClose: true,
                    message: '请选择一条记录',
                    type: 'error'
                });
                return
            }else if(this.selectedItems.length > 1){
                this.$message({
                    showClose: true,
                    message: '只能选择一条记录',
                    type: 'error'
                });
                return
            }
            this.viewVisible = true
            this.viewForm.userName = this.selectedItems[0].userName
            this.viewForm.iscSpecialorgName = this.selectedItems[0].iscSpecialorgName
            this.viewForm.mobile = this.selectedItems[0].mobile
            this.viewForm.email = this.selectedItems[0].email
        },
        viewDialogConfirm(){
            var params = {
                userId:this.selectedItems[0].userId,
                mobile:this.viewForm.mobile,
                email:this.viewForm.email
            }
            var that = this
            this.$refs.viewForm.validate(function(istrue){
                if(istrue){
                    editUser(params).then(d => {
                        if(d.resultCode == 200){
                            that.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });
                            that.getTableData()
                            that.viewVisible = false
                        }else{
                            that.$message({
                                showClose: true,
                                message: '修改失败',
                                type: 'error'
                            });
                        }
                    }) 
                }   
            })
        },
        //删除
        deleteClick(){
            if(this.selectedItems.length == 0){
                this.$message({
                    showClose: true,
                    message: '请选择一条记录',
                    type: 'error'
                });
                return
            }
            this.$confirm('确认删除此用户吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var arr = []
                this.selectedItems.forEach(function(ele){
                    arr.push(ele.userId)
                })
                deleteUser(arr.join(',')).then(d => {
                    if(d.resultCode == 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getTableData()
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                })
                
            }).catch(() => {
            });
        },
        // 配置角色
        configClick(){
            if(this.selectedItems.length == 0){
                this.$message({
                    showClose: true,
                    message: '请选择一条记录',
                    type: 'error'
                });
                return
            }else if(this.selectedItems.length > 1){
                this.$message({
                    showClose: true,
                    message: '只能选择一条记录',
                    type: 'error'
                });
                return
            }
            this.configVisible = true
            var that = this
            that.configLeftData = []
            that.configRightData = []
            SelectedUser(this.selectedItems[0].userId).then(function(d){
                if(d.resultCode == 200){
                    d.resultJson.list.forEach(ele=>{
                        if(ele.isBelong == 1){
                            that.configRightData.push(ele.roleId)
                        }
                        var obj = {
                            key:ele.roleId,
                            label:ele.roleName
                        }
                        that.configLeftData.push(obj)
                    })
                }else{
                    this.$message({
                        showClose: true,
                        message: '获取未选角色错误',
                        type: 'error'
                    });
                }
            })
        },
        configDialogConfirm(){
            if(this.configRightData.length==0){
                this.$message({
                    showClose: true,
                    message: '请选择角色',
                    type: 'error'
                });
                return
            }
            var param = {
                userId:this.selectedItems[0].userId,
                roleIds:this.configRightData.join(',')
            }
            var that = this
            configUser(param).then(d=>{
                if(d.resultCode == 200){
                    that.$message({
                        showClose: true,
                        message: '配置成功',
                        type: 'success'
                    });
                    that.getTableData()
                }else{
                    that.$message({
                        showClose: true,
                        message: '配置失败',
                        type: 'error'
                    });
                }
                that.configVisible = false
            })
        },
        //重置密码
        resetpassClick(){
            this.resetVisible = true
        },
        resetDialogConfirm(){
            var that = this
            this.$refs.resetForm.validate(function(istrue){
                if(istrue){
                    var param = {
                        userId:that.selectedItems[0].userId,
                        obj:{
                            oldPwd:that.resetForm.oldPass,
                            newPwd:that.resetForm.newPass
                        }
                    }
                    that.resetFunction(param)
                }
            })
        },
        resetDialogDefault(){
            var that = this
            this.$confirm('确认重置为默认密码吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var param = {
                    userId:that.selectedItems[0].userId,
                    obj:{
                        oldPwd:'',
                        newPwd:''
                    }
                }
                this.resetFunction(param)
            }).catch(() => {
            });
        },  
        resetFunction(param){
            var that = this
            console.log(param)
            resetPass(param).then(function(d){
                if(d.resultCode == 200){
                    that.$message({
                        showClose: true,
                        message: '重置成功',
                        type: 'success'
                    });
                    that.getTableData()
                }else{
                    that.$message({
                        showClose: true,
                        message: d.resultMessage||'重置失败',
                        type: 'error'
                    });
                }
                for(var i in that.resetForm){
                    that.resetForm[i] = ''
                }
                that.resetVisible = false
            })
        },
        // 其它
        currentChange(d){
            this.getTableData(d)
        },
        handleSelectionChange(val){
            this.selectedItems = val
        },
        switchChange(item){
            if(item.isBindIsc){
                bindIscUser(item.userId).then(d=>{
                    if(d.resultCode != 200){
                        this.getTableData()
                        this.$message({
                            showClose: true,
                            message: d.resultMessage||'设置失败',
                            type: 'error'
                        });
                    }
                })
            }else{
                unBindIscUser(item.userId).then(d=>{
                    if(d.resultCode != 200){
                        this.getTableData()
                        this.$message({
                            showClose: true,
                            message: d.resultMessage||'设置失败',
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
</style>