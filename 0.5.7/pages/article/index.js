// pages/article/index.js
var curPage = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[],
    moreData:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    getArticle(that,curPage++);
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadMore:function(){
    console.log(curPage)
    if(this.data.moreData){
      getArticle(this,curPage++)
    }
  }
})

var rData=[];

function getArticle(that,curPage){
  wx.showLoading({
    title: '加载中',
    icon: 'loading'
  });
  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/getArticleList.php?page=' + curPage,
    
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      
      if (res.data.code == '10000') {
        for(var i=0;i<res.data.data.length;i++){
          rData.push(res.data.data[i]);
        }
        that.setData({
          content: rData,
        })
      } else if (res.data.code == '10002'){
        that.setData({
          moreData: false
        })
      }
      
      wx.hideLoading();
    }
  })
}