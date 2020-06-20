// pages/orderDetail01/orderDetail01.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   * 数据传到这一页
   */
  data: {
    address1:"请重新打开",
    address2:"请重新打开",
    name:"",// 收件人
    tell:"",// 联系方式
    reward:0,// 积分
    oid:"",// 订单号
    time:"",// 时间
    some:""// 详情

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var op =  options
    console.log(op)
    this.setData({
      
      
      name:op.name,// 收件人
      tell:op.tell,// 联系方式
      reward:op.reward,// 积分
      oid:op.oid,// 订单号
      time:op.time,// 时间
      some:op.some,// 详情
      address1:op.address1,
      address2:op.address2,
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