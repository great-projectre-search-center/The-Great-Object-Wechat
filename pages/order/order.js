// pages/file/file.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //imageURL:"../../icons/swiper01.jpg",
    baseurl:"",
    userInfo:{},
    hasUserInfo:false,
    order1:[
      {
        oid:"0",
        title:"去一个快递谢谢",
        catalog:"帮我取",
        creater_Id:"1",
        creater_Name:"2",
        creater_Tel:"3",
        creater_Longitude:"4",
        reward:"+"+"5",
        accepter_id:"000",
      }
    ],
    order2:[
      {
        oid:"0",
        title:"去一个快递谢谢",
        catalog:"帮我取",
        creater_Id:"1",
        creater_Name:"2",
        creater_Tel:"3",
        creater_Longitude:"4",
        reward:"+"+"5",
        accepter_id:"0",
      }
    ],
    order3:[
      {
        oid:"0",
        title:"去一个快递谢谢",
        catalog:"帮我取",
        creater_Id:"1",
        creater_Name:"2",
        creater_Tel:"3",
        creater_Longitude:"4",
        reward:"+"+"5",
        accepter_id:"0",
      }
    ],
    order4:[
      {
        oid:"0",
        title:"去一个快递谢谢",
        catalog:"帮我取",
        creater_Id:"1",
        creater_Name:"2",
        creater_Tel:"3",
        creater_Longitude:"4",
        reward:"+"+"5",
        accepter_id:"0",
      }
    ],
    
    
    nums1: '1',
    nums2: '1',
    nums3: '1',
    active: '0',
    swipeable: 'true'


  },
  //根据id分页查询全部订单信息
  list_status:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_status',
      data:{
        id:app.globalData.openid,
        pageIndex:1,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
          order=order.concat(res.data)
      },
    })
  },
  // 根据订单状态和id分页查询全部订单信息
  list_idstatus:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_idstatus',
      data:{
        id:app.globalData.openid,
        status:1,
        pageIndex:1,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
          order=order.concat(res.data)
      },
    })
  },
  // 修改状态为已接收
  list_idstatus:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_idstatus',
      data:{
        id:app.globalData.openid,
        status:1,
        pageIndex:1,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
          order=order.concat(res.data)
      },
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
