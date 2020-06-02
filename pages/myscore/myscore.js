// pages/myscore/myscore.js

//载入页面调用函数更新显示内容！！！！
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    soc:"",  //获取当前积分
    details:"",
    openid:"",
    baseurl:"",

  },
  getlast:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/reward/'+app.globalData.openid+'/getlast',
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
          that.setData({
            soc:res.data.reward
          })
      }
    })
  },
  geshihua:function(data){
    alert(data)
      str=data.toString()
      alert(str)
      sstr=str.split("-")
      alert(sstr)
      ans=sstr[0]+"年"+sstr[1]+"月"+sstr[2]+"日"
      alert(ans)
      return ans
  },
  getDetails:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/reward/'+app.globalData.openid+'/getdetails',
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
          that.setData({
            details:res.data
          })
      }
    })
  },
  change:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/reward/change',
      data:{
        openId:app.globalData.openid,
        matter:"",
        changed:"",
        reward:this.data.soc-changed,
      },
      method:'POST',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(res.data.isOk){
          wx.showToast({
            title: '兑换成功',
            icon: 'success',
            duration: 2000,
          })
        }else if(res.data.isOk!==true){
          wx.showToast({
            title: '兑换失败',
            duration: 2000
          })
        }
      }
    })
  },

  lumpadder:function(){
    wx.navigateTo({
      url: '../Exchangeorder/Exchangeorder',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlast()
    this.getDetails()
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
    this.getlast()
    this.getDetails()
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