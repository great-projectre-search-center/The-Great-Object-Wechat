// pages/Exchangeorder/Exchangeorder.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: ['学校', '家', '公司', '其他'],
    addIndex: 0,
  },

  changeadd(e) {
    this.setData({
      addIndex: e.detail.value
    });
  },

  sub: function(e) {
    wx.showModal({
      title: '您的地址我们已经收到！',
      content: '具体快递情况我们会以信息的形式通知您',
      success: function(res) {
        if (res.confirm) {
          //确定要跳转页面
          wx.navigateBack({
            delta: 1
          })
        } else {
          //不确定也要跳转页面,哈哈
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})