<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="goPreBackBtn" />

    <van-form @submit="login" class="form">
      <van-field v-model="username" name="用户名" placeholder="请输入账号" />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登 录</van-button
        >
      </div>
    </van-form>
    <a href="#" class="go-reg">还没有账号，去注册~</a>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      reg: /^[a-zA-Z0-9]{5,8}$/
    }
  },
  methods: {
    goPreBackBtn() {
      this.$router.back()
    },
    async login() {
      if (
        this.username.trim().length === 0 ||
        this.password.trim().length === 0
      ) {
        Toast('用户名或密码不能为空')
        return
      }
      if (!this.reg.test(this.username.trim()) || !this.reg.test(this.password.trim())) {
        Toast('用户名或密码的格式5-8位的字母或数字')
        return
      }
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.username, this.password)
        console.log(res)
        if (res.data.status === 200) {
          Toast.success('登录成功')
          localStorage.setItem('token', JSON.stringify(res.data.body.token))
          this.$router.push('/layout/profile')
        } else {
          Toast.fail(res.data.description)
        }
      } catch (error) {
        console.log(error)
        Toast.fail('登录失败，未知错误，请稍后再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 18px;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
    font-size: 16px;
  }
}

.form {
  margin-top: 20px;
  .login-btn {
    height: 50px;
    background-color: #1cb676;
    border: none;
    font-size: 18px;
  }
}

.go-reg {
  display: block;
  margin-top: 30px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
</style>
