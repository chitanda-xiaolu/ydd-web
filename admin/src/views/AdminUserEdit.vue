<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}管理员</h1>
    <el-form  @submit.native.prevent="save" label-position="right">
      <el-form-item label="用户名:">
        <el-col :span="10">
          <el-input 
          label-width="140px"
          v-model="model.username"
          placeholder="请输入用户名"
          clearable
          >
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码:">
        <el-col :span="10">
          <el-input 
          v-model="model.password"
          placeholder="请输入密码"
          clearable
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    }
  },
  methods: {
      async save() {
        if (this.id) {
          await this.$http.put(`rest/admin_users/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/admin_users', this.model)
        } 
        this.$router.push('/admin_users/list')
        this.$message({
          type: 'success',
          message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.id && this.fetch()
  }
}
</script>

<style>

</style>