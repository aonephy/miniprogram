// pages/music/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [],
    playList: [],
    unionId:null,
    currentMusicIndex:null,
    playstatus:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    wx.getStorage({
      key: 'unionId',
      success: function (res) {
        //  console.log(res.data)
        that.data.unionId = res.data;
        that.loadMusicList()
      }
    })
    wx.setNavigationBarTitle({
      title: '皮皮侠音乐'
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  selectMusic:function(e){
  //  console.log(e.currentTarget.dataset.index);
    this.playMusic(e.currentTarget.dataset.index);
       
  },
  playMusic: function (index){
    console.log(index);
    
    this.setData({
      playstatus: true,
      currentMusicIndex: index
    })
    let data = this.data.playList[index];

    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.title = data.title;
    backgroundAudioManager.epname = data.title;
    backgroundAudioManager.singer = data.author;
    backgroundAudioManager.coverImgUrl = data.imageUrl;
    backgroundAudioManager.src = data.audioUrl;
    
  },
  loadMusicList: function () {
    console.log('loading')
    let that = this;

    wx.request({
      url: 'https://s.aonephy.top/music/api/getMusic.php',
      data: {
      },
      method: 'POST',
      header: {
        'unionId': that.data.unionId,
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
      //  console.log(res)
        let data = res.data.data;

        that.setData({
          musicList: data,
          playList: data
        })

      }
    })

  },
  pause:function(){
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if (this.data.playstatus) {
      this.setData({
        playstatus: false
      })
      backgroundAudioManager.pause();
    }else{
      this.setData({
        playstatus: true
      })
      backgroundAudioManager.play();
    }
  },
  prevMusic: function (){
    console.log(this.data.currentMusicIndex - 1)
    let len = this.data.playList.length;
   
    if (this.data.currentMusicIndex==0){
      this.setData({
        currentMusicIndex: len
      })
    }
    this.playMusic(this.data.currentMusicIndex - 1);

  },
  nextMusic: function(){
    console.log(this.data.currentMusicIndex + 1)
    let len = this.data.playList.length;
    
    if (this.data.currentMusicIndex == (len-1)) {
      this.setData({
        currentMusicIndex: -1
      })
    }
    this.playMusic(this.data.currentMusicIndex + 1);
  }
})