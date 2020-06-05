// pages/messageDetails/messageDetails.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message:{},
    sendmessage:{},

  },
  ltap: function (e) {
    this.setData({
      value: e.target.dataset.id
    })
  },
  del: function (e) {
    var index = e.target.dataset.id - 1
    var param = {};
    var string = "loop[" + index + "].visible"
    param[string] = 'none';
    this.setData(param);
  },
  /**
   * 获取一条通知
   */
  getnotification:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/notification/'+app.globalData.openid+'/getnotification/'+notificationid,
      data:{
        
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
          that.setData({
            textHead:res.data.title,
            textDetail:res.data.message,
            time:res.data.createTime
          })
      },
    })

    console.log(that.data)
    console.log("===========++++++++++++++++++++++")
    
  },
  /**
   * 发送一条通知
   */
  postnotification:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/notification/'+app.globalData.openid+'/postnotification',
      data:{
        toopenid:message.fromopenid,
        title:this.title,
        msg:message,

      },
      method:'POST',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(res.data.isOk==true){  
        wx.showToast({
            title: '发送成功',
          })
        }
        else{
          wx.showToast({
            title: '发送失败',
          })
        }
      },
    })
  },
  click_blank: function (e) {
    this.setData({
      value: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    //传值
    var textHead=options.textHead
    var fromopenid=options.fromopenid
    var textDetail=options.textDetail
    this.setData({
      baseurl: app.globalData.baseurl
    })

    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {   //本地缓存中已经授权成功
      wx.request({
        url: app.globalData.baseurl + "/me",
        method: "GET",
        success: (res) => {
          that.setData({   //所用的数据逻辑
            // nums1: res.data["nums1"],
            // nums2: res.data["nums2"],
            // nums3: res.data["nums3"]
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }

    
    wx.request({
      url: app.globalData.baseurl+'/notification/'+app.globalData.openid+'/getnotification/'+notificationid,
      data:{
        
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
          that.setData({
            textHead:res.data.title,
            textDetail:res.data.message,
            time:res.data.createTime
          })
      },
    })

    console.log(that.data)
    console.log("===========++++++++++++++++++++++")

  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //判断用户是否授权
    wx.getSetting({
      success: (res) => {   //如果已经授权成功
        if (res.authSetting['scope.userInfo']) {
          console.log("in auth")
          var that = this
          //获取用户的信息
          wx.getUserInfo({
            //withCredentials: true,
            //lang: '',
            success: (res) => {
              console.log(res)

              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            },

          })
        } else {
          console.log("donot have user info")
        }
      },

    })

    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {   //授权成功后准备登陆
      wx.request({   //发送请求
        url: app.globalData.baseurl + "/me",
        method: "GET",   //请求登陆
        success: (res) => {   //登陆成功
          that.setData({
            // nums: res.data["nums"]
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})