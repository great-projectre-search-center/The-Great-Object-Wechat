// pages/order/order.js
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
