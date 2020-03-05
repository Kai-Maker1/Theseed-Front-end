const app =getApp();
Page({

  data: {
    show: false,
    studyTimeOnTody:"",
    rankOnToday:"",
    scoreOnToday:"",
  },

  onTab: function () {
    this.setData({
      show: true
    })
  },

  close: function () {
    this.setData({
      show: false,
    })
  },

  touchMove: function () {
  },

  maskTouchMove: function () {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    app.fetchPost(app._server + "/student/studyResult", { openId:"oOygc5JPzgDwoVkiCH0N9r9-lr14"},(err,res)=>{
      this.setData({
        studyTimeOnTody: res.data.studyTimeOnTody,
        rankOnToday: res.data.rankOnToday,
        scoreOnToday: res.data.scoreOnToday,
      })
      wx.hideLoading();
    })
  },

})
