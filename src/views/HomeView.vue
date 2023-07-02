<template>
    <div>
        <el-container style="height: 100vh">
            <!-- 左侧菜单 -->
            <el-aside :width="'sideWidth'+'px'"
                      style="background-color: rgb(238, 241, 246);box-shadow: 2px 0 6px rgb(0 21 41 / 35%)">
                <el-menu
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :default-openeds="['1', '3']"
                        active-text-color="#ffd04b"
                        background-color="rgb(48,65,86)"
                        style="height: 100vh;overflow-x: hidden"
                        text-color="#fff"
                >
                    <h3 style="text-align: center;color: white;height: 60px;line-height: 60px;">
                        <img v-show="!isCollapse" alt="" src="@/assets/logo.png"
                             style="width: 20px;position: relative;top: 3px;margin-right: 5px;"
                        />
                        <span v-if="!isCollapse">后台管理系统</span>
                        <span v-else>无解</span>
                    </h3>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item index="1-3">选项3</el-menu-item>
                        <el-menu-item index="1-4">选项4</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航三</span>
                        </template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <!-- 头部 header 导航栏 -->
                <el-header style="border-bottom: 1px solid #ccc;line-height: 60px;display: flex">
                    <div style="flex: 1;font-size: 18px">
                        <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
                    </div>
                    <div style="text-align: right;font-size: 12px; width: 200px;cursor: pointer">
                        <el-dropdown>
                            <span>无解</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>个人信息</el-dropdown-item>
                                <el-dropdown-item>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>

                <!-- 页面主体内容 -->
                <el-main>
                    <div style="margin-bottom: 30px;">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div style="margin: 10px 0">
                        <el-form :inline="true">
                            <el-form-item>
                                <el-input v-model="username" clearable placeholder="请输入名称"
                                          prefix-icon="el-icon-search"/>
                            </el-form-item>
                            <el-form-item>
                                <el-input clearable placeholder="请输入邮箱" prefix-icon="el-icon-search"/>
                            </el-form-item>
                            <el-form-item>
                                <el-input clearable placeholder="请输入地址" prefix-icon="el-icon-search"/>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
                                <el-button class="ml-5" @click="reset">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div style="margin: 10px 0">
                        <el-button type="primary" @click="addUser">新增</el-button>
                        <el-popconfirm
                                cancel-button-text='取消'
                                class="ml-5"
                                confirm-button-text='确认'
                                icon="el-icon-info"
                                icon-color="red"
                                title="确定批量删除这些数据吗？"
                                @confirm="handleDeleteBatch"
                        >
                            <el-button slot="reference" :disabled="!disabledDelete" type="danger">批量删除
                            </el-button>
                        </el-popconfirm>
                        <el-button class="ml-5" type="success">导入</el-button>
                        <el-button type="warning">导出</el-button>
                    </div>
                    <el-table :data="tableData" border stripe @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column label="ID" prop="id" width="80"></el-table-column>
                        <el-table-column label="账号" prop="username" width="140"></el-table-column>
                        <el-table-column label="昵称" prop="nickname" width="120">
                        </el-table-column>
                        <el-table-column label="地址" prop="address"></el-table-column>
                        <el-table-column label="手机号码" prop="phone"></el-table-column>
                        <el-table-column label="邮箱" prop="email"></el-table-column>
                        <el-table-column label="操作">
                            <template v-slot="scope">
                                <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-popconfirm
                                        cancel-button-text='取消'
                                        class="ml-5"
                                        confirm-button-text='确认'
                                        icon="el-icon-info"
                                        icon-color="red"
                                        title="确定删除吗？"
                                        @confirm="handleDelete(scope.row.id)"
                                >
                                    <el-button slot="reference" type="danger">
                                        删除
                                    </el-button>
                                </el-popconfirm>
                                <!--                                <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="padding: 10px 0">
                        <el-pagination
                                :current-page="currentPage"
                                :page-size="pageSize"
                                :page-sizes="[5, 10, 15, 20]"
                                :total="total"
                                layout="total, sizes, prev, pager, next, jumper"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog :visible.sync="dialogFormVisible" title="添加用户信息">
            <el-form :model="form">
                <el-form-item label="账号" label-width="120px">
                    <el-input v-model="form.username" autocomplete="off" clearable placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item label="昵称" label-width="120px">
                    <el-input v-model="form.nickname" clearable placeholder="昵称"/>
                </el-form-item>
                <el-form-item label="手机" label-width="120px">
                    <el-input v-model="form.phone" clearable placeholder="手机"/>
                </el-form-item>
                <el-form-item label="邮箱" label-width="120px">
                    <el-input v-model="form.email" clearable placeholder="邮箱"/>
                </el-form-item>
                <el-form-item label="地址" label-width="120px">
                    <el-input v-model="form.address" clearable placeholder="地址"/>
                </el-form-item>
                <el-form-item label="头像" label-width="120px">
                    <el-input v-model="form.avatar" clearable placeholder="头像"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      tableData: [],
      // 收缩按钮的图标
      collapseBtnClass: 'el-icon-s-fold',
      // 是否收缩
      isCollapse: false,
      // 侧边栏宽度
      sideWidth: 200,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      username: '',
      dialogFormVisible: false,
      form: {
        id: 0,
        username: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
      },
      // 多选框
      multipleSelection: [],
      disabledDelete: false,
    };
  },
  created() {
    // 请求分页查询数据
    this.getPageData(this.username);
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.sideWidth === 200) {
        this.sideWidth = 64;
      } else {
        this.sideWidth = 200;
      }
      this.collapseBtnClass = this.collapseBtnClass === 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getPageData(this.username);
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      this.getPageData(this.username);
    },
    getPageData(username) {
      let pageParam = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        username: this.username,
      };
      this.$http.get('/user/page', {params: pageParam}).
          then(resp => {
            this.total = resp.total;
            this.tableData = resp.records;
          });
    },
    search() {
      this.getPageData(this.username);
    },
    reset() {
      this.username = '';
      this.getPageData();
    },
    addUser() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    submit() {
      this.$http.post('/user', this.form).then(resp => {
        console.log(resp);
        if (this.form.id) {
          this.$message.success('修改成功');
        } else {
          this.$message.success('添加成功');
        }
        this.dialogFormVisible = false;
        this.getPageData();
      });

    },
    handleEdit(row) {
      this.form = {...row};
      this.dialogFormVisible = true;
    },
    handleDelete(id) {
      this.$http.delete('/user/' + id).then(resp => {
        console.log(resp);
        this.$message.success('删除成功');
        this.getPageData();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length) {
        this.disabledDelete = true;
      } else {
        this.disabledDelete = false;
      }
    },
    handleDeleteBatch() {
      if (this.multipleSelection.length) {
        let ids = this.multipleSelection.map(v => v.id);
        console.log(ids);
        this.$http.post('user/delete/batch', ids).then(resp => {
          console.log(resp);
          this.$message.success('批量删除成功');
          this.getPageData();
        }).catch(err => {
          this.$message.error(err || '系统异常');
        });
      } else {
        this.$message.error('请选择需要删除的数据');
      }
    },
  },
};
</script>

<style scoped>
</style>
