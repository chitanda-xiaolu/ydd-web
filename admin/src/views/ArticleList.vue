<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <!-- <el-table-column prop="categories" label="文章标签"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="readArticle(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/articles')
      console.log(res.data)
      this.items = res.data
    },
    async remove(row) {
      this.$confirm(`是否删除"${row.title}"文章？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async ()=>{
        this.$http.delete(`rest/articles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
      })
        this.fetch()
      })

    },
    readArticle(row) {
      alert(`查看文章：${row.title}`)
    }
  },
  created() {
    this.fetch()
  }
}
</script>
