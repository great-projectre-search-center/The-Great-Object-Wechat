// pages/messageDetails/messageDetails.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    textHead:"消息标题",
    textDetail:"According to the Hong Kong Stock Exchange latest news, the wireless coverage system vendor Star Communications has announced details of the main board listing prospectus. "
  },
  ltap: function (e) {
    this.setData({
      value: e.target.dataset.id
    })
  },
  del: function (e) {
    var index = e.target.dataset.id - 1
    var param = {};
    var string = "loop[" + index + "].visible"
    param[string] = 'none';
    this.setData(param);
  },
  click_blank: function (e) {
    this.setData({
      value: 0
    })
  }
})