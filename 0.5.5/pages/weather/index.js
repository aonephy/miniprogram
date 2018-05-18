//index.js
var curPage = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    items:[],
    inputShowed:'',
    city: '',
    pm25:'',
    rsCity: '',
    rsCity2: '',
    rsCity3: '',
    rsCity4: '',
    rsDate: '',
    rsDate_: '',
    rsDate2: '',
    rsDate3: '',
    rsDate4: '',
    rsImg: '',
    rsImg2: '',
    rsImg3: '',
    rsImg4: '',
    rsWeather: '',
    rsWeather2: '',
    rsWeather3: '',
    rsWeather4: '',
    rsWind: '',
    rsWind2: '',
    rsWind3: '',
    rsWind4: '',
    rsTemperature: '',
    rsTemperature2: '',
    rsTemperature3: '',
    rsTemperature4: '',
    resDisplay: 'none'
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      city: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      city: ""
    });
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
    wx.setNavigationBarTitle({
      title: '天气查询'
    })
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
      //  console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        
        wx.request({
          url: 'https://s.aonephy.top/api/miniprogram/geocoder.php?location=' + latitude + ',' + longitude,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
          //  console.log(res.data.result.addressComponent)
            var loc = res.data.result.addressComponent;
            getRes(that,loc.city)
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
    wx.request({
      url: '/',
      data: {},
      method: 'GET',
      success: function (res) { console.log(res)},
      fail: function (res) { },
      complete: function (res) {
        wx.stopPullDownRefresh();
      }
    })
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
  clickButton: function () {
  
    var city = this.data.city
    if (city == '') city = '深圳';
    this.setData({
      city: city,
    })
    
    getRes(this,city)
  }
})


function getRes(that,city){

  wx.request({
    url: 'https://s.aonephy.top/weather/getweather.php?c=' + city,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res)
      var rs = res.data.results[0].weather_data[0];
      var rs2 = res.data.results[0].weather_data[1];
      var rs3 = res.data.results[0].weather_data[2];
      var rs4 = res.data.results[0].weather_data[3];
      var d1 = rs.date.split('(')[0];
      var d2 = rs.date.split('(')[1].replace('实时：', '').replace(')', '');
        

      that.setData({
        rsCity: res.data.results[0].currentCity,
        pm25: "PM2.5 : "+res.data.results[0].pm25,
        rsDate: d1,
        rsDate_:d2,
        rsDate2: rs2.date,
        rsDate3: rs3.date,
        rsDate4: rs4.date,
        rsImg: rs.dayPictureUrl,
        rsImg2: rs2.dayPictureUrl,
        rsImg3: rs3.dayPictureUrl,
        rsImg4: rs4.dayPictureUrl,
        rsWeather: rs.weather,
        rsWeather2: rs2.weather,
        rsWeather3: rs3.weather,
        rsWeather4: rs4.weather,
        rsWind: rs.wind,
        rsWind2: rs2.wind,
        rsWind3: rs3.wind,
        rsWind4: rs4.wind,
        rsTemperature: rs.temperature,
        rsTemperature2: rs2.temperature,
        rsTemperature3: rs3.temperature,
        rsTemperature4: rs4.temperature,
        resDisplay: 'block',
      })

    }
  })
}