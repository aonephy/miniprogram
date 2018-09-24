// pages/translate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    input:'',
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
  Input: function (e) {
    this.setData({
      input: e.detail.value
    })
  },
  Submit:function(res){
    var am = this.data.input, that = this;
    if (am == '') {
      this.setData({
        focus: true
      })
      wx.showToast({
        title: '输入不能为0',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://s.aonephy.top/api/miniprogram/getAiChat.php?',
        data: {
          info: "快递查询"+that.data.input,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {

          console.log(res.data.data);
          var text = JSON.parse(res.data.data).text;
          that.setData({
            content:text,
          })

        }
      })
    } 
  }
})