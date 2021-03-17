<template>
  <div>
    <h1>附件上传</h1>
    <el-form>
        <el-form-item>
            <el-col :span="8">
                <el-input
                placeholder="请输入文章名称"
                clearable
                v-model="model.article"
                ></el-input>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:3000/admin/api/upload/file"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-success="uploadSuccess"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">单次，只能上传一个文件</div>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-tooltip 
            content="请先将附件上传至服务器，在进行保存。"
            placement="right">
              <el-button type="primary" size="small" @click="save">保存</el-button>
            </el-tooltip>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        model: {},
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
        this.$message({
            type: 'error',
            message: '预览功能未开发完成，敬请期待~'
          })
      },
      uploadSuccess(response) {
        console.log(response)
        let { originalname,url } = response
        this.model.originalname = originalname
        this.model.url = url
        this.model.filetype = originalname.split('.').pop()
      },
      async save() {
        if (!this.model.originalname && !this.model.url) {
          this.$message({
            type: 'error',
            message: '请将附件上传至服务器，在进行保存~'
          })
          return ''
        }
        console.log(this.model)
        if (this.id) {
          await this.$http.put(`rest/attachment/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/attachment', this.model)
        } 
        this.$router.push('/attachment/list')
        this.$message({
          type: 'success',
          message: '保存成功'
      }) 
      }
    }

}
</script>

<style>
   .el-upload__tip {
     color: coral;
   }
</style>