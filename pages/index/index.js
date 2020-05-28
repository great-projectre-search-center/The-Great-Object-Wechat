// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    keys:"",
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true, 
    list_orders:[],
    imageList: [
      {
        url_item:"../delivery/delivery",
        src_item:"../../icons/kuaididaiqu.png",
      },
      {
        url_item:"../food/food",
        src_item: "../../icons/shiwudaigou.png"
      },
      {
        url_item: "../file/file",
        src_item: "../../icons/wenjiandaiban.png"
      },
      {
        url_item: "../allhelp/allhelp",
        src_item: "../../icons/wumangbubang.png"
      }
    ]
    
  },
  /*
    列出所有未接收订单
  */
 list:function(){
  var that=this
  wx.request({
    url: app.globalData.baseurl+'/order/list_status0',
    data:{
      pageIndex:0,
      pageSize:10
    },
    method:'GET',
    header:{
      Authorization:wx.getStorageSync('token')
    },
    success:function(res){
      that.setData({
        list_orders:res.data
      })
    },
  })
 },
  /*
    接收订单
  */
  accept:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/accept',
      data:{
        orderId:0,
        accepterId:userInfo.orderId
      },
      method:'POST',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(res.data.isOk==true){
          wx.showToast({
            title: '接单成功',
            icon: 'success',
            duration: 2000,
          })
        }else {
          wx.showToast({
            title: '接单失败',
            duration: 2000
          })
        }
      },
    })
  },

  //点击弹出框
  onChange(event){  
    wx.showToast({
      title: 'title', //待后期改名
      icon:'none'
    })
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
          that.setData({
            order: res.data["order"],
            willfinish: res.data["willfinish"],
            finished: res.data["finished"],
            cancel: res.data["cancel"]
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }
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
            order: res.data["order"],
            willfinish: res.data["willfinish"],
            finished: res.data["finished"],
            cancel: res.data["cancel"]
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

  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    //获取用户信息，标记用户信息获取成功 true
    var that = this
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    wx.request({
      url: app.globalData.baseurl + "/auth/uploadWxUserinfo",
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        userinfo: e.detail.userInfo
      },
      success: (e) => {
        wx.setStorageSync("hasuserinfo", true)
      }
    })
  }
})
