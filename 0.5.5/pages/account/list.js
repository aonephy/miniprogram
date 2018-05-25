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
    showLoadBtn: 'none',
    showModalStatus:false,
    filterYear:[],
    filterMonth:[],
    filterGoods: [],
    filterYearRs: [],
    filterMonthRs: [],
    filterGoodsRs: [],
    selectAllYear: true,
    selectAllMonth: true,
    selectAllGoods: true,
    noscroll:''
  },

  open: function () {
    this.setData({
      showModalStatus: true,
      noscroll: 'noscroll'
    })
    
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
        var tmp = loadFilteOptions(that);
       
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
  add:function () {
    wx.redirectTo({
      url: 'index'
    })
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
            noscroll: ''
            
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true,
          noscroll: 'noscroll'
        }
      );
    }
    rData = []
    this.setData({
      list:[]
    })
    curPage = 1;
    
    load(this, curPage++)

  },
  selectAll:  function(e){
    
    var id = e.target.id.replace('selectAll','')
    console.log(id);
    var tmp = this.data['filter'+id],Rs=[];
    if(e.detail.value[0]==1){
      var status = true;
      for (var i = 0; i < this.data['filter' +id].length;i++){
        tmp[i].checked = true;
        Rs[i] = tmp[i].value;
      }
    }else{
      var status = false;
      for (var i = 0; i < this.data['filter' +id].length; i++) {
        tmp[i].checked=false;
        Rs=[];
      }
      
    }
    var param = {};
    var string = id;
    param['filter' + string] = tmp;
    param['filter' + string+'Rs'] = Rs;
    param['selectAll' + string] = status;
    this.setData(param);

  },
  checkboxChange: function (e) {
 //   console.log('checkbox发生change事件，携带value值为：', e)
    var selectRs = e.detail.value;
    var tmpRs = e.target.id;
    var tmp = tmpRs.replace('Rs','');
    var id = tmp.replace('filter','');
    console.log(tmp)
    var param = {};
    var string = tmpRs;
    param[string] = e.detail.value;
    this.setData(param);
    
    ///////////////////////
    var param = {};
    var string = 'selectAll' + id;

    if (this.data[tmp].length > this.data[tmpRs].length){
      param[string] = false;
    }else{
      param[string] = true;
    }
    
    this.setData(param);
    //////////////////////////////////
    
    var tmpArray = this.data[tmp];
    
    for (var i = 0; i < tmpArray.length;i++){
      var val = tmpArray[i].value
      var tt = selectRs.indexOf(val);
      
      if(tt<0){
        tmpArray[i].checked=false;
      }else{
        tmpArray[i].checked = true;
      }


    }
    
    var param = {};
    var string = tmp;
    param[string] = tmpArray;
    this.setData(param);

  }






})

function load(that, curPage){
  console.log(curPage)
  wx.showLoading({
    title: '加载中',
    icon: 'loading'
  });
  
  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/getAccountList-.php',
    method:'GET',
    header: {
      'unionId': that.data.unionId,
    },
    data: {
      page: curPage,
      filterYearRs: that.data.filterYearRs,
      filterMonthRs: that.data.filterMonthRs,
      filterGoodsRs: that.data.filterGoodsRs
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
          //  console.log(that.data.list)
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


function loadFilteOptions(that){

  wx.request({
    url: 'https://s.aonephy.top/api/miniprogram/getFilterOptionsMenu.php',
    header: {
      'unionId': that.data.unionId,
    },
    success: function (res) {
    //  console.log(res.data);
      var filterYearRs=[], filterMonthRs=[], filterGoodsRs=[];
      for(var i=0;i<res.data.year.length;i++){
        filterYearRs[i] = res.data.year[i].value;
      }

      for (var i = 0; i < res.data.month.length; i++) {
        filterMonthRs[i] = res.data.month[i].value;
      }
      for (var i = 0; i < res.data.goods.length; i++) {
        filterGoodsRs[i] = res.data.goods[i].value;
      }

      that.setData({
        filterYear: res.data.year,
        filterMonth: res.data.month,
        filterGoods: res.data.goods,
        filterYearRs: filterYearRs,
        filterMonthRs: filterMonthRs,
        filterGoodsRs: filterGoodsRs
      })
      load(that, curPage++);
      return true; 
    }, 
    fail:function(){
      return false; 
    }
  })
  
}