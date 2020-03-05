// pages/js-card/js-card.js


var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var Time = require("../../utils/util.js");
var app= getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelhide:true,
    address:"",

    isCardStutus:"",

    modelMsg:"打卡成功！",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showLoadToast();
    var _this =this;
    qqmapsdk = new QQMapWX({
      key: '6L5BZ-ADKCV-SPNPV-U62P2-TT6I5-PQBEZ'
    });
    this.getAddress();
    wx.getStorage({
      key: 'lastTime',
      success: function(res) {
     
        if (res.data == Time.getMonth(new Date)) { _this.setData({ isCardStutus:"今日已打卡"})}
        else { _this.setData({ isCardStutus:"点击打卡" })}
      },
      fail:function(err){
        _this.setData({ isCardStutus:"点击打卡"})
      }
    })
    wx.hideLoading();
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
  bindRec:function(e){},
  btnChang:function(e){
    this.setData({
      modelhide:!this.data.modelhide,
    })
    
  },
  // 获取当前位置
  getAddress:function(e){
    var _this =this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            _this.setData({
              address:address,
            })
          },
          fail: function(err){
            console.log(err)
          }
        })
      }
    })
    
  },
  upLoad:function(e){

    var time = Time.getMonth(new Date);
    console.log(time)
    if (this.data.isCardStutus=="点击打卡")
    {
      wx.setStorage({
        key: 'lastTime',
        data: time,
      })
      this.setData({
        isCardStutus:"今日已打卡"
      })
      this.btnChang();
    }

    app.fetchPost(app._server + "/tm/createAttend", { openId: app._openId, courseId: "csp001", createTime: Time.formatTime, place: this.data.address, }, (err, res) => {
      console.log
    })
    
    
  }

})