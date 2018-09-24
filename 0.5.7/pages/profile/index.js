// pages/profile/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus:false,
    userInfo:'',
    phoneInfo:{},
    code:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的信息'
    })
    //如果已经有storage userinfo则是登录成功了，不再登录。
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(typeof(res.data));

        if(res.data.openId){
          that.setData({
            userInfo:res.data,
            loginStatus:true
          })
        }
      }
      
    })
    wx.login({
      success: function (res) {
        console.log(res);
        that.setData({
          code: res.code
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
  
  },
  onGotUserInfo:function(rs){
    console.log(rs)
    let that = this;
 //   that.setData({
  //    userInfo: rs.detail.userInfo
  //  })

    this.setData({
      disabled: true
    })
    that.getEnData(that.data.code, rs.detail, that);
 
  },
  getEnData:function (code, obj, that) {
    console.log(obj)
    wx.request({
      url: 'https://s.aonephy.top/api/miniprogram/aes/',
      data: {
        code: code,
        iv: obj.iv,
        encryptedData: obj.encryptedData
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if(res.statusCode==200){
          //保存登录信息到storage
          wx.setStorage({
            key: 'userInfo',
            data: res.data,
            success: function (rs) {
                that.setData({
                  userInfo:res.data,
                  loginStatus:true
                })
                  console.log('save unionid success.')
            }
          })
        }
      }
    })
  }
})


