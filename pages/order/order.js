// pages/file/file.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl:"",
    userInfo:{},
    hasUserInfo:false,
    openid:"",
    order1:[],
    order2:[],
    order3:[],
    order4:[],
    nums1: '1',
    nums2: '1',
    nums3: '1',
    active: '0',
    swipeable: 'true'


  },
  //取消订单
  cancel:function(e){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/cancel',
      data:{
        id:""+e.currentTarget.dataset.oid,
      },
      method:'POST',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(res.data.isOk===true){
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000,
          })
        }else {
          wx.showToast({
            title: '取消失败',
            duration: 2000
          })
        }
      },
    })
  },
  //确认订单
  confirm:function(e){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/receive',
      data:{
        id:""+e.currentTarget.dataset.oid,
      },
      method:'POST',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(res.data.isOk===true){
          wx.showToast({
            title: '确认成功',
            icon: 'success',
            duration: 2000,
          })
        }else {
          wx.showToast({
            title: '确认失败',
            duration: 2000
          })
        }
      },
    })
  },
  //删除订单
  delete:function(e){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/delete',
      data:{
        id:""+e.currentTarget.dataset.oid,
      },
      method:'DELETE',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(res.data.isOk===true){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
          })
        }else {
          wx.showToast({
            title: '删除失败',
            duration: 2000
          })
        }
      },
    })
  },
  //根据id分页查询全部订单信息
  list_status:function(pageIndex){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_status',
      data:{
        id:app.globalData.openid,
        pageIndex:pageIndex,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(pageIndex==1){
          that.setData({
            order1:res.data  
            
          })
        }
        else{
          that.setData({
            order1:that.data.order1.concat(res.data)       
          })
        }
      },
    })
  },
  // 根据id分页查询全部未接单信息
  list_idstatus2:function(pageIndex){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_idstatus',
      data:{
        id:app.globalData.openid,
        status:0,
        pageIndex:pageIndex,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(pageIndex==1){
          that.setData({
            order2:res.data  
            
          })
        }
        else{
          that.setData({
            order2:that.data2.order.concat(res.data)       
          })
        }
      },
    })
  },
  // 根据id分页查询全部已接单信息
  list_idstatus3:function(pageIndex){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_idstatus',
      data:{
        id:app.globalData.openid,
        status:1,
        pageIndex:pageIndex,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(pageIndex==1){
          that.setData({
            order3:res.data  
            
          })
        }
        else{
          that.setData({
            order3:that.data.order3.concat(res.data)       
          })
        }
      },
    })
  },
  // 根据id分页查询全部已收货信息
  list_idstatus4:function(pageIndex){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_idstatus',
      data:{
        id:app.globalData.openid,
        status:5,
        pageIndex:pageIndex,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(pageIndex==1){
          that.setData({
            order4:res.data  
            
          })
        }
        else{
          that.setData({
            order4:that.data.order4.concat(res.data)       
          })
        }
      },
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      baseurl: app.globalData.baseurl,
      openid:app.globalData.openid
    })

    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {   //本地缓存中已经授权成功
      wx.request({
        url: app.globalData.baseurl + "/me",
        method: "GET",
        success: (res) => {
          that.setData({
            nums1: res.data["nums1"],
            nums2: res.data["nums2"],
            nums3: res.data["nums3"]
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }
    this.list_status(1)
    this.list_idstatus2(1)
    this.list_idstatus3(1)
    this.list_idstatus4(1)
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
    this.list_status(1)
    this.list_idstatus2(1)
    this.list_idstatus3(1)
    this.list_idstatus4(1)
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
        url: app.globalData.baseurl + "/order/list_idstatus"+"?openId="+openid+"&status="+status+"&pageIndex="+pageIndex+"&pageSize"+pageSize,
        method: "GET",   //请求登陆
        success: (res) => {   //登陆成功
          that.setData({
            order:res.data
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }

    if (wx.getStorageSync("hasuserinfo") == true) {   //授权成功后准备登陆
      wx.request({   //发送请求
        url: app.globalData.baseurl + "/order/list_status"+"?openId="+openid+"&pageIndex="+pageIndex+"&pageSize"+pageSize,
        method: "GET",   //请求登陆
        success: (res) => {   //登陆成功
          that.setData({
            order:res.data
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }
    this.list_status(1)
    this.list_idstatus2(1)
    this.list_idstatus3(1)
    this.list_idstatus4(1)
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
    this.list(this.data.order1.length/10+1)
    this.list(this.data.order2.length/10+1)
    this.list(this.data.order3.length/10+1)
    this.list(this.data.order4.length/10+1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
