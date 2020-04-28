// pages/AddressSelection/AddressSelection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameAndphone:"李彬"+" "+"176033607032",
    adder:"河北XXXXXXXXXXXXXXX"
  },

  returnAdder:function(e){
    //得到索引，然后返回
    console.log(e)
    //转跳页面把值带过去
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从数据库获取数据然后展示！
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