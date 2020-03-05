// pages/doc-all-class/doc-all-class.js
//进来更改都是tempstatus
//tempstatus:[父,子,one,two,]
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 信息列表
    arrays:"",
    // 侧边栏
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // newmark 是指移动的最新点的x轴坐标 
    newmark: 0,
    istoright: true,
    // 下滑栏
    leftListMainindex: null,
    leftListindex: null,
    leftList: [],

    // 下拉显示
    topList:[],
    curIndex: [],
    isActive: false,
    jobList: [],
    cur: [{
      title: "手机",
      types: [{
        id: 1,
        title: "正在直播",
      }, {
        id: 2,
        title: "等待直播",
      }]
    },
    {
      title: "手机2",
      types: [{
        id: 1,
        title: "正在直播2",
      }, {
        id: 2,
        title: "等待直播2",
      }]
    },
    ],
    status:[],
    isShow: true,
    status: 0,
    isMask: false,
    isSelect: false,
    // 页面是否到最后
    finall:false,
    //加载
    size: 0,
    page: 0,
    tempPage:0,
    // 完成状态
    finastatus:[],
    // 预备状态
    tempstatus:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showLoadToast();
    //处理接收的值更改临时status page leftArrayList topList等；
    


    if(app._arrayDef =="")
    {app.fetchPost(app._server + "/classify/findAll", null, (err, res) => { console.log(res); app._arrayDef = app.changArrayCourse(res.data); })
    
    this.setData({ leftList:app._arrayDef});}
    else { this.setData({ leftList: app._arrayDef });}

    if (app._arrayDefT == "") {
      app.fetchPost(app._server + "/course/statusTwo", null, (err, res) => { console.log(res); app._arrayDefT = res.data; })

      this.setData({ topList: app._arrayDefT });
    }
    else { this.setData({ topList: app._arrayDefT }); }

    this.setData({
      tempstatus:[0,null,0,0],
    })
    console.log(this.data.leftList)
    this.loadMsg();
    // wx.hideLoading();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this=this;
    if(!_this.data.finall)
    {
      _this.setData({ tempPage: _this.data.page + 1 });
      
      _this.loadMsg();
    }
    
    var tempTstatus ={};
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 点击左上角小图标事件
  tap_ch: function (e) {
    
    if (this.data.open) { 
      this.setData({
        open: false
      });
      this.loadMsg();
    } else {
      this.setData({
        open: true
      });
      
    }
  },
  //侧边栏
  tap_start: function (e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },

  tap_drag: function (e) {
    // touchmove事件
    this.data.newmark = e.touches[0].pageX;

    // 手指从左向右移动
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }

    // 手指从右向左移动
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;
      // 
      this.loadMsg(); 
    }
    this.data.mark = this.data.newmark;
  },

  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    // 通过改变 opne 的值，让主页加上滑动的样式
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  },

  leftbind: function (e) {
    console.log(e)
    
    this.setData({
      leftListMainindex: e.currentTarget.dataset.indexmain,
      leftListindex: e.currentTarget.dataset.index,
    })
    
    console.log(this.data.finastatus )
    var tempstatus = this.data.tempstatus;
    tempstatus[0] = e.currentTarget.dataset.indexmain;
    
    
    console.log(this.data.finastatus)
    tempstatus[1] = e.currentTarget.dataset.index == "null" ? null : e.currentTarget.dataset.index-1 ;

    console.log(this.data.finastatus)
    this.setData({
    
      tempstatus:tempstatus,
    })
    console.log(this.data.finastatus)
    //待写缓存
    console.log("e");
    console.log(this.data.finastatus)
    this.loadMsg();
    
     

  },
  // 侧边栏end

  // 下拉显示
  changeStatus(e) {
    var that = this;
    if (!this.data.isSelect) {
      var curIndex = this.data.curIndex;
      var i = 0;
      while (i < this.data.cur.length) {
        curIndex[i++] = 0
      }
    }



    let status = e.currentTarget.dataset.status;
    // let cur = category;
    this.setData({
      isActive: !this.data.isActive,
      status: status,
      isMask: !this.data.isMask,
      curIndex: curIndex,
      // cur: cur,
    })
  },
  changeStatusUp(e){
    this.setData({
      isActive: !this.data.isActive,
      // status: status,
      isMask: !this.data.isMask,})
    this.loadMsg();

    
  },
  select(e) {
    let curIndex = e.currentTarget.dataset.index;
    this.setData({
      isSelect: " curIndex == this.data.curIndex ? '!this.data.isActive' : 'true' ",
      isActive: false,
      isMask: false,
      curIndex: curIndex,
    })
  },
  multiSelect(e) {
    console.log(e)
    let multiIndex = e.currentTarget.dataset.id;
    let mianIndex = e.currentTarget.dataset.indexmain;
    var curIndex = this.data.curIndex;
    console.log(curIndex)
    curIndex[mianIndex] = multiIndex;
    var tempstatus =this.data.tempstatus;
    tempstatus[2] = mianIndex+1;
    tempstatus[3] = multiIndex+1;

    this.setData({
      isSelect: !this.data.isSelect,
      curIndex: curIndex,
      tempstatus: tempstatus,
    })
  },


  click: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  },

  // 下拉显示end
  //加载数据
  loadMsg:function(e){
    
    
    var _this =this;
    console.log(_this.data.finastatus == _this.data.tempstatus && _this.data.page==_this.data.tempPage)
    // 判断是否变换
    // if (_this.data.finastatus == _this.data.tempstatus && _this.data.page==_this.data.tempPage)
    //     return;
    console.log("请求数据判断1")
    //code变化
    if (_this.data.finastatus != _this.data.tempstatus)
      _this.setData({tempPage:1});

    var data={
      openId :app._openId,
      parentId:  _this.data.leftList[_this.data.tempstatus[0]].courseClassifyId,
      childId: _this.data.tempstatus[1] == null ?0:  _this.data.leftList[_this.data.tempstatus[0]].arrays[_this.data.tempstatus[1]].courseClassifyId,
      statusOne:"全部",
      statusTwo: _this.data.topList[_this.data.tempstatus[3]].status,
      pageNum: _this.data.tempPage,
      pageSize  :10,
    }
    console.log("开始")
  console.log(data)

    app.fetchPost(app._server + "/curriculum/findSome",data,(err,res)=>{
      console.log("asdfas")
      console.log(res)
      
      var oldArrays=_this.data.arrays;
      // 数据加入
      if (_this.data.tempPage=1){_this.setData({arrays:res.data})}
      else { _this.setData({ arrays: oldArrays.push(res.data) })}
      // 更改当前page属性status属性
      console.log("我执行了")
      _this.setData({
        page: _this.data.tempPage, finastatus:_this.data.tempstatus,
      });
      if(res.data.length<_this.data.pageNum)
      _this.setData({finall:true})
      
    })
  }















})

// leftList: [
//   {
//     title: "计算机",
//     lesson: [{
//       id: 1,
//       name: "计算机基础",
//     },
//     {
//       id: 2,
//       name: "计算机",
//     },
//     {
//       id: 3,
//       name: "计算机基础",
//     },
//     {
//       id: 4,
//       name: "计算机基础",
//     },
//     {
//       id: 5,
//       name: "计算机基础",
//     },
//     {
//       id: 6,
//       name: "计算机基础",
//     },
//     ]
//   },
//   {
//     title: "计算机2",
//     lesson: [{
//       id: 1,
//       name: "计算机基础",
//     },
//     {
//       id: 2,
//       name: "计算机基础",
//     },
//     {
//       id: 3,
//       name: "计算机基础",
//     },
//     {
//       id: 4,
//       name: "计算机基础",
//     },
//     {
//       id: 5,
//       name: "计算机基础",
//     },
//     {
//       id: 6,
//       name: "计算机基础",
//     },
//     ]
//   },
// ]