<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ constwordslogin.title }}
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" :placeholder="constwordslogin.username" name="username" type="text"
                  auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="loginForm.password" :type="passwordType" :placeholder="constwordslogin.password"
                  name="password" auto-complete="on" @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="eyeType" />
        </span>
      </el-form-item>

      <el-form-item prop="verifycode" class="identifybox">
        <el-input v-model="loginForm.verifycode" :placeholder="constwordslogin.verifycode" name="verifycode" type="text"
                  class="identifyinput"
        />
        <img :src="identifyCode" class="identifyimg" @click="refreshCode">
      </el-form-item>

      <el-button :loading="loading" type="primary" class="logIn" @click.native.prevent="handleLogin">
        {{ constwordslogin.logIn }}
      </el-button>
    </el-form>
    <div class="bei-an">
      <a href="http://www.beian.miit.gov.cn">备案编号:蜀ICP备18023925号</a>
    </div>
  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate';
  import zhc from '../../utils/wordsconfig.js';
  import {setToken} from "../../utils/auth";

  export default {
    name: 'Login',
    components: {},
    data () {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('Please enter user name'));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(
            new Error('The password can not be less than 6 digits')
          );
        } else {
          callback();
        }
      };
      const validateVerifyCode = (rule, value, callback) => {
        //无需填写验证码
        callback();
        // if (!value.length) {
        //   callback(
        //     new Error('VerifyCode no Null or Empty')
        //   );
        // } else {
        //   callback();
        // }
      };
      return {
        identifyCode: process.env.BASE_API + '/vercode.ashx?key=create',
        loginForm: {
          username: 'admin',
          password: '123456',
          verifycode: ''
          // username: "",
          // password: ""
        },
        loginRules: {
          username: [
            {
              required: true,
              trigger: 'blur',
              validator: validateUsername
            }
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword
            }
          ],
          verifycode: [
            {
              required: false,
              trigger: 'blur',
              validator: validateVerifyCode
            }
          ]
        },
        passwordType: 'password',
        eyeType: 'eyeclose',
        loading: false,
        redirect: undefined,
        constwordslogin: zhc.login
      };
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created () {
      setToken("232");
    },
    destroyed () {},
    methods: {
      refreshCode () {
        this.identifyCode = process.env.BASE_API + '/vercode.ashx?key=create&num=' + Math.random();
      },
      showPwd () {
        if (this.passwordType === 'password') {
          this.passwordType = '';
          this.eyeType = 'eyeopen';
        } else {
          this.passwordType = 'password';
          this.eyeType = 'eyeclose';
        }
      },
      handleLogin () {
        this.$router.push("/");
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$router.push("/");
            // this.loading = true;
            // this.$store
            //   .dispatch('LoginByUsername', this.loginForm)
            //   .then(() => {
            //     this.loading = false;
            //     this.$router.push({ path: this.redirect || '/' });
            //   })
            //   .catch(() => {
            //     this.loading = false;
            //   });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */

  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .bei-an{
      p{
        margin:0;
      }
      background: transparent;
      color: #9c9c9c;
      text-align: center;
      position: absolute;
      bottom: 10px;
      width: 100%;
    }
    .el-input {
      display: inline-block;
      height: 49px;
      width: 85%;
      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 49px;
        caret-color: $cursor;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .identifybox {
      margin-bottom: 30px !important;
    }
    .identifyinput {
      width: calc(100% - 150px);
    }
    .identifyimg {
      width: 150px;
      height: 48px;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
    }
    .el-form-item__content {
      display: flex;
      flex-direction: row;
    }
    span.show-pwd > svg.svg-icon {
      width: 1.3em;
      height: 1.3em;
      vertical-align: -.25em;
    }
    .logIn {
      width: 100%;
      height: 45px;
    }

  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background:url("../../assets/bg.jpg")no-repeat center;
    background-size: 100% 100%;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 450px;
      max-width: 100%;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 5px 5px 5px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
