// pages/account/list.js
var curPage;
var rData = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    unionId: null,
    showLoadBtn: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    curPage=1;
    rData = [];

    var that = this;
    wx.setNavigationBarTitle({
      title: '账目表'
    })
    wx.getStorage({
      key: 'unionId',
      success: function (res) {
//        console.log(res.data)
        that.data.unionId = res.data;
        load(that, curPage++);
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
    load(this, curPage++)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadMore:function(){
    
  },
  toHome:function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  add:function () {
    wx.redirectTo({
      url: 'index'
    })
  }
})

function load(that, curPage){

  wx.showLoading({
    title: '加载中',
    icon: 'loading'
  });
  
  
  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/getAccountList.php',
    data: {
      page: curPage
    },
    header: {
      'unionId': that.data.unionId,
    },
    success: function (res) {
      
      if(res.data.code=='10000'){
        for (var i = 0; i < res.data.data.length; i++) {
          rData.push(res.data.data[i])
        }
        that.setData({
          list: rData,
        })
        console.log(that.data.list)
        wx.hideLoading();
      } else if (res.data.code == '10001'){
        wx.showLoading({
          title: 'error',
          icon: 'loading'
        });
      } else if (res.data.code == '10002'){
          that.setData({
            showLoadBtn: 'none'
          })
          wx.hideLoading();
      }

     


    }
  })
}