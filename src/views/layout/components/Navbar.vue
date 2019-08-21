<template>
  <div class="navbar">
    <img style="margin-left: 15px" src="../../../assets/logo.png" height="45" alt="">
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item" />
        <el-tooltip :content="navbar.screenfull" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item" />
        </el-tooltip>
      </template>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <span :style="'background-image:url('+avatar+'?imageView2/1/w/80/h/80),url('+require('@/assets/logo.png')+')'" class="user-avatar">{{ name }}</span>

          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--<router-link to="/">-->
          <!--<el-dropdown-item>-->
          <!--{{ navbar.dashboard }}-->
          <!--</el-dropdown-item>-->
          <!--</router-link>-->
          <el-dropdown-item>
            <span style="display:block;" @click="logout">{{ navbar.logOut }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Screenfull from '@/components/Screenfull';
import ErrorLog from '@/components/ErrorLog';
import zhc from '../../../utils/wordsconfig.js';

export default {
  components: {
    Screenfull,
    ErrorLog
  },
  data() {
    return {
      navbar: zhc.navbar
    };
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'device'])
  },
  methods: {
    // toggleSideBar() {
    //     this.$store.dispatch("toggleSideBar");
    // },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    border-bottom: 1px solid #f0f0f0;
    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }
    .right-menu {
        float: right;
        height: 100%;
        display: flex;
        align-items: center;
        &:focus {
            outline: none;
        }
        .right-menu-item {
            display: inline-block;
            margin: 0px 8px;
        }
        .screenfull {
            height: 20px;
        }
        .international {
            vertical-align: top;
        }
        .theme-switch {
            vertical-align: 15px;
        }
        .avatar-container {
            height: 50px;
            margin-right: 30px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    margin: 10px 0;
                    height: 30px;
                    padding-left: 40px;
                    width: auto !important;
                    border-radius: 10px;
                    display: block;
                    background: no-repeat scroll 5px center;
                    background-size: 25px auto;
                    line-height: 30px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -16px;
                    top: 9px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
