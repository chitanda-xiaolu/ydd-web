<template>
  <div class="login-container">
      <el-card header="YDD Login" class="login-card">
          <el-form  @submit.native.prevent="login">
              <el-form-item label="用户名:">
                  <el-input v-model="model.username" placeholder="请输入用户名" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                  <el-input type="password" v-model="model.password" placeholder="请输入密码" clearable></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="info"  native-type="submit" style="width: 360px">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            model: {}
        }
    },

    methods: {
        async login() {
            const res = await this.$http.post('login', this.model)
            localStorage.token = res.data.token
            console.log(res.data)
            this.$router.push('/')
            this.$message({
                type: 'success',
                message: '登陆成功'
            })
        }
    }
}
</script>

<style>
    .login-card {
        width: 25rem;
        margin: 10rem auto;
        text-align: center;
        color: black;
    }
</style>