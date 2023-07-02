<script>
export default {
  name: 'Aside',
  props: {
    isCollapse: Boolean,
  },
};
</script>

<template>
    <el-menu
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-openeds="['1', '3']"
            active-text-color="#ffd04b"
            background-color="rgb(48,65,86)"
            router
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
        <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="/sys/user">
                <i class="el-icon-s-custom"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<style scoped></style>
