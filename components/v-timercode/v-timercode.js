/**
 * name.js
 * 在onload方法里添加，this.timercode = this.selectComponent('#timercode');
 * 获取名为timercode的组建实例
 * 获取定时器组建调用/sms/sent接口成功后返回的id，登录时需要使用
 * getCodeId: function(e) {
      // 定时器组建传过来的code码
      console.log('get_code_id', e.detail);
      this.setData({
        get_code_id: e.detail
      })
    },
 * name.wxml
 * 在获取验证码按钮原先所在位置添加，<timercode id='timercode' bind:getCodeId='getCodeId' tel='{{num}}'></timercode>
 * 其父容器要加position:relative;否则会样式出问题
 * smslogin有demo参考
 */


// let request = require('../../utils/request.js');
// let util = require('../../utils/util.js');

let interval = null; //倒计时函数
Component({
  properties: {
    btnStyle: {
      type: null,
      value: ''
    },
    // 父组件传过来的手机号码
    tel: {
      type: Number,
      value: ''
    }
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.onChangeCode()
    },
  },
  data: {
    //  控制输入图形验证码的模态框显示隐藏
    hiddencode: true,
    // 用户实时填写的验证码
    img_code_num: '',
    //验证码的提示信息
    code: '获取验证码',
    current_time: 121,
    code_height: 90,
    disabled: false
  },
  methods: {
    // 获取用户实时填写的图形验证码
    setCodeNum: function (e) {
      this.setData({
        img_code_num: e.detail.value
      })
    },
    //  点击获取验证码按钮
    onGetCode: function (e) {
      let that = this;
      // (/^1[34578]\d{9}$/.test(this.data.num))为true，即符合手机号格式
      if (that.data.tel != '' && (/^1[34578]\d{9}$/.test(that.data.tel))) {
        that.setData({
          hiddencode: false
        })
      } else {
        wx.showToast({
          image: '/images/ic_error.png',
          title: '请填写正确的手机号码'
        })
      }
    },
    // 获取验证码后开启-->计时器
    watchTime: function () {
      let that = this;
      let current_time = that.data.current_time;
      interval = setInterval(function () {
        current_time--;
        that.setData({
          code: current_time + '秒'
        })
        if (current_time <= 0) {
          clearInterval(interval)
          that.setData({
            code: '请重新获取',
            current_time: 121,
            disabled: false
          })
        }
      }, 1000)
    },
    //点击刷新验证码图片
    onChangeCode: function () {
      let that = this;
      // request.requestNoHeaders('/token/verify_code', 'GET', {},
      //   function (res) {
      //     if (res.resultcode == 0) {
      //       that.setData({
      //         key: res.data.key,
      //         codeImg: res.data.url
      //       })
      //     } else {
      //       wx.showToast({
      //         image: '/images/ic_error.png',
      //         title: res.data.msg
      //       })
      //     }
      //   })
    },
    //输入验证码后的取消和确定
    onCode: function (e) {
      let that = this;
      /* 0:取消按钮
       * 1:确定按钮  
       */
      if (e.currentTarget.dataset.type == 0) {
        that.setData({
          hiddencode: true
        })
      } else {
        let params = {
          tel: that.data.tel,
          key: that.data.key,
          code: that.data.img_code_num
        }
        // 用户没有输入验证码、干脆连请求都不发
        if (params.code == '') {
          wx.showToast({
            image: '/images/ic_error.png',
            title: '请输入验证码',
          })
          return;
        }
        // request.requestNoHeaders('/sms/sent', 'POST', params,
        //   function (res) {
        //     if (res.resultcode === 0) {
        //       // 验证码正确、发送验证码成功，将获取到的id传给父组件，登录时使用
        //       that.triggerEvent('getCodeId', res.data.id)
        //       that.setData({
        //         hiddencode: true,
        //         disabled: true
        //       })
        //       wx.showToast({
        //         icon: 'successs',
        //         title: '短信发送成功'
        //       })
        //       // 发送成功开启定时器
        //       that.watchTime();
        //     } else {
        //       wx.showToast({
        //         image: '/images/ic_error.png',
        //         title: res.msg
        //       })
        //       that.setData({
        //         img_code_num: ''
        //       })
        //       // 验证码输入错误、刷新验证码，并且原先输入的验证码置空
        //       that.onChangeCode();
        //     }
        //     // 记录成功与否
        //     wx.reportAnalytics('sending_sms', {
        //       sms_type: 'login',
        //       sms_rs: res.resultcode == 0 ? 1 : 0,
        //       createtime: util.getNowDate(),
        //       feedback: res.msg == '' ? '发送成功' : res.msg,
        //       tel: that.data.num
        //     })
        //   })
      }
    },

  }
})