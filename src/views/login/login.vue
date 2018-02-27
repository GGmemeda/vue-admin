<template>
  <div class="login" lang="en">
    <div class="logo-block">
      <!--<ul class="lang-choose">-->
      <!--&lt;!&ndash;<li class="lang-item">11</li>&ndash;&gt;-->
      <!--</ul>-->
    </div>

    <div class="login-bg">
      <div class="login-block">
        <div class="info">
          <p class="info-title">One Stop Video Cloud Service Platform</p>
          <p class="info-msg">Global Enterprise Video Solutions</p>
        </div>
        <div class="content-bg">
          <div class="content">
            <h3 class="form-title">Administrator Login</h3>

            <div class="control-group">
              <div class="controls">
                <i class="fa fa-user login-icon"></i>
                <input class="m-wrap placeholder-no-fix" type="text" v-model="name"
                       placeholder="Username" name="username" id="username"
                >
              </div>
            </div>
            <div class="control-group">
              <div class="controls">
                <i class="fa fa-lock login-icon"></i>
                <input class="m-wrap placeholder-no-fix" type="password"
                       placeholder="Password" name="password" id="password"
                       autocomplete="off" v-model="pwd">
              </div>
            </div>
            <div class="control-group error">
              <div class="alert alert-danger" ng-if="errorMsg">提示错误</div>
            </div>
            <div class="control-group">
              <div class="checkbox">

              </div>
              <button type="button" class="btn normalBtn login-btn" id="login_btn"
                      @click="handleLogin">登陆
              </button>
            </div>


          </div>

        </div>

        <div class="copyright">
        </div>
      </div>
    </div>

  </div>

</template>
<script type='es6'>
  import api from '@/api/index.js';
  import MD5 from 'js-md5';
  import { Base64 } from 'js-base64';
  import { SALT } from 'utils/constant'

  export default {
    name: 'login',
    data() {
      return {
        name: '',
        pwd: '',
        error: '',
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      handleLogin(){
        let reg = /^[0-9a-zA-Z]{0,20} * $/;
        let status = reg.test(this.pwd);
        if (!status) {
          return;
        }
        let loginData = {
          name: this.name,
          pwd: MD5(SALT + this.pwd)
        };

        api.loginApi.login(loginData).then(res => {

        });
        localStorage.setItem('ucToken', '12312knasdafmdwj1242');
        this.$router.push({path: '/', name: 'mapMain'});
      },
      isLogin: function () {
        // 这里在isLogin方法中先判断一下后台返回的是否为空值，如果不是然后提交后台返回的值。
        // 注意这里是个难点，Vuex与Vue-Resource结合使用。
//        this.$store.commit('isLogin', response.body[0]);
      }
    }
  };
</script>
<style lang="less" type="text/less">
  @green: #32b7a0;
  @gary: #d4d4d4;
  @green-hover: #2f9e8b;
  @orange: #f88b3a;
  @orange-hover: #c77538;
  @input-border-color: #bababa;
  @font-blue: #23527c;

  .login {
    height: 100%;
    .btn {
      display: inline-block;
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px;
    }
    .normalBtn {
      color: #fff;
      background-color: #32b7a0;
      border-color: #32b7a0;
    }
    .logo-block {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      min-width: 1000px;
    }
    .logo {
      margin: 15px 0 15px 122px;

    }
    .lang-choose {
      float: right;
      .lang-item {
        display: inline-block;
        border-right: 1px solid @gary;
        margin: 5px 0;
        padding: 0 10px;
        cursor: pointer;
        &:last-of-type {
          border-right: none;
        }
        &:hover {
          color: @font-blue;
        }
      }
    }
    .login-bg {
      background: url("../../assets/login/login_bg.jpg") center top fixed no-repeat;
      background-size: 100% 100%;
      height: 100%;
      width: 100%;
      min-height: 800px;
      min-width: 1000px;
    }
    .login-block {
      width: 1000px;
      height: 100%;
      margin: 0 auto;
      padding-top: 201px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
    }
    .info {
      width: 400px;
      height: 400px;
      background: url("../../assets/login/left_bg.png") no-repeat center;
      background-size: 100% 100%;
      color: #fff;
      text-align: center;
      .info-title {
        margin-top: 160px;
        font-size: 36px;
        font-weight: bolder;
      }
      .info-msg {
        font-size: 20px;
      }
    }
    .content-bg {
      background-color: #6ab8d1;
      width: 400px;
      height: 360px;
      padding: 10px;
      right: 0;
    }

    .copyright {
      text-align: center;
      width: 1000px;
      height: 150px;
      margin: 0 auto;
      color: #333;
      font-size: 14px;
      align-self: flex-end;
      background-size: 100% 100%;
      &:before {
        display: block;
        content: '';
        height: 90px;
      }
    }
    .content {
      background-color: #fff;
      width: 400px;
      height: 360px;
      position: relative;
      &:before {
        position: absolute;
        z-index: -1;
        left: 20px;
        bottom: 20px;
        width: 80%;
        height: 30px;
        content: "";
        transform: skew(160deg) rotate(-5deg);
        -webkit-transform: skew(160deg) rotate(-5deg);
        -moz-transform: skew(160deg) rotate(-5deg);
        box-shadow: 0 25px 40px #555;
      }
      &:after {
        position: absolute;
        z-index: -1;
        right: 20px;
        bottom: 20px;
        width: 80%;
        height: 30px;
        content: "";
        transform: skew(-160deg) rotate(5deg);
        -webkit-transform: skew(-160deg) rotate(5deg);
        -moz-transform: skew(-160deg) rotate(5deg);
        box-shadow: 0 25px 40px #555;
      }
      .m-wrap {
        width: 258px;
        height: 40px;
        background-color: #fff;
        padding-left: 45px;
        border: 1px solid @gary;
        font-size: 16px;
        line-height: 40px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        &:focus {
          border-color: @green;
          .login-icon {
            color: @green;
          }
        }
      }

      .control-group {
        margin-bottom: 20px;
        position: relative;
        text-align: center;
        &.error {
          height: 50px;
          padding: 0 47px;
        }
        &:first-of-type {
          margin-top: 30px;
        }
        .login-icon {
          position: absolute;
          color: #6f6f6f;
          font-size: 21px;
          top: 10px;
          left: 66px;
        }
      }

      .form-title {
        font-weight: 300;
        font-size: 26px;
        text-align: center;
        color: #ffffff;
        background-image: linear-gradient(-90deg, #42ade9, #1d65bc);
        background-image: -webkit-linear-gradient(-90deg, #42ade9, #1d65bc);
        margin: 0 auto;
        width: 170px;
        height: 50px;
        line-height: 50px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }

      .forget-password {
        margin-top: 25px;
      }
    }
    .login-btn {
      width: 282px;
      font-size: 21px;
      font-weight: bold;
      box-shadow: 0 5px 10px @green;
    }

    .errorMsg {
      color: #ff0000;
    }

    /************* 多语言适配 ************/
    &[lang='en'] {
      .content {
        .form-title {
          font-size: 20px;
          width: 210px;
        }
      }
      .login-btn {
        font-size: 18px;
      }
      .info .info-title {
        margin-top: 140px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    /***
  Login page
  ***/
    .login {
      .logo {
        margin-top: 10px;
      }

      .content {
        padding: 30px;
        width: 222px;

        h3 {
          font-size: 22px;
        }
      }

      .checkbox {
        font-size: 13px;
      }
    }
  }

</style>
