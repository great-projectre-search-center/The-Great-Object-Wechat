// pages/index-new1/index-new1.js

var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      // 普通选择器列表设置,及初始化
      checkboxitems: [
        { value: '汉堡' },
        { value: '炸鸡' },
        { value: '米线' },
        { value: '饺子馄饨' },
        { value: '盖饭' },
        { value: '炒饭' },
      ],


      show: false,
      //address:'',//选中的地区
      address_code: '',//选中的地区编号


      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区',
          // ....
        },
      }
      // date:{
      //   currentDate:'08:00',
      //   filter(type,options){
      //     if(type==='minute'){
      //       return options.filter(option =>option % 5 ===0)
      //     }
      //     return options;
      //   }
      // },


    },

    checkboxChange(e){
      console.log(e.detail.value)
    },



  showPopup() {   //展示选择框
    this.setData({ show: true });


  },

  onCancel() {  //取消时，关闭选择框
    this.setData({ show: false });
  },



  onChange(picker) {   //改变选择      

    let val = picker.getValues();
    this.message = val;
    console.log(picker.val);
  },

  onConfirm(val) {  //点击确定时，将选项赋值到input框
    this.setData({ show: false });
    //传值(待改正)
    // this.address = val[0].name + "-" + val[1].name + "-" + val[2].name;
    // this.address_code = val[2].code;
  },


    // onInput(event){
    //   this.setDate({
    //     currentDate:event.detail
    //   });
    // },

    
    

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
