// pages/ocr/index.js
var upng = require('../../utils/UPNG.js');
var createInnerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: true,
    ctx:'',
    imgSrc:'',
    audioSrc:'',
    camera:false,
    imgBase64:'',
    text:[],
    words:'',
    windowHeight:'',
    windowWidth:'',
    width:'',
    height:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.ctx = wx.createCameraContext()
    wx.getSystemInfo({
      success(res){
      //  console.log(res)
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
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
  takephoto:function(){
    
    this.data.ctx.takePhoto({
      quality: "normal",
      success: (res) => {
        // console.log(res);  
        this.setData({
          imgSrc: res.tempImagePath,
          camera: false,
        });
        sendImg(this)
      }
    })
    
  },
  savephoto:function(){
    
    
  },
  // 打开模拟的相机界面  
  open(e) {
    var that = this;
    that.setData({
      camera: true,
      imgSrc: '',
      text: []
    })

    /*
    that.setData({
      imgSrc: '',
      text:[]
    })
    
    wx.chooseImage({
      count: 1, 
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [ 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
      //  console.log(res)

        that.setData({
          imgSrc: res.tempFilePaths[0]
        })
        sendImg(that)
      },
    })
    */
  },
  // 关闭模拟的相机界面  
  close() {
    console.log("关闭相机");
    this.setData({
      camera: false
    })
  },// 切换相机前后置摄像头  
  devicePosition() {
    this.setData({
      device: !this.data.device,
    })
    console.log("当前相机摄像头为:", this.data.device ? "后置" : "前置");
  }

})
//采用了 chooseIamge 函数,而非连接camera的方案，其它函数没有删除，作为备份
function sendImg(that){
  wx.uploadFile({
    url: 'https://s.aonephy.top/api/miniprogram/getOcrResult.php',
    filePath: that.data.imgSrc,
    header: {
      'Content-Type': 'multipart/form-data' // 默认值
    },
    name: 'file',
    success: function (res) {
      
      var text = JSON.parse(res.data).words_result;
      var txt = joinWords(text, 'words');
      var wa = txt.split(/[！？。?#]/);
      for (var j = 0; j < wa.length; j++) {
        if (wa[j] == '' || typeof (wa[j]) == 'undefined') {
          wa.splice(j, 1);
          j--;
        }
      }
      
      that.setData({
        text: text,
        words: wa
      })
      var index = 0;
      read(wa[index]);
      createInnerAudioContext.onEnded( function(){
        index++;
        if (wa[index]) read(wa[index]);
      })
    }

  })
}
// join the arr to string
function joinWords(arr,item){
  var len = arr.length;
  var tmp = '';
  for(var i=0;i<len;i++){
    tmp += arr[i][item]
  }
  return tmp;
}

//
function AiRead(arr){

}

//read the text
function read(txt){
  console.log(txt)
  wx.request({
    url: 'https://s.aonephy.top/api/getbaidu-tok.php',
    success: function (res) {
      
      var audioUrl = 'http://tsn.baidu.com/text2audio?tex=' + txt + "&lan=zh&cuid=ppx&per=0&ctp=1&tok="+res.data.tok;
      console.log(audioUrl)
      createInnerAudioContext.src = audioUrl;
      createInnerAudioContext.autoplay = true;
      
    }

  })

}
function Image2Base64(that){
  var imgPath = that.data.imgSrc;
  var imgWidth, imgHeight;
  
  wx.getImageInfo({
    src:imgPath,
    success(res){
      console.log(res)
      imgWidth = res.width;
      imgHeight = res.height;
      that.setData({
        width: imgWidth,
        height: imgHeight
      })

      var canvasContext = wx.createCanvasContext('canvas')
      // 1. 绘制图片至canvas
      canvasContext.drawImage(imgPath, 0, 0, imgWidth, imgHeight, 0, 0, that.data.windowWidth, that.data.windowHeight)
      // 绘制完成后执行回调，API 1.7.0
      canvasContext.draw(false, () => {
        // 2. 获取图像数据， API 1.9.0
        wx.canvasGetImageData({
          canvasId: 'canvas',
          x: 0,
          y: 0,
          width: that.data.windowWidth,
          height: that.data.windowHeight,
          success(res) {
          //  console.log(res)
            // 3. png编码
            let pngData = upng.encode([res.data.buffer], res.width, res.height)
            // 4. base64编码
            let base64 = wx.arrayBufferToBase64(pngData)
            // ...
          //  saveimg(that)
            ocr(base64,that)
          }
        })
      })
    }
  })
}

function saveimg(that){
  
  wx.canvasToTempFilePath({
    canvasId: 'canvas',
    success(res) {
      console.log(res)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      })

    },
    fail(res){
      console.log(res)
    }
  })
}

function ocr(img,that){
  wx.request({
    url: 'https://s.aonephy.top/ocr/api/ocr_api.php',
    data: { img:img},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded' // 默认值
    },
    method:'POST',
    success:function(res){
      
      that.setData({
        text:res.data.words_result
      })
      
    }

  })
}