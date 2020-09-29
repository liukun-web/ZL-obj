<template>
  <div class="login-container">
      <van-nav-bar class="page-nav-bar" title="登录" >
        <van-icon slot="left" name="cross" size="20" @click="$router.back()"/>
      </van-nav-bar>

      <van-form @submit="onSubmit" ref="loginForm">
        <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile" type="number" maxlength="11" >
        <i slot="left-icon" class="iconfont iconshouji"></i>
        </van-field>
        <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code" type="number" maxlength="6">
          <i slot="left-icon" class="iconfont iconyanzhengma"></i>
          <template #button>
            <van-count-down class="send-sms-btn" v-if="isCountDownShow" slot="button" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false" />
            <van-button v-else class="send-sms-btn" round size="small" type="default" native-type="button" @click="onSendSms">发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit">
          登录
          </van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
// import axios from 'axios'
import { login, getSmsCode } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  created () {},
  methods: {
    async onSubmit () {
      this.$toast.loading({ message: '登录中...', forbidClick: true, duration: 0 })
      const user = this.user
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success({ message: '登录成功', forbidClick: true })
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail({ message: '手机或验证码错误' })
        } else {
          this.$toast.fail({ message: '登录失败,请稍后再试' })
        }
      }
    },
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isCountDownShow = true

      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 202px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
