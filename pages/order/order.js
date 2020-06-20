// pages/file/file.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'LQXBZ-ZSFWG-AGDQ3-IXFEB-ULEOV-QHBH7' 
});  

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl:"",
    userInfo:{},
    hasUserInfo:false,
    openid:"",
    order1:[],//全部
    order2:[],//未接
    order3:[],//已接
    order4:[],//已收货
    nums1: '1',
    nums2: '1',
    nums3: '1',
    active: '0',
    swipeable: 'true',

    id:"",
    address:"",
    name:"",
    order_number:"",
    time:"",
    sorce:"",
    contactMe:"",
    detime:"",
    creater_Latitude:"0",
    creater_Longitude:"0"

  },

  //取消订单
  cancel:function(e){
    console.log(e.currentTarget.dataset.oid+"")
    var that=this


    // //再次确认
    // wx.showModal({
    //   title: '提示',
    //   content: '是否确认取消订单',
    //   success: function (res) {
    //     if (res.confirm) {//确定
    //       console.log('用户点击确定')

          
    //     } else {//取消

    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    // 确认以后应当立刻onload()


    //再次确认
    wx.showModal({
      title: '提示',
      content: '是否确认取消订单',
      success: function (res) {
        if (res.confirm) {//确定
          console.log('确定取消')
          console.log(e.currentTarget.dataset.oid)

          wx.request({
            url: app.globalData.baseurl+'/order/cancel',
            data:{
              id:""+e.currentTarget.dataset.oid,
            },
            method:'POST',
            header:{
              //Authorization:wx.getStorageSync('token')
            },
            success:function(res){



              


              console.log("requset取消成功")
              console.log(res)
              if(res.data.isOk===true){
      
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000,
                })
              }else {
                console.log(wx.getStorageSync('token'))
                wx.showToast({
                  title: '取消失败',
                  duration: 2000
                })
              }
            },
          })

          //积分变动
          // var myDate = new Date();
          // var reward={
          //   rid:"",
          //   date:myDate,
          //   open_Id:this.data.openid,
          //   matter:"兑换礼品",
          //   changed:e.currentTarget.id,
          //   reward:100-10//正确的积分
          // }
          // console.log(reward)
          // //兑换积分变更
          // wx.request({
          //   url: app.globalData.baseurl+'/reward/change',
          //   data:reward
          //   ,
          //   method:'POST',
          //   header:{
          //     Authorization:wx.getStorageSync('token')
          //   },
          //   success:function(res){
          //     console.log(res)
          //   }
          // })

          that.onLoad()
          
        } else {//取消

          console.log('用户点击取消')
        }
      }
    })


    // wx.request({
    //   url: app.globalData.baseurl+'/order/cancel',
    //   data:{
    //     id:""+e.currentTarget.dataset.oid,
    //   },
    //   method:'POST',
    //   header:{
    //     Authorization:wx.getStorageSync('token')
    //   },
    //   success:function(res){
    //     console.log("requset取消成功")
    //     console.log(res)
    //     if(res.data.isOk===true){

    //       wx.showToast({
    //         title: '取消成功',
    //         icon: 'success',
    //         duration: 2000,
    //       })
    //     }else {
    //       wx.showToast({
    //         title: '取消失败',
    //         duration: 2000
    //       })
    //     }
    //   },
    // })
  },


  //确认订单
  confirm:function(e){
    console.log("获取")
    console.log(e)
    var that=this


    var myDate = new Date();
    var sss = Number(e.currentTarget.id);
    console.log("====")
    console.log(app.globalData.greward)
    console.log(app.globalData.greward+sss)
    var reward={
            rid:"",
            date:myDate,
            open_Id:this.data.openid,
            matter:"帮忙",
            changed:sss,
            reward:app.globalData.greward+sss//全局变量
    }
    console.log(reward)

    //再次确认
    wx.showModal({
      title: '提示',
      content: '是否确认订单',
      success: function (res) {
        if (res.confirm) {//确定
          console.log('用户点击确定')

          // //兑换积分变更
          // wx.request({
          //   url: app.globalData.baseurl+'/reward/change',
          //   data:reward
          //   ,
          //   method:'POST',
          //   header:{
          //     Authorization:wx.getStorageSync('token')
          //   },
          //   success:function(res){
          //     console.log(res)
          //   }
          // })


          wx.request({
            url: app.globalData.baseurl+'/order/receive',
            data:{
              id:""+e.currentTarget.dataset.oid,
            },
            method:'POST',
            header:{
              Authorization:wx.getStorageSync('token')
            },
            success:function(res){

              //此时应当添加积分
              /*
              private String open_Id; //用户的id
              private Date date;//时间
              private String matter;//事情
              private int changed;//变化
              private int reward;//剩余积分
              */

             
              var aa = res.data
              console.log("requset确认成功")
              console.log(aa)
              if(aa.isOK == true){
                wx.showToast({
                  title: '确认成功',
                  icon: 'success',
                  duration: 2000,
                })
              }else {
                wx.showToast({
                  title: '确认成功',//iSOK返回nil，需要改
                  duration: 2000
                })
              }
            },
          })

          that.onLoad()
          
        } else {//取消

          console.log('用户点击取消')
        }
      }
    })
    

    
    // wx.request({
    //   url: app.globalData.baseurl+'/order/receive',
    //   data:{
    //     id:""+e.currentTarget.dataset.oid,
    //   },
    //   method:'POST',
    //   header:{
    //     Authorization:wx.getStorageSync('token')
    //   },
    //   success:function(res){
    //     console.log("requset确认成功")
    //     if(res.data.isOk===true){
    //       wx.showToast({
    //         title: '确认成功',
    //         icon: 'success',
    //         duration: 2000,
    //       })
    //     }else {
    //       wx.showToast({
    //         title: '确认失败',
    //         duration: 2000
    //       })
    //     }
    //   },
    // })
  },
  //删除订单
  delete:function(e){
    console.log(e)
    var that=this

  //再次确认
    wx.showModal({
      title: '提示',
      content: '是否确认取消订单',
      success: function (res) {
        if (res.confirm) {//确定
          console.log('用户点击确定')

          wx.request({
            url: app.globalData.baseurl+'/order/delete',
            data:{
              id:""+e.currentTarget.dataset.oid,
            },
            method:'DELETE',
            header:{
              Authorization:wx.getStorageSync('token')
            },
            success:function(res){
              var aa = res.data
              console.log(aa)
              console.log("requset删除成功")
              console.log(aa.isOK)
              if(aa.isOK == true){
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000,
                })
                //console.log(aa.isOK)
              }else {
                wx.showToast({
                  title: '删除失败',
                  duration: 2000
                })
                //console.log(aa.isOK)
              }
            },
          })

          that.onLoad()
          
        } else {//取消

          console.log('用户点击取消')
        }
      }
    })    


    // wx.request({
    //   url: app.globalData.baseurl+'/order/delete',
    //   data:{
    //     id:""+e.currentTarget.dataset.oid,
    //   },
    //   method:'DELETE',
    //   header:{
    //     Authorization:wx.getStorageSync('token')
    //   },
    //   success:function(res){
    //     var aa = res.data
    //     console.log("requset删除成功")
    //     if(aa.isOk===true){
    //       wx.showToast({
    //         title: '删除成功',
    //         icon: 'success',
    //         duration: 2000,
    //       })
    //     }else {
    //       wx.showToast({
    //         title: '删除失败',
    //         duration: 2000
    //       })
    //     }
    //   },
    // })
  },
  //根据id分页查询全部订单信息
  list_status:function(pageIndex){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_status',
      data:{
        id:app.globalData.openid,
        pageIndex:pageIndex,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        console.log(res)
        if(pageIndex==1){
          that.setData({
            order1:res.data  
            
          })
        }
        else{
          that.setData({
            order1:that.data.order1.concat(res.data)       
          })
        }
      },
    })
  },
  // 根据id分页查询全部未接单信息
  list_idstatus2:function(pageIndex){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_idstatus',
      data:{
        id:app.globalData.openid,
        status:0,
        pageIndex:pageIndex,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(pageIndex==1){
          that.setData({
            order2:res.data  
            
          })
        }
        else{
          that.setData({
            order2:that.data2.order.concat(res.data)       
          })
        }
      },
    })
  },
  // 根据id分页查询全部已接单信息
  list_idstatus3:function(pageIndex){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_idstatus',
      data:{
        id:app.globalData.openid,
        status:1,
        pageIndex:pageIndex,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(pageIndex==1){
          that.setData({
            order3:res.data  
            
          })
        }
        else{
          that.setData({
            order3:that.data.order3.concat(res.data)       
          })
        }
      },
    })
  },
  // 根据id分页查询全部已收货信息
  list_idstatus4:function(pageIndex){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/order/list_idstatus',
      data:{
        id:app.globalData.openid,
        status:3,
        pageIndex:pageIndex,
        pageSize:10
      },
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        if(pageIndex==1){
          that.setData({
            order4:res.data  
            
          })
        }
        else{
          that.setData({
            order4:that.data.order4.concat(res.data)       
          })
        }
      },
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    
    this.setData({
      baseurl: app.globalData.baseurl,
      openid:app.globalData.openid
    })

    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {   //本地缓存中已经授权成功
      wx.request({
        url: app.globalData.baseurl + "/me",
        method: "GET",
        success: (res) => {
          that.setData({
            nums1: res.data["nums1"],
            nums2: res.data["nums2"],
            nums3: res.data["nums3"]
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }
    this.list_status(1)
    this.list_idstatus2(1)
    this.list_idstatus3(1)
    this.list_idstatus4(1)

// //=============== 进行赋值 ===================
//     var s = e.target.id;
//     var ss = s.split("#")
//     console.log(ss)
//     this.setData({
//       time:ss[0],
//       sorce:ss[1],
//       order_number:ss[2],
//       creater_Latitude:ss[3],//lat
//       creater_Longitude:ss[4]//long
//     })
//     console.log("====================")
//     console.log(this.data.time)
//     console.log("====================")
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


    //获取积分
    wx.request({
      //app.globalData.openid
      url: app.globalData.baseurl+'/reward/'+app.globalData.openid+'/getlast',
      method:'GET',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
        //
        console.log(res.data)
        console.log("当前积分"+res.data.reward)
        app.globalData.greward=res.data.reward
      }
    })


    this.list_status(1)
    this.list_idstatus2(1)
    this.list_idstatus3(1)
    this.list_idstatus4(1)
    //判断用户是否授权
    wx.getSetting({
      success: (res) => {   //如果已经授权成功
        if (res.authSetting['scope.userInfo']) {
          console.log("in auth")
          var that = this
          //获取用户的信息
          wx.getUserInfo({
            //withCredentials: true,
            //lang: '',
            success: (res) => {
              console.log(res)

              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            },

          })
        } else {
          console.log("donot have user info")
        }
      },

    })

    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {   //授权成功后准备登陆
      wx.request({   //发送请求
        url: app.globalData.baseurl + "/order/list_idstatus"+"?openId="+openid+"&status="+status+"&pageIndex="+pageIndex+"&pageSize"+pageSize,
        method: "GET",   //请求登陆
        success: (res) => {   //登陆成功
          that.setData({
            order:res.data
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }

    if (wx.getStorageSync("hasuserinfo") == true) {   //授权成功后准备登陆
      wx.request({   //发送请求
        url: app.globalData.baseurl + "/order/list_status"+"?openId="+openid+"&pageIndex="+pageIndex+"&pageSize"+pageSize,
        method: "GET",   //请求登陆
        success: (res) => {   //登陆成功
          that.setData({
            order:res.data
          })
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }
    this.list_status(1)
    this.list_idstatus2(1)
    this.list_idstatus3(1)
    this.list_idstatus4(1)


    //=============== 进行赋值 ===================
    var s = e.target.id;
    console.log("++++++++++++++"+s)
    var ss = s.split("#")
    console.log(ss)
    this.setData({
      time:ss[0],
      sorce:ss[1],
      order_number:ss[2],
      creater_Latitude:ss[3],//lat
      creater_Longitude:ss[4],//long
      detime:ss[5],//
      contactMess:[6],//
    })
    console.log(this.data)

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
    this.list(this.data.order1.length/10+1)
    this.list(this.data.order2.length/10+1)
    this.list(this.data.order3.length/10+1)
    this.list(this.data.order4.length/10+1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  wxnavigator:function(e){
    var that = this
    var s = e.target.id;
    var ss = s.split("#")
    console.log(ss)
    this.setData({
      time:ss[0],
      sorce:ss[1],
      order_number:ss[2],
      creater_Latitude:ss[3],//lat
      creater_Longitude:ss[4],//long
      detime:ss[5],//
      contactMess:[6],//
    })
    console.log("====================")
    console.log(this.data.time)
    console.log(s)
    console.log(s)
    console.log("order1")
    console.log(this.data.order1)
    console.log("order2")
    console.log(this.data.order2)
    console.log("order3")
    console.log(this.data.order)
    console.log("====================")


    console.log("====================")
    console.log(this.data.creater_Longitude)
    console.log(this.data.time)
    console.log(this.data.order_number)
    
    console.log("====================")
    var that = this
    qqmapsdk.reverseGeocoder({
       //Object格式
        // location: {
        //   latitude:this.data.creater_Latitude,
        //   longitude: this.data.creater_Longitude
        // },
      
       //String格式
       //location: '39.984060,116.307520',
      location: this.data.creater_Longitude+','+this.data.creater_Latitude,
      get_poi: 0, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
      success: function(res) {//成功后的回调
        console.log(res.result.address+res.result.formatted_addresses.recommend);
        console.log("成功");
        that.setData({
          address:res.result.address+res.result.formatted_addresses.recommend,
        })
        
      },
      fail: function(error) {
        console.error(error);
        console.log("失败");
      },
      complete: function(res) {
        console.log(res);
        console.log("结束");
      }
    })

    //=========================
    console.log("order1")
    console.log(this.data.order1)
    console.log(e)
    console.log(e.target.id)
    var s = e.target.id;
    var ss = s.split("#")
    console.log(ss)
    this.setData({
      time:ss[0],
      sorce:ss[1],
      order_number:ss[2],
      creater_Latitude:ss[3],//lat
      creater_Longitude:ss[4],//long
      detime:ss[5],//
      contactMe:ss[6],//

    })
    console.log(this.data.time)
    wx.navigateTo({
      url: '../orderDetail01/orderDetail01?id='+this.data.id+'&address='+this.data.address+'&name='+this.data.name+'&order_number='+this.data.order_number+'&time='+this.data.time+'&sorce='+this.data.sorce+'&contactMe='+this.data.contactMe+'&detime='+this.data.detime
    })
  }
})
