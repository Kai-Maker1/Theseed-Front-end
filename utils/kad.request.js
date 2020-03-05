const Promise = require('../lib/es6-promise.min.js').Promise

class Request {
  /**
* 抓取API数据
* @param  {String} url    链接
* @param  {Objece} params 参数
* @return {Promise}       包含抓取任务的Promise
*/
  getApi(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${url}`,
        data: Object.assign({}, params),
        header: { 'Content-Type': 'application/json' },
        success: resolve,
        fail: reject,
        method: GET,
      })
    })
      
  }
  postApi(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${url}`,
        data: data,
        data: Object.assign({}, params),
        header: { 'Content-Type': 'application/json' },
        success: resolve,
        fail: reject,
        method: POST,
      })
    })
  }

}



module.exports = {
  get: Request.getApi,
  post: Request.postApi,
  quest: Request
}


// let obj = { name: '二月', age: { c: 12 } }
// let o1 = Object.assign({}, obj)
// // let o1 = Object.assign({}, obj, { age })
// obj.name = "三月"
// obj.age.c = 14
// console.log(obj, o1)
// Object.assign只会对深层次的c做改变  无论是obj 还是o1 单方面改动都会是另一个o1 obj改变