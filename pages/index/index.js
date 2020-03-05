//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerIcon: null,
    doc_class_list: null,
  },
  onLoad: function() {
    var _this = this;
    app.showLoadToast();
    var onAppLoading = setInterval(function(e) {
      if (app._state) {
        clearInterval(onAppLoading)
        console.log(app._openId)
        _this.startJs();
      }
    }, 1000)
    // index.getBannerIcon().then(d => that.setData({ bannerIcon: d }))
    // this.getIndexMes();
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    console.log("running")
    if (this.data.doc_class_list == null || bannerIcon==null)
    {
      console.log("running")
      this.startJs();
    }
      
  },
  startJs: function(e) {
    var _this = this;
    app.fetchPost(app._server + "/banner/getbanner", null, (err, res) => {
        if (err != null) {
        } else {
          _this.setData({
            bannerIcon: res
          })
        }
        console.log(res)
      }),
      app.fetchPost(app._server + "/student/index/commend", {
          openId: app._openId
        },
        (err, res) => {
          if (err != null) {
          } else {
            console.log(res)
            _this.setData({
              doc_class_list: res.data,
            })

           
          }
          console.log(res)
        }),
      wx.hideLoading() //消除加载


      //预加载
    var data = { openId: app._openId };
 
    app.fetchPost(app._server + "/classify/findAll", null, (err, res) => { console.log(res); app._arrayDef=app.changArrayCourse(res.data);})
    app.fetchPost(app._server + "/course/statusTwo", null, (err, res) => { console.log(res); app._arrayDefT = res.data; })
  },
  getIndexMes: function(e) {
   
    wx.request({
      url: 'http://10.2.241.209:2333/curriculum/findSome',
      data: {
        openId: app.globalData.openId,
      },
      header: {
        openId: app.globalData.openId,
        parentId: 1,
        childId: 0,
        statusOne: 1,
        statusTwo: 1,
        pageNum: 1,
        pageSize: 5,
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        
      },
      complete: function(res) {},
    })

  }
})



// doc_class_list: {
//   title: "推荐课程",
//     doc: [{
//       id: "1",
//       h_cover_url: "/images/study/timg.jpg",
//       view_count: 545,
//       title: "电商创业",
//       teacherName: "张绍强",
//       time: "2019/8/2"
//     },

//    

//     ]
// }
//   }