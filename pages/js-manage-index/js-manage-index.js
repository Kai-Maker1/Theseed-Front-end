// pages/js-manage-index/js-manage-index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrays:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.fetchPost(app._server + "/tm/lastInfo", { pageNum: 1 }, (err, res) => { console.log(res); 
    this.setData({ arrays:res.data})
    })
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
  navBind(e){
    console.log(e);
    var temp = this.data.arrays[e.currentTarget.dataset.id];

    // var temp =JSON.stringify(temp)

    wx.navigateTo({
      url: "/pages/js-news/js-news?item=" + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})