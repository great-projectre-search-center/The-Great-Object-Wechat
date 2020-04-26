var app = getApp()
Page({
  data: {
  },

  Tel: function () {
    wx.makePhoneCall({
      phoneNumber: '17603367032', //这个是我的手机号，模拟测试
      success: function () {
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  onLoad: function (options) {
  },

})