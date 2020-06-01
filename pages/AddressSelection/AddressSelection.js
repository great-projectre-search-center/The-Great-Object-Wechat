// pages/AddressSelection/AddressSelection.js
/*

- 首先在后端读addressList
- 渲染到页面nameAndphone+adder
- 选择哪一个点击
- 带参数返回


地图选点转跳传参还没写
然后addressList的具体格式还不清楚

*/


var app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameAndphone1:"李彬"+" "+'176033607032',
    adder1:'河北省 秦皇岛市 海港区 河北大街',
    addresschoseId:'',
    //演示
    addressList: [
      {
            id: 11,
            value: '张三',
            phone:'176033670333',
            address:'河北省 秦皇岛市 海港区 河北大街'
      }, {
            id: 12,
            value: '李四',
            phone:'176033670333',
            address:'河北省 秦皇岛市 海港区 河北大街'
      }, {
            id: 13,
            value: '王五',phone:'176033670333',
            address:'河北省 秦皇岛市 海港区 河北大街'
      }
    ]
  },

  returnAdder:function(e){
    var t= "";
    qqmapsdk.geocoder({
      address: e.currentTarget.id, //地址参数
      success: function (res) {
        t = res.result.location.lat + "," + res.result.location.lng
        //console.log("t位置:"+t);

        
        var pages = getCurrentPages();   //当前页面
        var prevPage = pages[pages.length - 2];   //上一页面
        prevPage.setData({
               //直接给上一个页面赋值
              addresschoseId: t,//e.currentTarget.id
        });
    
        wx.navigateBack({
             delta: 1
        })


      },
      fail: function (error) {
        console.error(error);
      }
    })

    /*
    var pages = getCurrentPages();   //当前页面
    var prevPage = pages[pages.length - 2];   //上一页面
    prevPage.setData({
           //直接给上一个页面赋值
          addresschoseId: t,//e.currentTarget.id
    });
 
    wx.navigateBack({
         delta: 1
    })
    */

    //得到索引，然后返回
    //console.log(addresschoseId)
    //转跳页面把值带过去

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    qqmapsdk = new QQMapWX({
      key: 'LQXBZ-ZSFWG-AGDQ3-IXFEB-ULEOV-QHBH7'
    });

    //展示所有地址
    var that = this
    const app = getApp();
    wx.request({
      url: "https://xcx.zxcwxy999.xyz/"+'/address',
      data: {
        uid : app.globalData.openid
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
            addressList:res.data
          })
        }
      })
  }


})