<template>
  <div class="baiduMap" id="baiduMap"></div>

</template>
<script>
  export default {
    beforeRouteEnter () {
    },
    data () {
      return {};
    },
    mounted () {
      setTimeout(() => {
        const map = new BMap.Map('baiduMap');           // 创建Map实例
        // 添加地图类型控件
        map.addControl(new BMap.MapTypeControl());
        // 设置地图显示的城市 此项是必须设置的
        map.centerAndZoom('成都', 15);
        // 开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true);
        /** **********************************************
         添加定位相关控件
         *************************************************/
        var navigationControl = new BMap.NavigationControl({
          // 靠左上角
          anchor: BMAP_ANCHOR_TOP_LEFT,
          // LARGE类型
          type: BMAP_NAVIGATION_CONTROL_LARGE,
          // 启用显示定位
          enableGeolocation: true
        });
        map.addControl(navigationControl);
        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl();
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            map.setZoom(20);
            console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
          } else {
            console.log('failed' + this.getStatus());
          }
        }, { enableHighAccuracy: true });
        geolocationControl.addEventListener('localtionSuccess', function (e) {
          // 定位成功事件
          var address = '';
          address += e.addressComponent.province;
          address += e.addressComponent.city;
          address += e.addressComponent.district;
          address += e.addressComponent.street;
          address += e.addressComponent.streetNumber;
          alert('当前定位地址为：' + address);
        });
        geolocationControl.addEventListener('locationError', function (e) {
          // 定位失败事件
          alert(e.message);
        });
//        104.076378,30.573345
        map.addControl(geolocationControl);
        // 添加全景控件展示
//        map.addTileLayer(new BMap.PanoramaCoverageLayer());
        var stCtrl = new BMap.PanoramaControl(0);// 构建全景控件
        stCtrl.setOffset(new BMap.Size(20, 70));
        map.addControl(stCtrl);
        // 覆盖物设置
        var pt = new BMap.Point(104.076378, 30.573345);
        var myIcon = new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/fox.gif', new BMap.Size(300, 157));
        var marker2 = new BMap.Marker(pt, { icon: myIcon });
        map.addOverlay(marker2);
        function showInfo (e) {
          alert(e.point.lng + ',' + e.point.lat);
        }
        map.addEventListener('click', showInfo);
      }, 300);
    }
  };
</script>
<style scoped lang="less" type="text/less">
  #baiduMap {
    zoom: 1;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    min-width: 1080px;
    position: absolute;
  }
</style>
