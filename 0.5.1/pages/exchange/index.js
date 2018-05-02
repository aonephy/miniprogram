// pages/exchange/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryList:[],
    fromC:'',
    fromCode:'',
    toCode: '',
    toC:'',
    amount:'100',
    focus:'false',
    curRate:'',
    resMoney:'',
    time:''
  },
  Input: function (e) {
    this.setData({
      amount: e.detail.value
    })
  },
  Submit:function(e){
    console.log()
    var am = this.data.amount,that=this;
    if(am==''){
      this.setData({
        focus:true
      })
      wx.showToast({
        title: '金额不能为0',
        icon: 'none',
        duration: 2000
      })
    }else{

      wx.request({
        url: 'https://s.aonephy.top/api/exchange-result.php',
        data:{
          fg: that.data.countryList[0][that.data.fromCode],
          tg: that.data.countryList[0][that.data.toCode],
          liang:that.data.amount
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          
          var data = JSON.parse(res.data.data).showapi_res_body;
          
            that.setData({
              curRate:data.money/that.data.amount,
              resMoney:data.money,
              time:res.data.time
            })

        }
      })

    }
  },
  bindFromChange:function(e){
    this.setData({
      fromC: this.data.countryList[1][e.detail.value],
      fromCode: e.detail.value
    })
    console.log(this.data.amount)
  },
  bindToChange: function (e) {
    this.setData({
      toC: this.data.countryList[1][e.detail.value],
      toCode: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '汇率查询'
    })
    var that = this
    wx.request({
      url: 'https://s.aonephy.top/api/miniprogram/getExchangeCountryList.php',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      //  console.log(res.data)
        that.setData({
          countryList: res.data,
          fromC: res.data[1][5],
          fromCode: 5,
          toC: res.data[1][0],
          toCode: 0,
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