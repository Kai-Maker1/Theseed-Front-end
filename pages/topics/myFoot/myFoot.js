// pages/topics/myFoot/myFoot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tabArray: [{
      web:"周一",
      jap:"6",
      news:true,
    }, {
        web: "周二",
        jap: "7",
        news: true,
      }, {
        web: "周三",
        jap: "8",
        news: true,
      }, {
        web: "周四",
        jap: "9",
        news: true,
      }, {
        web: "周五",
        jap: "10",
        news: false,
      }, {
        web: "周六",
        jap: "11",
        news: true,
      }, {
        web: "周日",
        jap: "12",
        news: true,
      },],
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

  },
  //事件处理函数 切换
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    var that = this;
    console.log(e.target)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },  
})