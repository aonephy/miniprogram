Page({
  data: {
    grids: [],
    toView: 'red',
    scrollTop:100,
    banner: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },
  onLoad:function(){
      var that = this
      wx.request({
        url: 'https://s.aonephy.top/api/miniprogram/getindex.php',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
         //   console.log(res.data)
            that.setData({
              banner: res.data.banner,
              grids: res.data.grids
            })

        }
      })
  }
});