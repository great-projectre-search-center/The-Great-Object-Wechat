// pages/index-new/index-new.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList: ['京东快递', '韵达快递', '中通快递', '圆通快递', '申通快递', '百世快递', '天天快递'],
    companyIndex: 0,

    deliveryList: ['衣服', '鞋子', '文件', '工具', '食品', '生活用品', '其他'],
    deliveryIndex: 0,


    checked: true



  },
  changeCompany(e) {
    this.setData({ companyIndex: e.detail.value });
  },
  changeDelivery(e) {
    this.setData({ deliveryIndex: e.detail.value });
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
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
    //获取地址ID然后保存到this.data.addressId
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.addresschose) {
        this.setData({  
            //将携带的参数赋值
            addressId: currPage.data.addresschoseId,
            //addressBack: true
      });
    console.log(this.data.addressId, '地址ID')

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
