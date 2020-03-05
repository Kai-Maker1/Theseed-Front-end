// API/schoolSys/schoolSys.js
// const getData =require("../../data/select-School.js")
import data from '../../data/select-School.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verList: [
      {
        Name: "账号",
        value: "",
        Type: "text",
        Id: "userLogin",
      },
      {
        Name: "密码",
        value: "",
        Type: "password",
        Id: "userNumber",
      }, 

    ],
    School:data,
    selectSchool:"",

    // 学校选择器：
    multiArray: [],
    multiIndex: [0, 0, 0]

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
  

// 学校选择器：
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.resData[e.detail.value[0]].children) {
      this.setData({
        multiIndex: e.detail.value,
        select: this.data.multiArray[0][e.detail.value[0]].name + ' / ' + this.data.multiArray[1][e.detail.value[1]].name,
        selectId: this.data.resData[e.detail.value[0]].flid + ',' + this.data.resData[e.detail.value[1]].flid,
      })
      console.log(this.data.selectId) //这里存放id传送给后台
    } else {
      wx.showToast({
        title: '请选择完整分类',
        icon: 'none',
        duration: 2000
      })
    }

  },
  bindcolumnchange: function (e) {
    //修改第一列 == 0
    if (e.detail.column == 0) {
      //如果子集有数据
      if (this.data.resData[e.detail.value].children) {
        var child = this.data.resData[e.detail.value].children;
        var arrs = []
        child.forEach(function (item) {
          arrs.push({
            name: item.name,
            id: item.flid
          })
        })
        var kk = this.data.multiArray
        kk[1] = arrs
        this.setData({
          multiArray: kk
        })
      } else {
        //如果子集没有数据
        var arrs = []
        arrs.push({
          name: '',
          id: ''
        })
        var kk = this.data.multiArray
        kk[1] = arrs
        this.setData({
          multiArray: kk
        })
      }

    }
  },




})