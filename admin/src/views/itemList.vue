<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="height: 60px;width: 60px">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
          >编辑</el-button>
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
      const res = await this.$http.get('rest/items')
      console.log(res.data.name)
      this.items = res.data
      console.log(this.items.parent)
    },
    async remove(row) {
      this.$confirm(`是否删除"${row.name}"分类？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async ()=>{
        this.$http.delete(`rest/items/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
      })
        console.log("开始刷新")
        this.fetch()
        console.log("刷新成功")
      })

    }
  },
  created() {
    this.fetch()
  }
}
</script>
