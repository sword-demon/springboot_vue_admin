<script>
export default {
  name: 'Person',
  data() {
    return {
      form: {},
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    };
  },
  created() {
    this.$http.get('/user/' + this.user.id).then(res => {
      if (res.code === '200') {
        this.form = res.data;
      } else {
        this.$message.error(res.msg);
      }
    });
  },
  methods: {
    submit() {
      this.$http.post('/user', this.form).then(resp => {
        if (this.form.id) {
          this.$message.success('修改成功');
        } else {
          this.$message.success('添加成功');
        }
      });
    },
  },
};
</script>

<template>
    <div>
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
            <el-form-item label-width="120px">
                <el-button type="primary" @click="submit">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped></style>
