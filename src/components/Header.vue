<script>
export default {
  name: 'Header',
  props: {
    collapseBtnClass: String,
    collapse: Function,
  },
  data() {
    return {};
  },
  methods: {
    isCurrentRoute(path) {
      // 检查当前路由是否与指定路径一致
      return this.$route.path === path;
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
                <span>无解</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<style scoped></style>
