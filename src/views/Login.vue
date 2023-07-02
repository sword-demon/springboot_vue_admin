<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符之间', trigger: 'blur'},
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (!valid) {
          this.$message.error('请求校验不通过');
        } else {
          this.$http.post('/user/login', this.user).then(res => {
            console.log(res);
            if (!res) {
              this.$message.error('用户或密码错误');
              this.user = {};
            } else {
              this.$router.push('/');
            }
          });
        }
      });
    },
  },
};
</script>

<template>
    <div class="wrapper">
        <div style="margin: 200px auto;background-color: #fff; width: 350px; height: 300px;padding: 20px;border-radius: 10px;">
            <div style="margin: 20px 0;text-align: center;font-size: 24px">
                <b>登 录</b>
                <el-form ref="userForm" :model="user" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon="el-icon-user"
                                  style="margin: 10px 0"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="user.password" placeholder="请输入密码" prefix-icon="el-icon-lock"
                                  show-password
                                  style="margin: 10px 0"></el-input>
                    </el-form-item>
                </el-form>
                <div style="margin: 10px 0;text-align: right">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="warning">注册</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    height: 100vh;
    background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
    overflow: hidden;
}
</style>
