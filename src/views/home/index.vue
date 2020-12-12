<template>
<!-- 整个大容器 -->
 <el-container>
   <!-- 左边侧边栏 -->
    <el-aside style="width:230px;" >
      <layout-side></layout-side>
    </el-aside>
    <!-- 右边一个容器 -->
    <el-container>
      <!-- 右边容器上部分 -->
     <el-header>
       <layout-header></layout-header>
     </el-header>
     <!-- 右边下面主体部分 -->
     <el-main style="padding:0;" >
       <router-view></router-view>
     </el-main>
    </el-container>
</el-container>

</template>

<script>

export default {

}
</script>

<style>

</style>
