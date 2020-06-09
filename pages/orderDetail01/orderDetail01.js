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
    id:"",
    address:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var op =  options
    console.log(op.address)
    this.setData({
      
      //name:options.name,
      NameAdress:op.address,
      order_number:op.order_number,
      time:op.time,
      sorce:op.sorce,
      contactMe:op.contactMe,
      detime:op.detime,
    })
    //console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onLoad()
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