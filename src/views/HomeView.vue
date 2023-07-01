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
                                <el-input clearable placeholder="请输入名称" prefix-icon="el-icon-search"/>
                            </el-form-item>
                            <el-form-item>
                                <el-input clearable placeholder="请输入邮箱" prefix-icon="el-icon-search"/>
                            </el-form-item>
                            <el-form-item>
                                <el-input clearable placeholder="请输入地址" prefix-icon="el-icon-search"/>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="ml-5" type="primary">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div style="margin: 10px 0">
                        <el-button type="primary">新增</el-button>
                        <el-button type="danger">批量删除</el-button>
                        <el-button type="success">导入</el-button>
                        <el-button type="warning">导出</el-button>
                    </div>
                    <el-table :data="tableData" :header-cell-style="{color: '#fff', backgroundColor: '#3E8EF7'}"
                              border stripe>
                        <el-table-column label="日期" prop="date" width="140">
                        </el-table-column>
                        <el-table-column label="姓名" prop="name" width="120">
                        </el-table-column>
                        <el-table-column label="地址" prop="address"></el-table-column>
                        <el-table-column label="操作">
                            <template v-slot="scope">
                                <el-button type="primary">编辑</el-button>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="padding: 10px 0">
                        <el-pagination
                                :current-page="currentPage"
                                :page-size="10"
                                :page-sizes="[5, 10, 15, 20]"
                                :total="400"
                                layout="total, sizes, prev, pager, next, jumper"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    return {
      tableData: Array(20).fill(item),
      // 收缩按钮的图标
      collapseBtnClass: 'el-icon-s-fold',
      // 是否收缩
      isCollapse: false,
      // 侧边栏宽度
      sideWidth: 200,
      currentPage: 1,
    };
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
    handleSizeChange() {
    },
    handleCurrentChange() {
    },
  },
};
</script>

<style scoped>
</style>
