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
      <el-form-item label="附件上传:">
        <el-upload
          id="file_list" 
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList">
          <el-button size="small" type="primary" style="margin-left: 10px">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" style="margin-left: 10px">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
      fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
    }
  },
  components: {VueEditor},
  methods: {
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
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
        console.log('开始上传图片')
        const res = await this.$http.post('upload', formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader()
      }
  },
  created() {
    console.log("文章页面初始化")
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