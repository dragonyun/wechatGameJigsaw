//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getExpressInfo:function(nu,cb)
  {
    wx.request({
      url: 'https://ali-deliver.showapi.com/showapi_expInfo?com=auto&nu='+nu,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header:{
        'Authorization':'APPCODE b44486e8e5f64dc091ec81ef061f828c'
      },
      success: function(res){
        // success
        console.log(res);
        cb(res.data);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

  },
  getscanCode:function(cb)
  {
    wx.scanCode({
      success: function(res){
        console.log(res);
        cb(res.result);
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  globalData:{
    userInfo:null
  }
})