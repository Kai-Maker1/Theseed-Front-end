 const app =getApp();
Page({

  data: {
    show: false,
    _user:"",
    userData: null,
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
    var _this =this;
    _this.setData({
      _user: app._user,
    })

    // 获取本地存储
    _this.getStor();
    
  },

  bindFrom:function(e){
    var _this =this;
    console.log("正在使用")
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '修改成功',
    })

    var userT={
      userName: e.detail.value.userName,
      userClass:e.detail.value.userClass,
      userMajor:e.detail.value.userMajor,
      userSchool:e.detail.value.userSchool,
      userSex:e.detail.value.userSex,
    };
    console.log(userT)
    this.setData({
      userData: userT,
    })
    _this.setStor(userT);
    
  },
  //设置存储
  setStor:function(e){
    wx.setStorage({
      key: 'userMsg',
      data: e,
    })
  },
  //获取存储
  getStor: function (e) {
    wx.getStorage({
      key: 'userMsg',
     
      success:res=>{
        this.setData({
          userData:res.data,
        })
      }
    })
  },
})
