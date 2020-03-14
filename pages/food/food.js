// pages/index-new1/index-new1.js


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
