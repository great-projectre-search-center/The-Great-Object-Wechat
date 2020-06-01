// pages/index-new/index-new.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */ 
    data: {
      arraycompany: ['京东快递', '中通快递', '申通快递', '韵达快递','圆通快递','天天快递','邮政','百世快递'],
      index: 0,
      arrayvalue: ['1-50', '51-100', '101-150', '151-200', '201-300', '301-500', '>500'],
      value: 0,
      date: '2016-09-01',
      time: '12:01',
    
      checked: true,
      phone:'',
      username:''
      
    },
  //选择快递公司的点击事件
  bindDeliveryChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //选择预估价值的点击事件
  bindValueChange: function (e) {
    this.setData({
      value: e.detail.value
    })
  },

  

 

//啰里啰唆取值
  biaotiInput: function (e) {  //输入标题
    this.setData({
      biaoti: e.detail
    })
    console.log(e.detail)
  },
  danhaoInput: function (e) {  //输入单号
    this.setData({
      danhao: e.detail
    })
    console.log(e.detail)
  },
  phoneInput: function (e){  //输入手机号
    this.setData({
      phone:e.detail
    })
    console.log(e.detail)
  },

  beizhuInput: function (e) {  //输入备注
    this.setData({
      beizhu: e.detail
    })
    console.log(e.detail)
  },

  userInput: function (e) {  //输入收件人
    this.setData({
      username: e.detail
    })
    console.log(e.detail)
  },
  gotoAdd: function () {
    wx.showModal({
      title: '注意',
      content: '是否使用已有地址',
      success: function (res) {
        if (res.confirm) {
          //已有地址
          wx.navigateTo({
            url: '../../pages/AddressSelection/AddressSelection'
          })
        } else {
          //选点
          wx.navigateTo({
            url: '../../pages/MapPointSelection/MapPointSelection'
          })
        }
      }
    })
  },
  sub: function (e) {
    console.log("请求")
    wx.request({
      url: 'test.php',
      data: {
        username: 'username',
        phone: 'phone',
        type1:'',
        type2: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
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
      if (currPage.data.addresschoseId) {
          this.setData({  
              //将携带的参数赋值
              addressId: currPage.data.addresschoseId,
              //addressBack: true
        });
        console.log('送达位置 : '+this.data.addressId)
        console.log('代理点位置 : '+this.data.storeAddress)
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
