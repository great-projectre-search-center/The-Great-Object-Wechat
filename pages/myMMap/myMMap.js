//js
var app = getApp();
Page({
  /**
     * 页面的初始数据
     */
  data: {
    //设置标记点
    markers: [
      {
        iconPath: "/images/ljx.png",
        id: 4,
        latitude: 39.933638,//需要去的地点
        longitude: 119.643158,//
        width: 30,
        height: 30
      }
    ],
    //当前定位位置
    latitude: '',
    longitude: '',
  },
  navigate() {
    ////使用微信内置地图查看标记点位置，并进行导航
    wx.openLocation({
      latitude: this.data.markers[0].latitude,//要去的纬度-地址
      longitude: this.data.markers[0].longitude,//要去的经度-地址
    })
  },
  onLoad() {
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  }
})