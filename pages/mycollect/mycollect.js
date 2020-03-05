// pages/mycollect/mycollect.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgId:"",
    num:20,
    msgArrays:[
      {
        title:"最近学习",
        imgName:"zuijinxuexi.png",
        url:"/student/recentStudy",
        str:"学习",
      },
      {
        title: "下载管理",
        imgName: "download.png",
        uel:"",
        str: "下载",
      },
      {
        title: "我的课程",
        imgName: "wodekecheng.png",
        url:"/student/myCourses",
        str: "",
      },
      {
        title: "我的收藏",
        imgName: "wodeshoucang.png",
        url:"/student/myCollections",
        str: "收藏",
      },
    ],
    arrays:"",
    page:0,
    tempPage:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      msgId:options.id,
    })
    app.showLoadToast();
    app.fetchPost(app._server + this.data.msgArrays[options.id].url, { openId: app._openId, pageNum:1,} ,(err,res)=>{
      this.setData({
        arrays:res.data,
      })
      wx.hideLoading();
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

  }
})