Page({
  data: {
  currentSelectTripType: 'pinche',
  },
  // 更新data 切换选中状态
  selectedPinche: function (e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selectedBaoche: function (e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
})