import * as echarts from '../../../ec-canvas/echarts';
var chart;

var that
function initChart(canvas, width, height) {
  var CData;

  wx.getStorage({
    key: 'unionId',
    success: function (res) {
      //  console.log(res.data)
      that.setData({
        unionId: res.data
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
            url: 'https://s.aonephy.top/api/miniprogram/getAccountBarData.php',
            data: {
              unionId: that.data.unionId,
              date: that.data.options[that.data.optionIndex]
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              
              CData = res.data;
              //sort the data
              var compary = function (obj1, obj2) {
                return obj1.value > obj2.value ? 1 : -1;
              }
              var tmp = res.data.data
              console.log(tmp)
              tmp.sort(compary)
              
              var name=[],val=[];
              for (var i = 0; i < tmp.length; i++) {
                name.push(tmp[i].name+"     ")
                val.push(tmp[i].value)
              }
              
              that.setData({
                chartData: {name:name,value:val}
              })


              // config chart
              chart = echarts.init(canvas, null, {
                width: width,
                height: height
              });
              canvas.setChart(chart);

              var option = {
                color: ['#37a2da', '#32c5e9', '#67e0e3'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                legend: {
                  data: ['消费统计']
                },
                animation:false,
                grid: {
                  left: 20,
                  right: 20,
                  bottom: 15,
                  top: 40,
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'value',
                    axisLine: {
                      lineStyle: {
                        color: '#999'
                      }
                    },
                    axisLabel: {
                      color: '#666'
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'category',
                    axisTick: { show: false },
                    data: that.data.chartData.name,
                    axisLine: {
                      lineStyle: {
                        color: '#999'
                      }
                    },
                    axisLabel: {
                      color: '#666'
                    }
                  }
                ],
                series: [
                  {
                    name: '消费统计',
                    type: 'bar',
                    label: {
                      normal: {
                        show: true,
                        position: 'inside'
                      }
                    },
                    data: that.data.chartData.value,
                    itemStyle: {
                      // emphasis: {
                      //   color: '#37a2da'
                      // }
                    }
                  }
                ]
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



///////////////////////////////////////////////




Page({

  data: {
    chartData: null,
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
      title: '柱状图'
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
      url: 'bar?index=' + e.detail.value,
    })


  },



});
