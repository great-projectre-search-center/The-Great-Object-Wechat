// pages/otherfood/otherfood.js

import Dialog from '../../miniprogram_npm/vant-weapp/dialog/index';
import Toast from '../../miniprogram_npm/vant-weapp/toast/index'
var app = getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    result1: ['a', 'b', 'c'],
    
  },
  data:{
    result2: ['d', 'e', 'f']
  },
  data:{
    hiddenToast: true
  },
  
  changeContext:function(e){
    console.log(e.detail.value);
  },

  onChange1(event){
    this.setData({
      result1:event.detail
    });
  },
  onChange2(event) {
    this.setData({
      result2: event.detail
    });
  },

  listenerButton: function () {
    this.setData({
      hiddenToast: !this.data.hiddenToast
    })
  },

  toastHidden: function () {
    this.setData({
      hiddenToast: true
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