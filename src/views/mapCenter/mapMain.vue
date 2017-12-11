<template>
  <div class="mapMain">
    <div class="map-header">
      <div class="mapHeader-wrap">
        <div class="city-select-out">
          <div class="city-show">
            成都<i class="fa fa-caret-down"></i>
          </div>
        </div>
        <!--搜索框-->
        <div class="mapHeader-searchBar">
          <input type="text" name="kw" class="searchBar-input" placeholder="输入小区名或地标名开始找房" autocomplete="off"
                 maxlength="100" v-model="searchName">
          <button type="button" class="searchBar-button" @click="searchPlace"><i class="fa fa-search"></i>
          </button>
        </div>
        <!--筛选项-->
        <div class="mapHeader-choose">
          <div class="hide-select">
            <select>
              <option value="-1">不限</option>
              <option>青羊</option>
            </select>
            <div class="filter-box" style="height:32px">
              <div class="filter-label"><span data-val="-1" data-title="区域" style="height:32px">区域</span><i
                class="fa fa-angle-down"></i></div>
              <ul style="width: 82px; top: 32px; display: none;">
                <li style="height:34px;line-height:34px;" data-val="-1" class="li-static">不限</li>
                <li style="height:34px;line-height:34px;" data-val="902_30.681159_104.06873_14368_0.0272968">青羊</li>
              </ul>
            </div>
          </div>

          <div class="hide-select">
            <select>
              <option value="-1">请先选择区域</option>
            </select>
            <div class="filter-box" style="height:32px">
              <div class="filter-label"><span data-val="-1" data-title="板块">板块</span><i
                class="fa fa-angle-down"></i></div>
              <ul style="width: 82px; top: 32px; display: none;">
                <li style="height:34px;line-height:34px;" data-val="-1" class="li-static">请先选择区域</li>
              </ul>
            </div>
          </div>
          <div class="hide-select">
            <select>
              <option value="-1">全部</option>
            </select>
            <div class="filter-box" style="height:32px">
              <div class="filter-label"><span>总价</span><i
                class="fa fa-angle-down"></i></div>
              <ul style=" display: none;">
                <li class="li-static">全部</li>
              </ul>
            </div>
          </div>

          <div class="hide-select">
            <select>
              <option value="-1">全部</option>
              <option value="1">一室</option>
            </select>
            <div class="filter-box" style="height:32px">
              <div class="filter-label"><span data-val="-1" data-title="房型" style="height:32px">房型</span><i
                class="fa fa-angle-down"></i></div>
              <ul style="display: none;">
                <li style="height:34px;line-height:34px;" data-val="-1" class="li-static">全部</li>
                <li style="height:34px;line-height:34px;" data-val="1">一室</li>
              </ul>
            </div>
          </div>
          <transition name="fade">
            <div class="hide-select" v-show="animation">
              <select>
                <option value="-1">全部</option>
                <option value="46">50m²以下</option>
              </select>
              <div class="filter-box" style="height:32px">
                <div class="filter-label"><span data-val="-1" data-title="面积" style="height:32px">面积</span><i
                  class="fa fa-angle-down"></i></div>
                <ul style="width: 82px; top: 32px; display: none;">
                  <li style="height:34px;line-height:34px;" data-val="-1" class="li-static">全部</li>
                  <li style="height:34px;line-height:34px;" data-val="46">50m²以下</li>
                </ul>
              </div>
            </div>
          </transition>
          <a class="set-a"><i class="fa fa-list-ul"></i>设置</a>
        </div>

      </div>
    </div>
    <div class="map-out">
      <div class="bMap-out">
        <bMap></bMap>
      </div>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers, mapGetters as allGetters } from 'vuex';
  import bMap from '../../components/map.vue';
  const { mapState, mapGetters, mapActions } = createNamespacedHelpers('mapCenter');

  export default {
    name: 'baiduMap',
    computed: {
      ...mapState({
        mapPoints: 'all'
      }),
      ...mapGetters({
        points: 'changePoints'
      }),
      ...allGetters({
        usePoints: 'allChange'
      })

    },
    methods: {
      searchPlace () {
        this.animation = !this.animation;
      },
      ...mapActions([])
    },
    data () {
      return {
        searchName: '',
        animation: true
      };
    },
    components: {
      bMap
    },
    created () {
      this.$store.dispatch('mapCenter/getAllPoints');
    }

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
  .map-header {
    .fade-enter-active, .fade-leave-active {
      transition: opacity 1s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
    .logo {
      float: left;
      width: 106px;
      height: 30px;
      text-indent: -999em;
      display: block;
      overflow: hidden;
      margin: 0;
      vertical-align: bottom;
      /*background: url('../../assets/logo.svg') 0 0 no-repeat;*/
      background-size: 106px 30px;
    }
    .city-select-out {
      float: left;
      margin: 8px 0 0 10px;
      display: inline-block;
      position: relative;
      font-size: 14px;
      z-index: 99;
      .city-show {
        font-size: 12px;
        position: relative;
        display: inline-block;
        padding: 0 15px 0 0;
        cursor: pointer;
        i {
          margin-left: 5px;
          color: #a7a7a7;
        }
      }
    }

    height: 46px;
    padding: 13px 0 0 21px;
    border-bottom: 1px solid #ccc;
    .mapHeader-searchBar {
      float: left;
      padding-left: 15px;
      position: relative;
    }
    .searchBar-input {
      color: #333;
      font-size: 11px;
      height: 32px;
      width: 185px;
      line-height: 30px;
      padding: 0 35px 0 13px;
      border: 1px solid #ccc;
      background: #f8f8f8;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) inset;
      border-radius: 3px 0 0 3px;
    }
    .searchBar-button {
      margin-left: -4px;
      width: 48px;
      height: 34px;
      color: #fff;
      font-size: 18px;
      border: 0;
      cursor: pointer;
      vertical-align: middle;
      background-color: #62ab00;
      border-radius: 0 3px 3px 0;
      letter-spacing: 4px;
      font-family: "Microsoft YaHei", "微软雅黑", Tahoma, Arial, simhei, Helvetica, sans-serif;
    }
    .searchBar-button:hover {
      background: #4a8101;
    }
  }

  .mapHeader-choose {
    margin-left: 483px;
    margin-right: 10px;
    .hide-select {
      float: left;
      width: 84px;
      height: 34px;
      margin-left: 10px;
      position: relative;
      select {
        display: none;
      }
    }
    .hide-select .filter-box {
      border-color: #ccc;
      .filter-label {
        span {
          color: #333;
          font-size: 12px;
          line-height: 32px;
          overflow: hidden;
          white-space: nowrap;
          padding: 0 15px 0 15px;
          text-overflow: ellipsis;
          font-weight: 400;
        }
        i {
          position: absolute;
          line-height: 0;
          display: inline-block;
          right: 10px;
          width: 8px;
          height: 4px;
          color: #bdbdbd;
          top: 16px;
        }
      }
    }
    .filter-box {
      cursor: pointer;
      position: relative;
      background-color: #fff;
      border: 1px solid #e3e3e3;
    }
    .set-a {
      padding: 0 10px;
      height: 30px;
      float: right;
      line-height: 30px;
      text-align: center;
    }
    .set-a {
      color: #666;
      .fa-list-ul {
        font-size: 16px;
        vertical-align: text-bottom;
      }
    }
    .set-a i {
      vertical-align: -2px;
      margin-right: 5px;
    }
  }

  .icon-clear, .fa-list-ul {
    color: #666;
  }

  .map-out {
    zoom: 1;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    min-width: 1180px;
    position: absolute;
  }

  .bMap-out {
    position: relative;
    height: 100%;
  }


</style>
