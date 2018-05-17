// pages/constellation/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:null,
    content:'',
    res:'',
    tab:{
      list: [{
      // tab 项 id
          id: 'day',
          // tab 项展示文案
          title: '今日'
        }, {
          id: 'tomorrow',
          title: '明日'
        }, {
          id: 'week',
          title: '本周'
        }, {
          id: 'month',
          title: '本月'
        }, {
          id: 'year',
          title: '今年'
        }],
      selectedId: 'day',
      }
  },
  handleTabChange(selectedId) {
    // selectId 表示被选中 tab 项的 id
    this.data.tab.selectedId = selectedId.detail
    
    var content = this.data.res[this.data.tab.selectedId];
    console.log(content)
    this.setData({
      content: content
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    wx.request({
      url: 'https://s.aonephy.top/api/miniprogram/getConstellation.php',
      data: {
        star: options.item
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      //  console.log(res.data.data);
        var result = JSON.parse(res.data.data).showapi_res_body;
        var content = result[that.data.tab.selectedId];
        //
        that.setData({
          img: '../../image/constellation/' + res.data.star + '.png',
          content:content,
          res:result
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