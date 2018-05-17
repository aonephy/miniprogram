import * as echarts from '../../../ec-canvas/echarts';
var chart;

var that
function initChart(canvas, width, height) {
 
  wx.getStorage({
    key: 'unionId',
    success: function (res) {
      //  console.log(res.data)
      that.setData({
        unionId: res.data
      })
      wx.request({
        url: 'https://s.aonephy.top/api/miniprogram/getAccountLineDataOptions.php',
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
            url: 'https://s.aonephy.top/api/miniprogram/getAccountLineData.php',
            data: {
              unionId: that.data.unionId,
              goods: that.data.options[that.data.optionIndex]
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
            //  console.log(res.data)
              that.setData({
                chartData: res.data
              })
            
              chart = echarts.init(canvas, null, {
                width: width,
                height: height
              });
              canvas.setChart(chart);

              var option = {
                backgroundColor: "#fff",
                color: res.data.color,
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  data: [res.data.goods]
                },
                grid: {
                  containLabel: true
                },

                xAxis: {
                  name: '月',
                  type: 'category',
                  offset :'',
                  boundaryGap: false,
                  data: res.data.data.month
                },
                yAxis: {
                  name:'金额',
                  x: 'center',
                  type: 'value'
                },
                series: [{
                  name: res.data.goods,
                  type: 'line',
                  smooth: true,
                  data: res.data.data.amount
                }]
              };
              
              chart.setOption(option);

              that.setData({
                avarage: avarage()
              })

              return chart;
            }
          })
        }
      })


    }
  })


}

function avarage(){
  var arr = that.data.chartData.data.amount,avar,sum=0;
  for(var i=0;i<arr.length;i++){
    sum += parseFloat(arr[i]);
  }
  avar = (sum/arr.length).toFixed(2);
  return '￥ '+avar
}

Page({

  data: {
    chartData: null,
    avarage:'',
    ec: {
      onInit: initChart
    },
    unionId: '',
    options: [],
    optionIndex: 0,
  },
  onLoad: function (options) {
    that = this;
    wx.setNavigationBarTitle({
      title: '曲线图'
    })
    this.setData({
      optionIndex: options.index
    })

  },
  onReady() {
    var that = this
    setTimeout(function () {
      // 获取 chart 实例的方式
     //   console.log(chart)
    }, 2000);
  },
  bindOptionChange: function (e) {
    var that = this;
    this.setData({
      optionIndex: e.detail.value
    })
    wx.redirectTo({
      url: 'quxiantu?index=' + e.detail.value,
    })


  },



});
