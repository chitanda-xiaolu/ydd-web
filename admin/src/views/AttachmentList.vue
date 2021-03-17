<template>
  <div>
      <h1>附件列表</h1>
      <el-table :data="items" border>
          <el-table-column label="文章名称" prop="article"></el-table-column>
          <el-table-column label="附件名称" prop="originalname"></el-table-column>
          <el-table-column label="附件类型" prop="filetype"></el-table-column>
          <el-table-column label="url" prop="url"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="downloadContent(scope.row)"
          >下载</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/attachment')
      this.items = res.data
    },
    async remove(row) {
      this.$confirm(`是否删除"${row.title}"附件？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async ()=>{
        this.$http.delete(`rest/attachment/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
      })
        this.fetch()
      })

    },
    async downloadContent(row) {
      axios({
        url: row.url,
        method: 'get',
        data: {},
        responseType: 'blob'
      }).then(res => {
        const link = document.createElement('a')
        const blobType = {jpg: 'application/x-jpg', docx: 'application/msword', png: 'application/x-png', xlsx: 'application/x-xls', pptx: 'application/x-ppt'}
        const type = blobType[row.filetype]
        const blob = new Blob([res.data],{type: type})
        const url = window.window.URL.createObjectURL(blob)
        link.href = url
        link.download = row.originalname
        link.click()
        window.URL.revokeObjectURL(url)
        console.log(url)
      })
    }
  },
  created() {
    this.fetch()
  }

}
</script>

<style>

</style>