import * as echarts from '../../../ec-canvas/echarts';
let chart = null;
const app = getApp();
var that = this;

function initChart(canvas, width, height) {
  
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['10%', '50%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      }],
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

Page({
 
  data: {
    chartData:null,
    ec: {
      onInit: initChart
    },
    unionId:'',
    options: [],
    optionIndex:0,
    showModalStatus: false,
  },
  onLoad:function(){
    var that = this
    wx.setNavigationBarTitle({
      title: '饼图'
    })
    
    wx.getStorage({
      key: 'unionId',
      success: function (res) {
        //  console.log(res.data)
        that.data.unionId = res.data

        //update option
        wx.request({
          url: 'https://s.aonephy.top/api/miniprogram/getAccountBingtuDateOptions.php',
          data: {
            unionId: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
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
            getData(that);
          }
        })
      }
    })

  },
  onReady() {
    var that = this
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  },
  bindOptionChange: function (e) {
    var that = this;
    this.setData({
      optionIndex: e.detail.value
    })
    getData(this)

    
  },



});


function getData(that){
  
  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/getAccountBingtuDate.php',
    data: {
      unionId: that.data.unionId,
      date: that.data.options[that.data.optionIndex]
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
    //  console.log(res.data)
    //  CData = res.data;
      that.setData({
        chartData:res.data,
     //   ec: { onInit: initChart }
      })

    }
  })
}