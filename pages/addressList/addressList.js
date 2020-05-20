Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  listAddress: function() {
    var that = this
    wx.request({
      url: app.globalData.baseurl + '/address',
      data: {
        uid : app.globalData.userInfo
      },
      method: "GET",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function(res) {
        that.setData({
            addressList:this.data
          })
        }
      })
  },
  deleteAddress: function() {
    var that = this
    wx.request({
      url: app.globalData.baseurl + '/'+addressList[0].aid+'/delete',
      data: {
        uid : app.globalData.userInfo,
        username : app.globalData.userInfo
      },
      method: "DELETE",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function(res) {
        if(res.data.isOk==true){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
          })
        }else {
          wx.showToast({
            title: '发布失败',
            duration: 2000
          })
        }
      }
  })
},
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    var that = this

    wx.request({
      url: app.globalData.baseurl + "/auth/uploadWxUserinfo",
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        userinfo: e.detail.userInfo
      },
      success: res => {
        that.setData({
          loginbtn: false
        })
        wx.setStorageSync("hasuserinfo", true)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = wx.getStorageSync('addressList') || [];
    console.info("缓存数据：" + arr);
    // 更新数据  
    this.setData({
      addressList: arr
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },
  addAddress: function () {
    wx.navigateTo({ url: '../address/address' });
  },
  /* 删除item */
  delAddress: function (e) {
    this.data.addressList.splice(e.target.id.substring(3), 1);
    // 更新data数据对象  
    if (this.data.addressList.length > 0) {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', this.data.addressList);
    } else {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', []);
    }
  }
})