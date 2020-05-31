var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  // listAddress: function() {
  //   var that = this
  //   wx.request({
  //     url: app.globalData.baseurl + '/address',
  //     data: {
  //       uid : app.globalData.userInfo
  //     },
  //     method: "GET",
  //     header: {
  //       Authorization: wx.getStorageSync("token")
  //     },
  //     success: function(res) {
  //       that.setData({
  //           addressList:this.data
  //         })
  //       }
  //     })
  // },


  //===========================================
  deleteAddress: function(e) {
    console.log('addressList'+this.data.addressList);
    //删除本地缓存
    //console.log("删除本地地址")
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
    const app = getApp();
    console.log("======地址删除======");
    console.log('aid:'+this.data.addressList[0]);
    console.log(this.data.addressList);
    console.log('uid: '+app.globalData.openid);
    console.log('username: '+this.data.addressList.consignee);
    console.log("======地址删除======");
    //删除后台
    //console.log("删除后台地址")
    var that = this
    wx.request({
      url: "https://xcx.zxcwxy999.xyz/" + '/address/'+this.data.addressList[0]+'/delete',// 暂存疑问 address/{aid}/delete 
      data: {
        aid:this.data.addressList[0],
        uid: app.globalData.openid,
        username:this.data.addressList.consignee
      },
      method: "DELETE",
      header: {
        Authorization: wx.getStorageSync("token"),
        'content-type': 'application/json' // 默认值
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
            title: '删除失败',
            icon: 'fail',
            duration: 2000
          })
        }
      }
  })
},

  //===========================================

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
    console.log("删除一条数据缓存")
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