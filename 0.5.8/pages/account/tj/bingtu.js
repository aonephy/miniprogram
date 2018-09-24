import * as echarts from '../../../ec-canvas/echarts';
var chart;

var that
function initChart(canvas, width, height) {
  var CData;
  
  wx.getStorage({
    key: 'userInfo',
    success: function (res) {
      //  console.log(res.data)
      that.setData({
        unionId: res.data.unionId
      })
      wx.request({
        url: 'https://s.aonephy.top/api/miniprogram/getAccountPieDataOptions.php',
        data: {
          unionId: that.data.unionId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {

          var len = res.data.length;
          var tmp = [];
          for (var i = 0; i < len; i++) {
            if (i == 0) {
              var checked = true
            } else {
              checked = false;
            }
            tmp[i] = { name: res.data[i], value: res.data[i], checked: checked }
          }
          that.setData({
            options: res.data
          })
          
          wx.request({
            url: 'https://s.aonephy.top/api/miniprogram/getAccountPieData.php',
            data: {
              unionId: that.data.unionId,
              date: that.data.options[that.data.optionIndex]
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              CData = res.data;
              chart = echarts.init(canvas, null, {
                width: width,
                height: height
              });
              canvas.setChart(chart);

              var option = {
                backgroundColor: "#ffffff",
                color: CData.color,
                series: [{
                  label: {
                    normal: {
                      fontSize: 14
                    }
                  },
                  type: 'pie',
                  center: ['50%', '50%'],
                  radius: ['10%', '50%'],
                  data: CData.data,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 2, 2, 0.3)'
                    }
                  }
                }]
              };
              chart.setOption(option);
              return chart;
            }
          })
        }
      })
      
      
    }
  })






 




  
  
}

Page({
 
  data: {
    chartData:null,
    ec: {
      onInit: initChart
    },
    unionId:'',
    options: [],
    optionIndex:0,
  },
  onLoad:function(options){
    that = this;
    wx.setNavigationBarTitle({
      title: '饼图'
    })
    this.setData({
      optionIndex: options.index
    })
    console.log(options)
  

  },
  onReady() {
    var that = this
    setTimeout(function () {
      // 获取 chart 实例的方式
    //  console.log(chart)
    }, 2000);
  },
  bindOptionChange: function (e) {
    var that = this;
    this.setData({
      optionIndex: e.detail.value
    })
    wx.redirectTo({
      url: 'bingtu?index='+e.detail.value,
    })

    
  },



});
