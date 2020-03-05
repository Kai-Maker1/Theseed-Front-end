const Api = require('../utils/api.js')
const request = require('../utils/kad.request.js')
const linq = require('../lib/linq.min.js').linq

const URI = 'http://58.87.77.203';

class StudyController{
  /*
  抓取课程列表
   */
  getLessonMes(data) {
    // request.get(`${URI}/banner/getbanner`).then(res => console.log(JSON.stringify(res.data) ))

    return request.post(`${URI}/banner/getbanner`,data).then(res => res.data)
    // return request.get(`${URI}/ad/get?id=iOS.HomeV2.RoundIcon&_rndev=109951`).then(res => res.data)
  }
}