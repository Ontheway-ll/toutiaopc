<template>
  <div class="login" >
       <!-- 放置一个el-card组件 -->
    <el-card class='login-card'>
      <!-- 放置标题图片 -->
      <div class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 放置表单 -->
      <el-form  ref="loginForm" :model="loginForm"  :rules="loginRules" >
        <!-- 表单域 里面   放置 input/select/checkbox 相当于一行  -->
        <el-form-item prop="mobel" >
           <el-input v-model="loginForm.mobel"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="code" >
          <el-input v-model="loginForm.code" style="width:65%" placeholder="验证码"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked" >
          <!-- 复选框 -->
          <el-checkbox v-model="loginForm.checked" >我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button  @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobel: '', // 手机号
        code: '', // 验证码
        checked: false// 是否同意用户协议
      },
      // 表单的验证规则
      loginRules: {
        mobel: [// required必填,但是不能校验布尔值，messages提示，pattern正则表达式 ^以什么为开头以1为开头 第二位3-9
        // \d数字的意思，{9}9个数字，以9个数字为结尾，
          { required: true, message: '手机号不能为空' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' }, { pattern: /^\d{6}$/, message: '验证是六位数字' }
        ],
        checked: [{
          // 自定义校验,rule代表是当前的校验柜子，value当前要校验的字段的值checked，callback无论成功或者失败
          // 都要执行
          validator: function (rule, value, callback) { value ? callback() : callback(new Error('必须同意条款')) }
        }]
      }
    }
  },
  methods: {
    login () {
      // refs可以获取dom原生对象，也可以获取组件的对象实例，对象有个validate方法
      // validate传入参数，参数为一个回调函数，对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      // this.$refs.loginForm.validate(function (isok) {
      //   if (isok) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验没有通过')
      //   }
      // })
      // 第二种promise方案
      this.$refs.loginForm.validate().then(() => {
        console.log('校验通过')
        // 校验通过后调接口 $axios也是一个方法，传入对象
        this.$axios({
          url: '/authorizations', // 请求地址
          // params: {}, // url参数，参数拼接在url地址上，常说的get参数
          // data: this.loginForm, // body请求体参数，常用post，put，patch
          data: { ...this.loginForm, checked: null }, // body请求体参数
          method: 'post' // 请求类型 post/get/delete/put/patch 默认值是get类型 可全大写 可全小写
        }).then(res => {
          console.log(res.data.data)
          window.localStorage.setItem('user-token', res.data.data.token)
          this.$router.push('/home')
          // 还有可以，this.$router.push({path:'/home'})
        }).catch(() => {
          this.$message({ message: '用户名或者密码错误', type: 'error' })
          // this.$message.error('用户名或者密码错误')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped >
  .login  {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
     .login-card {
      width: 440px;
      height: 350px;
      .title {
        text-align: center;
        margin-bottom: 30px;
        img {
          height: 45px;
        }
      }
    }
  }
</style>
