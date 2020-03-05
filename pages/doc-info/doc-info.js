// pages/doc-info/doc-info.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    currentTab: 0,
    tabArray: ["课程介绍", "课程大纲", "评价"],
    tabArrays: ["des","sche","eval"],    
    tabArray1:["课程介绍","课程大纲","评价"],
    tabArrays1: ["des", "sche", "eval"],
    tabArray2: ["公告", "章节", "课件", "考核", "讨论"],
    tabArrays2: ["ann", "scheStu", "dowData", "check", "dis"],
    courMsgAll:{},
    upPageMsg:{},

    isFin:false,
    //  暂存数组：
    tempArray:[],
   
    starNum:4,


    userStar: ['/images/allCou/pingjia_bigstar_sel.png',
      '/images/allCou/pingjia_bigstar_nor.png',],
    userStars: [
      '/images/allCou/pingjia_bigstar_sel.png',
      '/images/allCou/pingjia_bigstar_nor.png',
      '/images/allCou/pingjia_bigstar_nor.png',
      '/images/allCou/pingjia_bigstar_nor.png',
      '/images/allCou/pingjia_bigstar_nor.png'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showLoadToast()
    var _this=this;
    console.log(options.doc_id)
    var temp={
      courseId:options.doc_id,
      status:options.status,
    }
    _this.setData({ upPageMsg: temp})
    
    if (temp.status != 0 && temp.status != null)
    {_this.setData({ tabArray: _this.data.tabArray2, tabArrays: _this.data.tabArrays2})}

    _this.getMes();

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
    that.changMsgArr();
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
    that.changMsgArr();
  },
  //事件处理更换数据
  changMsgArr:function(e){
    var _this =this;
    switch (_this.data.tabArrays[_this.data.currentTab])
    {
      case "des": _this.setData({ tempArray: _this.data.courMsgAll});break;
      case "sche": _this.setData({ tempArray: _this.data.courMsgAll.courseSection }); break;
      case "eval": _this.setData({ tempArray: _this.data.courMsgAll.evaluation }); break;
      case "ann": _this.setData({ tempArray: _this.data.courMsgAll.notices }); break;
      case "scheStu": _this.setData({ tempArray: _this.data.courMsgAll.courseSection }); break;
      case "dowData": _this.setData({ tempArray: _this.data.courMsgAll.courseSection }); break;
      case "check": _this.setData({ tempArray: _this.data.courMsgAll.tests }); break;
   
      case "dis": _this.setData({ tempArray: _this.data.courMsgAll.comments }); break;
    }
  },

  // 星星点击事件
  starTap: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = '/images/全部课程/pingjia_smallstar_sel@2x.png'
      } else { // 其他是空心
        tempUserStars[i] = '/images/全部课程/pingjia_smallstar_nor@2x.png'
      }
    }
    // 重新赋值就可以显示了
    this.setData({
      userStars: tempUserStars
    })
  },

  //渲染获取信息
  getMes:function(e){
    var _this = this;
    var url= app._server + "/curriculum/join/detail";
    
    var data = {
      openId: app._openId,
      courseId: _this.data.upPageMsg.courseId,
      pageNum: 1,
    }
   
    if (_this.data.upPageMsg.status == 0 || _this.data.upPageMsg.status == null) 
    { url = app._server + "/curriculum/detail";
      data = { courseId: _this.data.upPageMsg.courseId,}}
console.log(data)
    app.fetchPost(url, data,(err,res)=>{
      console.log(res)
      _this.setData({courMsgAll:res.data})
      _this.changMsgArr();
      _this.setData({ isFin: true });
    })
    
    
    wx.hideLoading();
  },
  //参与学习
  joinStudy(e){
    
    var _this =this;
    var tupPageMsg=_this.data.upPageMsg;
    tupPageMsg.status=1;
    _this.setData({ upPageMsg: tupPageMsg });

    wx.showModal({
      title: '提示',
      content: '您已参加学习',
    })
    _this.setData({ tabArray: _this.data.tabArray2, tabArrays: _this.data.tabArrays2 })
    app.showLoadToast()
    _this.setData({ isFin: false });
    _this.getMes();

    
    wx.hideLoading();
    
  },
})