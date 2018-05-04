App({
  globalData: {
    userInfo: null
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            
            getEnData(code, res, that)

          }
        })

      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

function getEnData(c, obj,that) {
  
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
      that.globalData.userInfo = res.data
        
    }
  })
}
