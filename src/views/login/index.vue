<template>
  <div>
    <div class="logoheader m0">
      <h1 class="fl">
        <a href="javascsript:;"><img src="../../static/loginassets/images/logo_06.png" alt="logo"></a>
      </h1>
      <p class="fr"><span>客服热线：</span>999-9999-9999</p>
    </div>
    <div id="container" class="mainwrap">
      <!--login-->
      <div id="output" style="position:absolute;" />
      <div class="mainbox m0">
        <div class="login fr">
          <div class="log-user">
            <form id="loginForm">
              <h2>用户登录</h2>
              <p>请保护你账号和密码的安全，不要泄露给他人</p>

              <div class="userinput">
                <div class="cb">
                  <div class="username mb15 mt15">
                    <span class="fl img" />
                    <input id="UserName" v-model="loginAccount.username" type="text" name="UserName" class="input" placeholder=" 账户">
                  </div>
                  <div class="userpw">
                    <span class="fl img" />
                    <input id="Password" v-model="loginAccount.password" name="Password" placeholder="密码" type="password" class="input">
                  </div>
                </div>
                <div class="space">

                  <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登 录</el-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="loginfooter">
      <p class="m0 mt15">Copyright © 2024 ~ 2025 Team All rights reserved. 最终解释权归本团队所有</p>
    </div>
  </div>
</template>

<script>
import { title } from '@/settings'
import setRule from '@/utils/form-validate'
import { Victor } from '@/static/loginassets/js/vector'

export default {
  name: 'Login',
  data() {
    return {
      title,
      loginAccount: {
        username: 'admin',
        password: '111111'
      },
      rules: {
        username: setRule('账号', [{ required: true, trigger: 'change' }]),
        password: setRule('密码', [{ required: true, trigger: 'change' }])
      },
      passwordVisible: true,
      capslockTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  computed: {
    passwordType() {
      return this.passwordVisible ? '' : 'password'
    },
    eyeStyle() {
      return this.passwordVisible ? 'vue-icon-eye-open' : 'vue-icon-eye-close'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // // window.addEventListener('storage', this.afterQRScan)

  },
  mounted() {
    if (this.loginAccount.username === '') {
      this.$refs.username.focus()
    } else if (this.loginAccount.password === '') {
      this.$refs.password.focus()
    }
    this.backcreate()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    backcreate() {
      Victor('container', 'output') // 登录背景函数
    },
    showPassword() {
      this.passwordVisible = !this.passwordVisible
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capslockTooltip = true
        } else {
          this.capslockTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capslockTooltip === true) {
        this.capslockTooltip = false
      }
    },
    handleLogin() {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      this.loading = true
      this.$store.dispatch('account/login', this.loginAccount)
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
      // })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style scoped>
  @import "../../static/loginassets/css/login.css";
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $dark-bg: #2d3a4b;
  $darker-bg: #283443;
  $dark-gray: #889aa4;
  $light-gray: #eee;
  $cursor:#fff;
/*
  .login {
    min-height: 100%;
    width: 100%;
    background-color: $dark-bg;
    overflow: hidden;

    &-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      .title-container {
        position: relative;

        .title {
          font-size: 26px;
          font-weight: 400;
          color: $light-gray;
          margin: 0px auto 40px auto;
          text-align: center;
        }
      }
*/
      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: $cursor;

        .el-input {
          display: inline-block;
          height: 48px;
          width: 85%;
          margin-left: 35px;

          // /deep/ input {
          //   background: transparent;
          //   border: 0px;
          //   -webkit-appearance: none;
          //   border-radius: 0px;
          //   padding: 12px 5px 12px 15px;
          //   color: $light-gray;
          //   height: 48px;

          //   &:-webkit-autofill {
          //     box-shadow: 0 0 0px 1000px $darker-bg inset !important;
          //     -webkit-text-fill-color: $cursor !important;
          //   }
          // }
        }

        .input-left-icon {
          position: absolute;
          width: 48px;
          height: 48px;
          line-height: 48px;
          display: inline-block;
          padding: 0 12px;
          color: $dark-gray;

          .iconfont {
            font-size: 22px;
          }
        }

        .input-right-icon {
          position: absolute;
          right: 0px;
          width: 48px;
          height: 48px;
          line-height: 48px;
          cursor: pointer;
          padding: 0 12px;
          user-select: none;
          color: $dark-gray;

          .iconfont {
            font-size: 22px;
          }
        }
      }

      .el-button {
        width: 100%;
        margin-bottom: 30px;
        font-size: 18px;
        line-height: 26px;
      }
  .space {
    padding-top: 15px;
  }
</style>
