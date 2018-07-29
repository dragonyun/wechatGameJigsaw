var app = getApp()
Page({
  data:{
    saoma:"saoma",
    screenData:"Go",
    lastIsOperator:false,
    pageBackgroundColor:'red',
    logs:[],
    userInfo: {}, 
    einputinfo:null,//输入框值
    expressInfo:null //快递信息
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log('onLoad')
    var that=this
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){

  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  input:function(e){
    this.setData({einputinfo:e.detail.value});
  },
  call:function(){
    wx.getNetworkType({
      success: function(res) {
        console.log(res)
        // success
      }
    })
    setTimeout(function(){
      wx.stopRecord()
    },5000)
  },
  uncall:function(){
    wx.pauseVoice({
      success: function(res){
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
  scan:function(){
        var thissaoma=this;
        app.getscanCode(function(data){
        var rest=data;
        console.log(rest);
        
        app.getExpressInfo(rest,function(data){
        console.log(data.showapi_res_body);
        if(data.showapi_res_code!=0||data.showapi_res_body.ret_code!=0||!data.showapi_res_body.flag){
          wx.showToast({
            title:'查询失败',
          })
          thissaoma.setData({expressInfo:data})
        }
        else{
          wx.showToast({
            title:'查询成功',
            icon: 'success',
          })
        thissaoma.setData({expressInfo:data})
        }
      })
      })
  },
  btnClick:function(){
    var thisexpress=this;
    app.getExpressInfo(this.data.einputinfo,function(data){
    console.log(data.showapi_res_body);
    if(data.showapi_res_code!=0||data.showapi_res_body.ret_code!=0||!data.showapi_res_body.flag){
      wx.showToast({
        title:'查询失败',
      })
      thisexpress.setData({expressInfo:data})
    }
    else{
      wx.showToast({
        title:'查询成功',
        icon: 'success',
      })
    thisexpress.setData({expressInfo:data})
    }
  })
  }
})