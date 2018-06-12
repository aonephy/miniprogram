// pages/account/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unionId: null,
    options:'',
    optionIndex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '新增账目'
    })
    //load option
    wx.getStorage({
      key: 'unionId',
      success: function (res) {
        //  console.log(res.data)
        that.data.unionId = res.data

        //update option
        wx.request({
          url: 'https://s.aonephy.top/api/miniprogram/getAccountTypeList.php',
          data: {
            unionId: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
        //  console.log(res.data)
            var len = res.data.length;
            var tmp = [];
            for (var i = 0; i < len; i++) {
              tmp[i] = { name: res.data[i], value: res.data[i] }
            }
            that.setData({
              options: tmp,
              optionIndex: tmp[0].value
            })

          }
        })
      }
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
  
  }
})