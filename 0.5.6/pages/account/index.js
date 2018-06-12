// pages/account/index.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    unionId:null,
    options: [],
    optionIndex: '',
    ss:'',
    focus:false,
    amount:'',
    note:'',
    disabled:false,
    showModalStatus:false,
    textareaShow: 'block'
  },
  open:function(){
   this.setData({
     showModalStatus:true,
     textareaShow:'none'
   })
   console.log(this.data.options)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    });

//页面加载后，默认打开分类选择菜单
    this.setData({
      showModalStatus: true,
      textareaShow: 'none'
    })




    var that = this;
      wx.setNavigationBarTitle({
        title: '记账'
      })

    this.setData({
      date: util.formatTime2(new Date),
  //    optionIndex:options.option
    })

    
    wx.getStorage({
      key: 'unionId',
      success: function (res) {
      //  console.log(res.data)
          that.data.unionId = res.data
          
          //update option
          wx.request({
            url: 'https://s.aonephy.top/api/miniprogram/getAccountTypeList.php',
            data: {
              unionId: res.data
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
//              console.log(res.data)
                var len = res.data.length;
                var tmp = [];
                for(var i=0;i<len;i++){
                  if(i==0) {
                    var checked = true;
                  }else {
                    checked = false;
                  }
                  tmp[i] = { name: res.data[i], value: res.data[i],checked:checked}
                }
              that.setData({
                options: tmp,
                optionIndex: tmp[0].value,//默认选中第一个，因为第一个是最常用的。
                ss:'确定'
              })
              wx.hideLoading();
              //确认类型
          //    setOptions(that, options.option);

            }
          })
      }
    })
    
  },
  radioChange: function (e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    setOptions(that,e.detail.value);
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
  
  },
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindOptionChange: function (e) {
    
    this.setData({
      optionIndex: e.detail.value
    })
  },
  InputAmount: function (e) {
    this.setData({
      amount: e.detail.value
    })
  },
  InputNote: function (e) {
    this.setData({
      note: e.detail.value
    })
  },
  submit:function (e) {
    
    var am = this.data.amount, that = this;
    if (am == '') {
      this.setData({
        focus: true
      })
      wx.showToast({
        title: '金额不能为0',
        icon: 'none',
        duration: 2000
      })
    }else{
    
      wx.showLoading({
        title: '数据保存中',
        icon: 'loading'
      });
      this.setData({
        disabled: true
      })
      wx.request({
        url: 'https://s.aonephy.top/api/miniprogram/account.php',
        data: {
          date: that.data.date,
          aType: that.data.optionIndex,
          amount: that.data.amount,
          note:that.data.note
        },
        method:'POST',
        header: {
          'unionId': that.data.unionId,
          'Content-Type':'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res)
          if(res.data.code=='10000')
            wx.redirectTo({
              url: 'list'
            })

        }
      })
    }
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.sho(currentStatu)
  },
  sho: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            textareaShow: 'block'
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true,
          textareaShow:'none'
        }
      );
    }
  }


})

//
function setOptions(that,option){
  console.log(that)
  var arr = that.data.options;
  console.log(arr) 
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (arr[i].value == option) {
      arr[i].checked = true;
    } else {
      arr[i].checked = false;
    }
  }
  
  that.setData({
    options: arr,
    optionIndex: option
  })
}