<template>
  <el-row class='layout-header' type="flex"  align="middle" >
  <el-col :span="12" class="left"  >
       <!-- 图标 -->
       <i class='el-icon-s-fold'></i>
       <span>
           江苏传智播客教育科技股份有限公司
       </span>
  </el-col>
 <el-col class='right' :span="12">
        <!-- 再次放置一个 row组件  align属性设置垂直对齐方式  justify设置 水平对齐属性-->
        <el-row type='flex' justify="end" align="middle">
          <img src="https://img04.sogoucdn.com/app/a/100520024/d21879c29198aab32c50ef809560b253" alt="">
           <!-- 下拉菜单 -->
           <el-dropdown trigger='click' @command="clickMenu" >
               <!-- 显示的内容 -->
               <span>水若寒宇</span>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件-->
                    <el-dropdown-item command="info" >个人信息</el-dropdown-item>
                    <el-dropdown-item command="gitadress" >git地址</el-dropdown-item>
                    <el-dropdown-item command="exit" >退出</el-dropdown-item>

                </el-dropdown-menu>
           </el-dropdown>
        </el-row>
    </el-col>

 </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfor: {

      }
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'gitadress') {
        window.location.href = 'https://element.eleme.cn/#/zh-CN/component/dropdown'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    // const token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}` // 格式要求 Bearer +token
      // }
    }).then(res => {
      // 如果加载成功了 我们要将数据赋值给 userInfo
      this.userInfo = res.data.data
    })
  }
}
</script>

<style lang="less" scoped >
 .layout-header {
      height: 60px;
      .left {
          i {
              font-size:20px;
          }
      }
      .right {
          img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 4px;
          }
      }
 }
</style>
