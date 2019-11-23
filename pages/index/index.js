//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    focus:false,
    inputValue:""
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px" 
    this.setData({
      Height: swiperH//设置高度
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
     


    //  轮播图
    var self = this;
    var width = wx.getSystemInfoSync().screenWidth;
    function carousel_num() {

      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 10000,
        timingFunction: "linear",
        delay: 0
      })
      self.animation = animation
      animation.translate3d(-width, 0, 100).step()
      // console.log("第一动画开始");
      self.setData({
        animationData_notice: animation.export(),
      })
      setTimeout(function () {
        var animation = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 0,
          timingFunction: "linear",
          delay: 0
        })
        self.animation = animation
        animation.translate3d(0, 0, 100).step()
        // console.log("第二动画开始");
        self.setData({
          animationData_notice: animation.export(),
        })
        setTimeout(function () {
          carousel_num();
        }, 50)
      }, 5000)
    }
    setTimeout(function () {
      carousel_num();
    }, 1000);

// 轮播图结束

     if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },


  
 
})
