// pages/AddressSelection/AddressSelection.js
/*
- 首先在后端读addressList
- 渲染到页面nameAndphone+adder
- 选择哪一个点击
- 带参数返回
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameAndphone:"李彬"+" "+"176033607032",
    adder:"河北XXXXXXXXXXXXXXX",
    addressList: []
  },

  returnAdder:function(e){
    //得到索引，然后返回
    console.log(e)
    //转跳页面把值带过去
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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