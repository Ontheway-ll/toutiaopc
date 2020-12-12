<template>
 <el-card>
   <!-- 面包屑组件 -->
   <bread-cumb slot="header" >
    <!-- 填坑 -->
    <template slot="title" >
        评论列表
    </template>
   </bread-cumb>
   <el-table :data="list">
         <!-- 使用el-table-column作为列 -->
         <!-- prop 表示显示的字段 label表示表头 -->
          <el-table-column prop="title" width="600"  label="标题"></el-table-column>
       <el-table-column :formatter="formatterBool"  prop="comment_status" label="评论状态"></el-table-column>
       <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
       <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
       <el-table-column  label="操作">
           <!-- 可以放组件 饿了么传出三个参数，row，column ，index，slot-scoped来接收 -->
         <template slot-scope="obj" >
            <el-button size="small" type='text'>修改</el-button>
          <el-button @click="openclick(obj.row)" size="small" type='text'>{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
         </template>
       </el-table-column>
      </el-table>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   获取评论数据
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment' // 此参数用来控制获取数据类型
        }
        // query参数应该在哪个位置传 axios
        // params 传get参数也就是query参数
        // data   传body参数也就是请求体参数
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openclick (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        // 如果成功之后去掉接口
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id // 要求参数的文章id
          },
          data: {
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        }).then(() => {
          this.$message.success(`${mess}评论成功`)
          this.getComment() // 调用重新拉取数据的方法
        }).catch(() => {
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
