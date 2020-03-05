import jurl from"../data/url.js"
const request = require('/utils/kad.request.js')
var url=jurl.url;

var getUserImpow =function(e){
  wx.navigateTo({
    url: '/API/getUserInfo/getUserInfo',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
}
//登陆获取openid
var login = function(e){
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId


      wx.request({
        url: "http://www.tjnutheseed.cn/wx/auth",
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          code: res.code,
          userInfo: userInfo,
        },
        success(res) {
          console.log(res.data)
        },
        method: 'POST',
        fail(e) {
          console.error(e)
          callback(e)
        }
      })
    }
  })
}