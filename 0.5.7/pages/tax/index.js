// pages/tax/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    salary:null,
    insurance: null,
    result: '',
    duty: '',
    unionId: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '个人所得税计算'
    })

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
  salary: function (e) {
    this.setData({
      salary: e.detail.value
    })
  },
  insurance: function (e) {
    this.setData({
      insurance: e.detail.value
    })
  },
  submit: function () {
  //  console.log(this.data.salary)
    let that = this;
    if (this.data.salary == ''||this.data.insurance == '') {
      wx.showToast({
        title: '输入不能为0',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://s.aonephy.top/api/miniprogram//getTax.php',
        data: {
          salary: that.data.salary,
          insurance: that.data.insurance
        },
        method: 'get',
        header: {
          'unionId': that.data.unionId,
          'Content-Type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res)
          let data = res.data.data;

          that.setData({
            result: data.result,
            duty: data.duty
          })

        }
      })
    }
  },
})