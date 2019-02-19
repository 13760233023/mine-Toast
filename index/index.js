Page({
  data: {

  },
  onLoad: function () {
    this.toast1 = this.selectComponent('#toast1');
    this.toast2 = this.selectComponent('#toast2');
    this.toast3 = this.selectComponent('#toast3');
    // this.timercode = this.selectComponent('#timercode');

  },
  showToast1:function(){
    this.toast1.showToast({
      type: 'warn',
      content: '服务器异常请稍候重试'
    });
  },
  showToast2: function () {
    this.toast3.showToast({
      type: 'success',
      control:true,
      content: '服务器调用成功'
    });
  },
  showToast3: function () {
    this.toast2.showToast({
      type: 'warn',
      control: true,
      duration:5000,
      content: '请输入正确密码'
    });
  },
  test:function(){
    wx.navigateTo({
      url: '../test/test'
    })
  }
})
