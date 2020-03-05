//app.js
import data from "/data/url.js";
const request = require('/utils/kad.request.js')
const api = require("/utils/api.js")
App({

  onLaunch: function() {


    //获取界面高宽
    this.getSysInfo();
    this.appendInfo();
    if (this._openId && this._user)
      _this._state = true;

    this.getUser();

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


  },
  //getUser函数，在index中调用
  getUser: function(update_cb, bind) {
    var _this = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //调用函数获取微信用户信息
          _this.getUserInfo(function(info) {
            _this._user.wx = info.userInfo;
            console.log()
            var _data = {
              code: res.code,
              nickname: info.userInfo.nickName,
              header: info.userInfo.avatarUrl,
              gender: info.userInfo.gender
            }
            //发送code与微信用户信息，获取学生数据
            wx.request({
              method: 'POST',
              url: _this._server + '/wx/auth',
              data: _data,
              header: {
                'Content-Type': 'application/json'
              },
              success: function(res) {
                console.log(res)
                _this._openId = res.data.data;
                _this._state = true;

                if (res.data && res.statusCode >= 200 && res.statusCode < 400) {

                  var status = false;
                  //判断缓存是否有更新
                  if (!_this.cache || _this.cache != res.data.data) {
                    wx.setStorage({
                      key: "cache",
                      data: info.userInfo,
                    });
                    wx.setStorage({
                      key: "openId",
                      data: res.data.data,
                    });
                    status = true;
                    // _this.processData(res.data.data);
                  }
                  // if (!_this._user.is_bind) {
                  //   wx.navigateTo({
                  //     url: '/pages/more/login'
                  //   });
                  // }

                  //如果缓存有更新，则执行回调函数
                  if (status) {
                    // typeof update_cb == "function" && update_cb();

                    _this.appendInfo();
                  }
                } else {
                  //清除缓存
                  if (_this.cache) {
                    wx.removeStorage({
                      key: 'cache'
                    });
                    _this.cache = '';
                  }
                }
              },
              fail: function(res) {
                console.log("fail" + res)
                //清除缓存
                if (_this.cache) {
                  wx.removeStorage({
                    key: 'cache'
                  });
                  _this.cache = '';
                }
              }
            });
          });
        }

      },

    });
  },
  // processData: function (key) {
  //   var _this = this;
  //   var data = JSON.parse(_this.util.base64.decode(key));
  //   _this._user.is_bind = data.is_bind;
  //   _this._user.openid = data.user.openid;
  //   _this._user.teacher = data.user.type == '教职工';
  //   _this._user.we = data.user;
  //   // _this._time = data.time;
  // //  _this._t = data['\x74\x6f\x6b\x65\x6e'];
  //   return data;
  // },
  getUserInfo: function(cb) {
    //获取微信用户信息
    wx.getUserInfo({
      success: function(res) {
        typeof cb == "function" && cb(res);
      },
      fail: function(e) {
        console.log(getCurrentPages())
        var page = getCurrentPages()
        f
        page = page[page.length - 1].route,


          wx.navigateTo({
            url: '/API/getUserInfo/getUserInfo?page=' + page,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
      }
    });
  },
  //完善信息
  appendInfo: function(data) {

    var _this = this;
    // wx.removeStorage({ key: 'cache' });
    // _this._user.we.build = data.build || '';
    // _this._user.we.room = data.room || '';
    wx.getStorage({
      key: 'cache',
      success: function(res) {
        console.log("运行了")
        console.log(res)
        _this._user = res.data;
      },
    })
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        _this._openId = res.data;
      },
    })
  },
  showErrorModal: function(content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function(title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      // duration: duration || 10000
    });
  },


  fetchGet: function(url, callback) {
    api.fetchGet(url, callback)
  },
  fetchPost: function(url, data, callback) {
    api.fetchPost(url, data, callback)
  },



  globalData: {
    userInfo: null,
    sysInfo: {},

  },


  //获取当前系统的显示高宽
  getSysInfo: function(e) {

    wx.getSystemInfo({
      success: res => {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight;
        // 获取可使用窗口高度
        let clientWidth = res.windowWidth;
        // 算出比例
        let ratio = 750 / clientWidth;
        // 算出高度(单位rpx)
        let height = clientHeight * ratio;
        // 设置高度
        this.globalData.sysInfo.height = height;
        this.globalData.sysInfo.width = 750;
      }

    })
  },
  //转换默认表格
  changArrayCourse: function(data) {
    var _this=this;
    var array= [{
      code: "",
      courseClassifyId: "",
      name: "",
      parentName: "",
      sort: "",
      arrays:[{}]
    }
    
    ]
    var i =0;
    for(var num=0;num<data.length;num++)
    {
      //sort  大类交界处c

      if (data[num].sort != i) { i++; data[num]['arrays']=[] ;array.push(data[num]); }
      //sort 子元素添加
      else if (data[num].parentName != ""){array[i].arrays.push(data[num])}
     
    }
    return array.slice(1);
    
  },
  _server: api.host,
  _serverU: 'http://10.2.241.209:2333',
  // 192.168.18.1
  // 10.10.128.205
  _openId: "",
  _user: {
    // //微信数据
    // wx: {},
    // //学生\老师数据
    // we: {}
  },
  _time: {}, //当前学期周数
  _state: false,
  // 默认列表
  _arrayDef: "",
  _arrayDefT:"",
})