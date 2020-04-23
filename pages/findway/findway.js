//'LQXBZ-ZSFWG-AGDQ3-IXFEB-ULEOV-QHBH7';  //使用在腾讯位置服务申请的key
//'帮跑跑-findway';   //调用插件的app的名称

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'LQXBZ-ZSFWG-AGDQ3-IXFEB-ULEOV-QHBH7'
    });

    
  },

  //此函数计算两点之间距离
  //参数：两个有效地址（不能没有区县：北京市海淀区彩和坊路海淀西大街74号）
  //思路：地址解析->距离计算
  formSubmit(e) {
    var _this = this;
    var add1;
    var add2;
    //1.地址解析
    qqmapsdk.geocoder({
      address: e.detail.value.geocoder, //地址参数
      success: function (res) {//成功后的回调
        add1 = res.result.location
        console.log(add1);
      },
      fail: function (error) {
        console.error(error);
      }
    })
    qqmapsdk.geocoder({
      address: e.detail.value.geocoder1, //地址参数
      success: function (res) {//成功后的回调
        add2 = res.result.location
        console.log(add2);
      },
      fail: function (error) {
        console.error(error);
      }
    })
    //调用距离计算接口
    qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: [{
        latitude: add1.lat,
        longitude: add2.lng
      }] || '', //若起点有数据则采用起点坐标，若为空默认当前地址
      to: [{
        latitude: add2.lat,
        longitude: add2.lng
      }], //终点坐标
      success: function (res) {//成功后的回调
        console.log(res);
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log("错误");
      }
    });
  }
})