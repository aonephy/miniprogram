//index.js
var app = getApp();
var curPage = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    items:[],
    
  },
  cityInput: function (e) {
    this.setData({
      city: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    requestData(this, curPage++)
  /*
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
         // that.userInfo = res.userInfo;
            
            that.setData({
              userInfo: res.userInfo
            })
          }
        })
        
      }
    })
   */
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration:5000
    });
    requestData(this,curPage++)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

var itemList = [];
function requestData(that,pageNum) {
  console.log(pageNum)
  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/getgirlimg.php',
    data:{
      num: pageNum,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      
      var data = res.data.results;
     
      //将获得的各种数据写入itemList，用于setData
    
      
      for (var i = 0; i < data.length; i++)
          itemList.push({ url: data[i].url, desc: "发布者："+data[i].who});
      console.log(itemList)
      that.setData({
        items: itemList,
      });
      wx.hideToast();
    }
  })
}