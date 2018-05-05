var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    grids: [],
    toView: 'red',
    scrollTop: 100,
    banner: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            loadBanner(that)
            getEnData(code, res, that)
            
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


function getEnData(c, obj, that) {

  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/aes/',
    data: {
      code: c,
      iv: obj.iv,
      encryptedData: obj.encryptedData
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      that.data.userInfo = res.data
      app.globalData.userInfo = res.data
      wx.setStorage({
        key: 'unionId',
        data: res.data.unionId,
        success: function (res) {
          console.log(res)
          loadgrids(that)
        }
      })
    }
  })
}
function loadBanner(that){
  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/getindexbanner.php',

    success: function (res) {
      console.log(res.data)
      that.setData({
        banner: res.data
      })

    }
  })
}

function loadgrids(that){
  wx.showLoading({
    title: '加载中',
    icon: 'loading'
  });
  var userInfo = that.data.userInfo
 
  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/getindexgrids.php',
    data:{
      unionId:userInfo.unionId
    },
    success: function (res) {
      console.log(res.data)
      that.setData({
        grids: res.data
      })
      wx.hideLoading();
    }
  })
}