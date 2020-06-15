// pages/allhelp/allhelp.js
var app = getApp();
Page({
  /**
   * 页面的初始数据/
   */
  data: {
    userInfo:"",
    activeName:'0',
    messages:["***帮您寄送了一件快递","###帮您打印了一份材料","您帮&&&送了一份午饭","@@@送您鲜花"],
    index:'0',
    systemmessages:[],
    icons:["manager","manager-o","user-o","contact"],
    num:'0'

    

  },
  getnotification:function(){
    var that=this
    console.log(app.globalData.openid)
    wx.request({
      url: app.globalData.baseurl+'/notification/'+app.globalData.openid+'/getnotification',
      data:{
        
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        console.log('messages')
        console.log(res.data)
          that.setData({
            messages:res.data//
          })
      },
    })
  },
  getsystemnotification:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/notification/'+app.globalData.openid+'/getsystemnotification',
      data:{
        
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        that.setData({
          systemmessages:res.data
        })
          
      },
    })
  },

  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getnotification()
    this.getsystemnotification()
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
    this.getnotification()
    this.getsystemnotification()
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
