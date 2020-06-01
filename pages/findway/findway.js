//'LQXBZ-ZSFWG-AGDQ3-IXFEB-ULEOV-QHBH7';  //使用在腾讯位置服务申请的key
//'帮跑跑-findway';   //调用插件的app的名称


/**
 * 在提交订单是否需要距离计算来进行积分生成
 * 如果有 相应函数在这
 */

var app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  data:{
    add1 : "",
    add2 : ""
  },

  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'LQXBZ-ZSFWG-AGDQ3-IXFEB-ULEOV-QHBH7'
    });
    
  },

  //计算两点之间距离
  formSubmit(e) {

    var add1 = "";
    var add2 = "";

    //地址解析add1
    qqmapsdk.geocoder({
      address: e.detail.value.geocoder, //地址参数
      success: function (res) {
        add1 = res.result.location.lat + "," + res.result.location.lng
        console.log("add1位置:"+add1);
        //地址解析add2
        qqmapsdk.geocoder({
          address: e.detail.value.geocoder1, //地址参数
          success: function (res) {
            add2 = res.result.location.lat + "," + res.result.location.lng
            console.log("add2位置:" +add2);
            //调用接口计算距离
            qqmapsdk.calculateDistance({
              from: String(add1), 
              to: String(add2), 
              success: function (res) {//成功后的回调
                console.log("距离"+res.result.elements[0].distance);
              },
              fail: function (error) {
                console.error(error);
              }
            });
          },
          fail: function (error) {
            console.error(error);
          }
        })
      },
      fail: function (error) {
        console.error(error);
      }
    })
  }
  
})