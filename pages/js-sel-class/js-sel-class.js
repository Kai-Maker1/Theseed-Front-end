// pages/js-sel-class/js-sel-class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:[
      "教学楼","劝学楼","A"
    ],
    arrays:[
      ['教学楼', '图书馆',], ['博理楼', '劝学楼', '兴文楼', ], ['A', 'B', 'C', 'D'],
    ],
    cartArr:[
      "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
    ],
    selArrays:[],
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
  checkboxChange:function(e){
    console.log(e.detail.value)
    this.setData({
      selArrays:e.detail.value,
    })
    // e.currentTarget.dataset.id
    // console.log(this.data.arrays[e.currentTarget.dataset.id - 1])
    

    // this.setData({
    //   array: this.data.arrays[e.currentTarget.dataset.id-1]
    // })
  },
  bindPickerChange(e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var temp=this.data.top;
    temp[e.target.id] = this.data.arrays[e.target.id][e.detail.value]
    this.setData({
      top: temp
    })
  },
  sureSel:function(e){
    // 发送selArrays;
    wx.navigateTo({
      url: '/pages/js-sel-class-s/js-sel-class-s',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})