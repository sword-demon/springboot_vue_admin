<script>
export default {
  name: 'Header',
  props: {
    collapseBtnClass: String,
    collapse: Function,
  },
  data() {
    return {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    };
  },
  methods: {
    isCurrentRoute(path) {
      // 检查当前路由是否与指定路径一致
      return this.$route.path === path;
    },
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
      this.$message.success('退出成功');
    },
  },
  computed: {
    getBreadCrumbs() {
      const matched = this.$route.matched;
      console.log(matched);
      const breadCrumbs = [];
      matched.forEach((record) => {
        if (record.meta && record.meta.title) {
          breadCrumbs.push({
            to: record.path,
            label: record.meta.title,
          });
        }
      });
      return breadCrumbs;
    },
  },
};
</script>

<template>
    <div style="line-height: 60px;display: flex">
        <div style="flex: 1;">
            <span :class="collapseBtnClass" style="cursor: pointer;font-size: 18px" @click="collapse"></span>

            <el-breadcrumb separator="/" style="display: inline-block;margin-left: 10px">
                <el-breadcrumb-item v-for="item in getBreadCrumbs" :key="item.to">
                    <span v-if="isCurrentRoute(item.to)">{{ item.label }}</span>
                    <router-link v-else :to="item.to">{{ item.label }}</router-link>
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div style="text-align: right;font-size: 12px; width: 200px;cursor: pointer">
            <el-dropdown>
                <!-- 还可以再放个头像-->
                <span>{{ user.username }}</span>
                <el-dropdown-menu slot="dropdown" style="width: 100px;text-align: center">
                    <el-dropdown-item style="font-size: 14px;padding: 5px 0">
                        <router-link style="text-decoration: none;" to="/person">个人信息</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item style="font-size: 14px;padding: 5px 0">
                        <span style="text-decoration: none;" @click="logout">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<style scoped></style>
