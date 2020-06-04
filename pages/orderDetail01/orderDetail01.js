// pages/orderDetail01/orderDetail01.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   * 数据传到这一页
   */
  data: {
    NameAdress:"",
    name:"",
    order_number:"",
    time:"",
    sorce:"",
    contactMe:"",
    detime:"",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < 5; i++) { 
      this.onShow()
   }
    console.log(options)
    this.setData({
      
      name:options.name,
      NameAdress:options.address,
      order_number:options.order_number,
      time:options.time,
      sorce:options.sorce,
      contactMe:options.contactMe,
      detime:options.detime,
    })
    console.log(options)
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
    this.onShow()
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