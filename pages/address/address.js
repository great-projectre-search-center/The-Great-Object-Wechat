var app = getApp();
var area = require('../../utils/area.js');
var areaInfo = []; //所有省市区县数据
var provinces = []; //省
var provinceNames = []; //省名称
var citys = []; //城市
var cityNames = []; //城市名称
var countys = []; //区县
var countyNames = []; //区县名称
var value = [0, 0, 0]; //数据位置下标
var addressList = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transportValues: ["收货时间不限", "周六日/节假日收货", "周一至周五收货"],
    transportIndex: 0,
    provinceIndex: 0, //省份
    cityIndex: 0, //城市
    countyIndex: 0, //区县
  },
  addNew:function(){
    var that=this
    wx.request({
      url: app.globalData.baseurl+'/address/addNew',
      data:{
        address:[],
        uid:[],
        usernmae:[],
      },
      method:'POST',
      header:{
        Authorization:wx.getStorageSync('token')
      },
      success:function(res){
          if(res.data.isOk==true){
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000,
            })
          }else {
            wx.showToast({
              title: '添加失败',
              duration: 2000
            })
          }
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    area.getAreaInfo(function (arr) {
      areaInfo = arr;
      //获取省份数据
      that.getProvinceData();
    });
  },
  // 获取省份数据
  getProvinceData: function () {
    var that = this;
    var s;
    provinces = [];
    provinceNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      s = areaInfo[i];
      if (s.di == "00" && s.xian == "00") {
        provinces[num] = s;
        provinceNames[num] = s.name;
        num++;
      }
    }
    that.setData({
      provinceNames: provinceNames
    })

    that.getCityArr();
    that.getCountyInfo();
  },

  // 获取城市数据
  getCityArr: function (count = 0) {
    var c;
    citys = [];
    cityNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
        citys[num] = c;
        cityNames[num] = c.name;
        num++;
      }
    }
    if (citys.length == 0) {
      citys[0] = {
        name: ''
      };
      cityNames[0] = {
        name: ''
      };
    }
    var that = this;
    that.setData({
      citys: citys,
      cityNames: cityNames
    })
    console.log('cityNames:' + cityNames);
    that.getCountyInfo(count, 0);
  },

  // 获取区县数据
  getCountyInfo: function (column0 = 0, column1 = 0) {
    var c;
    countys = [];
    countyNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
        countys[num] = c;
        countyNames[num] = c.name;
        num++;
      }
    }
    if (countys.length == 0) {
      countys[0] = {
        name: ''
      };
      countyNames[0] = {
        name: ''
      };
    }
    console.log('countyNames:' + countyNames);
    var that = this;
    // value = [column0, column1, 0];

    that.setData({
      countys: countys,
      countyNames: countyNames,
      // value: value,
    })
  },

  bindTransportDayChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      transportIndex: e.detail.value
    })
  },

  bindProvinceNameChange: function (e) {
    var that = this;
    console.log('picker province 发生选择改变，携带值为', e.detail.value);
    var val = e.detail.value
    that.getCityArr(val); //获取地级市数据
    that.getCountyInfo(val, 0); //获取区县数据

    value = [val, 0, 0];
    this.setData({
      provinceIndex: e.detail.value,
      cityIndex: 0,
      countyIndex: 0,
      value: value
    })

  },

  bindCityNameChange: function (e) {
    var that = this;
    console.log('picker city 发生选择改变，携带值为', e.detail.value);

    var val = e.detail.value
    that.getCountyInfo(value[0], val); //获取区县数据
    value = [value[0], val, 0];
    this.setData({
      cityIndex: e.detail.value,
      countyIndex: 0,
      value: value
    })
  },

  bindCountyNameChange: function (e) {
    var that = this;
    console.log('picker county 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countyIndex: e.detail.value
    })
  },


  
  /*提交  submit*/
  saveAddress: function (e) {

    console.log("e" + e.detail)
    var consignee = e.detail.value.consignee;
    var mobile = e.detail.value.mobile;
    var transportDay = e.detail.value.transportDay;
    var provinceName = e.detail.value.provinceName;
    var cityName = e.detail.value.cityName;
    var countyName = e.detail.value.countyName;
    var address = e.detail.value.address;
    var aid = Math.round(Math.random()*100);

    console.log(transportDay + "," + provinceName + "," + cityName + "," + countyName + "," + address); //输出该文本 
    

    //===========================

    const app = getApp();
    console.log("======地址新增======");
    console.log('address: '+provinceName+'|'+cityName + '|' + countyName + '|' + address+'|'+mobile);
    console.log('uid: '+app.globalData.openid);
    console.log('username: '+consignee);
    console.log("======地址新增======");

    //添加地址
    wx.request({
      url: app.globalData.baseurl+'/address/addNew', 
      method:'POST',
      data: {
        aid:aid,
        uid:app.globalData.openid,
        username:consignee,
        name:consignee,
        phone:mobile,
        province_Name:provinceName,
        city_Name:cityName,
        area_Name:countyName,
        address:address
      },
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
    
    //===========================

    //跨页面传值！！！
    var arr = wx.getStorageSync('addressList') || [];
    console.log("arr,{}", arr);
    addressList = {
      consignee: consignee,
      mobile: mobile,
      address: provinceName + cityName + countyName + address,
      transportDay: transportDay,
      aid:aid
    }
    arr.push(addressList);
    wx.setStorageSync('addressList', arr);
    
    wx.navigateBack({

    })
  }
})