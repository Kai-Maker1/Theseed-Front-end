// pages/topics/topics.js
const app  =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/hswEBEu6EibUagH62rjPNqq8P1gCUXoibOqo27QGVnycQ9etymDRjOGRnMJCQc6KPT2canialNjPxU6OCchtyHRlQ/132",
    },
    _user:"",
    List:[
      {
        Id:1,
        Text:"基本信息",
        Icon:"/images/个人图标/个人资料.png",
        Link:"",
      },
      {
        Id: 2,
        Text: "消息",
        Icon: "/images/个人图标/消息.png",
        Link: "",
      }, {
        Id: 3,
        Text: "发布",
        Icon: "/images/个人图标/发布.png",
        Link: "",
      }, {
        Id: 4,
        Text: "收藏",
        Icon: "/images/个人图标/收藏.png",
        Link: "",
      }, {
        Id: 5,
        Text: "足迹",
        Icon: "/images/个人图标/足迹.png",
        Link: "",
      }, {
        Id: 6,
        Text: "下载",
        Icon: "/images/个人图标/下载.png",
        Link: "",
      }, {
        Id: 7,
        Text: "设置",
        Icon: "/images/个人图标/设置.png",
        Link: "",
      }, {
        Id: 8,
        Text: "寻求帮助",
        Icon: "/images/个人图标/寻求帮助.png",
        Link: "",
      },

    ],
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _user:app._user,
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
  bindShare:function(e){}
})