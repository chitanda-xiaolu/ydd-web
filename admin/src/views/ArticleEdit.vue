<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文章标签:">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题:">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容:">
        <vue-editor v-model="model.body" 
        useCustomImageHandler
        @image-added="handleImageAdded"
        >
        </vue-editor>
      </el-form-item>
      <el-form-item>
        <!-- <el-upload
          id="file_list" 
          class="upload-demo"
          action="http://localhost:3000/admin/api/upload/file"
          :on-change="handleChange"
          :file-list="fileList">
          <el-button size="small" type="primary" style="margin-left: 10px">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" style="margin-left: 10px">附件上传</div>
        </el-upload> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: [],
      fileList: []
    }
  },
  components: {VueEditor},
  methods: {
      upload() {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      this.$http.post('http://localhost:3000/admin/api/upload/file', formData, headerConfig).then(res => {
        console.log(res)
      })
    },
      handleChange(file, fileList) {
        console.log('文件已经上传')
        this.fileList = fileList.slice(-3);
        console.log(this.fileList)
      },
      async save() {
        if (this.id) {
          await this.$http.put(`rest/articles/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/articles', this.model)
        } 
        this.$router.push('/articles/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/articles/${this.id}`)
        this.model = res.data
      },
      async fetchCategories() {
        const res = await this.$http.get('rest/categories')
        this.categories = res.data
      },
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('upload', formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader()
      }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

<style>
  #file_list {
    border: rgba(0, 0, 0, 0.589) 1px solid;
  }
</style>