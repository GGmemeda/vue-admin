<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" >
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      class="left-main-menu"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import Hamburger from '@/components/Hamburger';

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      // for(let i in this.permission_routers){
      //     console.log('permission_routers'+[i],!this.permission_routers[i].hidden);
      // }
      return !this.sidebar.opened;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .left-main-menu{
    .hamburger-container {
      text-align: center;
      padding: 14px 10px;
    }
  }
</style>
