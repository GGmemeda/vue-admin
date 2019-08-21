<template>
  <div class="bread-out">
    <el-breadcrumb v-if="!$route.meta.hideBread" class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in showLevelList"
                            :key="item.path"
        >
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1"
                class="no-redirect"
          >{{ item.meta.title }}</span>
          <router-link v-else :to="item.redirect||item.path">
            {{ item.meta.title }}
          </router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        levelList: null
      };
    },
    computed:{
      showLevelList(){
        return this.levelList.filter(item=>{
          return item.meta.title;
        })
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb();
      }
    },
    created () {
      this.getBreadcrumb();

    },
    methods: {
      getBreadcrumb () {
        let matched = this.$route.matched.filter(item => item.name);
        const first = matched[0];
        if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
          // matched = [{ path: '/dashboard', meta: { title: zhc.route.dashboard }}].concat(matched)
          matched = matched;
        }
        this.levelList = matched;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bread-out {
    .app-breadcrumb.el-breadcrumb {
      display: inline-block;
      font-size: 14px;
      margin-left:43px;
      padding: 9px 0;
      position: relative;
      top: 2px;
      .no-redirect {
        color: #97a8be;
        cursor: text;
      }
    }
  }
</style>
