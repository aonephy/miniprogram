// pages/profile/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: { 
      avatarUrl:'../../image/icons/mineHL.png',
      nickName:'昵称',
      city:'城市'
    },
    phoneInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的信息'
    })
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
          //  console.log(res)
            that.setData({
              userInfo: res.userInfo
            })
            getEnData(code,res)

          }
        })
        
      }
    })
   
    wx.getSystemInfo({
      success: function (res) {

        that.setData({
          phoneInfo: {
            model:res.model,
            brand:res.brand,
            language:res.language,
            version:res.version,
            platform:res.platform
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

function getEnData(c,obj){

  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/aes/',
    data:{
      code:c,
      iv:obj.iv,
      encryptedData:obj.encryptedData
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)

    }
  })
}