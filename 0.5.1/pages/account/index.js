// pages/account/index.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    unionId:null,
    option:[],
    optionIndex: 0,
    focus:'false',
    amount:'',
    note:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      wx.setNavigationBarTitle({
        title: '记账'
      })

    this.setData({
      date: util.formatTime2(new Date)
    })

    
    wx.getStorage({
      key: 'unionId',
      success: function (res) {
      //  console.log(res.data)
          that.data.unionId = res.data
          
          //update option
          wx.request({
            url: 'https://s.aonephy.top/api/miniprogram/getAccountTypeList.php',
            data: {
              unionId: that.data.unionId
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              //   console.log(res.data)
              that.setData({
                option: res.data,
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
    console.log(this.data.option)
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
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindOptionChange: function (e) {
    
    this.setData({
      optionIndex: e.detail.value
    })
  },
  InputAmount: function (e) {
    this.setData({
      amount: e.detail.value
    })
  },
  InputNote: function (e) {
    this.setData({
      note: e.detail.value
    })
  },
  toList:function(){
    wx.redirectTo({
      url: 'list'
    })
  },
  submit:function (e) {
    
    var am = this.data.amount, that = this;
    if (am == '') {
      this.setData({
        focus: true
      })
      wx.showToast({
        title: '金额不能为0',
        icon: 'none',
        duration: 2000
      })
    }else{
    
      wx.showLoading({
        title: '数据保存中',
        icon: 'loading'
      });
      wx.request({
        url: 'https://s.aonephy.top/api/miniprogram/account.php',
        data: {
          date: that.data.date,
          aType: that.data.option[that.data.optionIndex],
          amount: that.data.amount,
          note:that.data.note
        },
        method:'POST',
        header: {
          'unionId': that.data.unionId,
          'Content-Type':'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res)
          if(res.data.code=='10000')
            wx.redirectTo({
              url: 'list'
            })

        }
      })
    }
  }
})

