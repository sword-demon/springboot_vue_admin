<template>
    <div>
        <el-container style="height: 100vh">
            <!-- 左侧菜单 -->
            <el-aside :width="'sideWidth'+'px'"
                      style="background-color: rgb(238, 241, 246);box-shadow: 2px 0 6px rgb(0 21 41 / 35%)">
                <Aside :isCollapse="isCollapse"/>
            </el-aside>

            <el-container>
                <!-- 头部 header 导航栏 -->
                <el-header style="border-bottom: 1px solid #ccc;">
                    <Header :collapse="collapse" :collapse-btn-class="collapseBtnClass"/>
                </el-header>

                <!-- 页面主体内容 -->
                <el-main>
                    <!-- 表示当前页面的子路由会在 router-view 里面展示 -->
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from '@/components/Aside.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'HomeView',
  components: {
    Aside,
    Header,
  },
  data() {
    return {
      tableData: [],
      // 收缩按钮的图标
      collapseBtnClass: 'el-icon-s-fold',
      // 是否收缩
      isCollapse: false,
      // 侧边栏宽度
      sideWidth: 200,
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
  },
};
</script>

<style scoped>
</style>
