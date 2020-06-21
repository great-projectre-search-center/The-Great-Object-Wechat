// pages/Exchangeorder/Exchangeorder.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: ['学校', '家', '公司', '其他'],
    addIndex: 0,
    name:"",
    phone:"",
    address:""
  },

  changeadd(e) {
    this.setData({
      addIndex: e.detail.value
    });
  },

  userInput: function (e){  //输入手机号
    this.setData({
      name:e.detail
    })
    console.log(e.detail)
  },
  phoneInput: function (e){  //输入手机号
    this.setData({
      phone:e.detail
    })
    console.log(e.detail)
  },
  addressInput: function (e){  //输入手机号
    this.setData({
      address:e.detail
    })
    console.log(e.detail)
  },


  sub: function(e) {
    /**
     * private int rid;
      private String open_Id; //用户的id
      private Date date;//时间
      private String matter;//事情
      private int changed;//变化
      private int reward;//剩余积分
     */



    var that = this
    var myDate = new Date();
    var reward={
      rid:"",
      date:myDate,
      open_Id:this.data.openid,
      matter:"兑换礼品",
      changed:-100,
    }
    console.log(reward)
    //兑换积分变更

    var name = that.data.name
    var phone = that.data.phone
    var address = that.data.address

    if(name==""||phone==""||address==""){

      wx.showToast({
        title: '请补全地址！',
        icon:"none"
      })


    }else{

      wx.request({
        url: app.globalData.baseurl+'/reward/exchange',
        data:reward,
        method:'POST',
        header:{
          Authorization:wx.getStorageSync('token')
        },
        success:function(res){
          var aa = res.data
          console.log(res)
          if(aa.isOK==true){
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
          }
          else{
            wx.showModal({
              title: '兑换失败',
              content: '您的积分不足',
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
          }
        }
      })
  

    }


    
    // wx.request({
    //   url: app.globalData.baseurl+'/reward/exchange',
    //   data:reward,
    //   method:'POST',
    //   header:{
    //     Authorization:wx.getStorageSync('token')
    //   },
    //   success:function(res){
    //     var aa = res.data
    //     console.log(res)
    //     if(aa.isOK==true){
    //       wx.showModal({
    //         title: '您的地址我们已经收到！',
    //         content: '具体快递情况我们会以信息的形式通知您',
    //         success: function(res) {
    //           if (res.confirm) {
    //             //确定要跳转页面
    //             wx.navigateBack({
    //               delta: 1
    //             })
    //           } else {
    //             //不确定也要跳转页面,哈哈
    //             wx.navigateBack({
    //               delta: 1
    //             })
    //           }
    //         }
    //       })
    //     }
    //     else{
    //       wx.showModal({
    //         title: '兑换失败',
    //         content: '您的积分不足',
    //         success: function(res) {
    //           if (res.confirm) {
    //             //确定要跳转页面
    //             wx.navigateBack({
    //               delta: 1
    //             })
    //           } else {
    //             //不确定也要跳转页面,哈哈
    //             wx.navigateBack({
    //               delta: 1
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      openid:app.globalData.openid
    })

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