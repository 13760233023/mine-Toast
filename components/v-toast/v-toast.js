var showTimer = null;
Component({
  properties: {
    position: {
      type: String,
      value: 'top'
    },
    // 字体颜色
    fontColor: {
      type: String,
      value: '#FFF'
    },
    // 背景颜色
    bgColor: {
      type: String,
      value: 'rgba(88,88,88,0.9)'
    },
    // 按钮颜色
    btnColor: {
      type: String,
      value: '#FFF'
    },
    // 按钮文本
    btnText: {
      type: String,
      value: '关闭'
    }
  },
  data: {
    show: false,
    content: '',
    toast: [],
    animationData: {},
    isPlaying: false,
    showTime: 500,
    closeTime: 500
  },
  methods: {
    /**
     * html可支持的属性
       btnColor->按钮颜色 
       fontColor->字体颜色 
       bgColor->背景颜色 
       btnText->按钮提示文字 
       position->动画开始位置，可选top/bottom，默认top
     * name.wxml
     * 如：<v-toast id='toast' btnColor='yellow' fontColor='red' btnText='UNDO' position='top' bgColor='blue'></v-toast>
     * name.js
       在生命周期onload中，this.toast = this.selectComponent('#toast');
       type 支持的类型图标，仅支持none、success（成功）、warn（失败）
       content 显示的内容
       duration 显示时间
       control 是否手动关闭，true->手动，false->自动，默认false
       如： that.toast.showToast({
              type: 'success',
              content: '登录名、验证码不允许为空！',
              control: true
            });
        方法showToast,data传的是一个对象{type: 'success',content: '登录名、验证码不允许为空！',control: true}
     */
    showToast: function(data) {
      if (data.duration == undefined) {
        data.duration = 2000;
      }
      if (data.type == undefined) {
        data.type = 'none'
      }
      // 添加toast队列
      this.data.toast.push(data);
      // 丢进队列
      // 执行动画
      this.animations();
    },
    // 显示的动画
    animations: function() {
      let that = this;
      // 显示出来的动画

      // 判断是否正在播放
      if (!this.data.isPlaying) {

        // 获取toast队列  
        let toasts = that.data.toast;

        if (that.data.toast.length > 0) {
          var toast = that.data.toast[0];
        }

        let iconTypes = {
          success: '../../images/ic_success.png',
          warn: '../../images/ic_error.png',
          none: ''
        }
        // 设置当前toast数据
        that.setData({
          show: true,
          type: iconTypes[toast.type],
          content: toast.content,
          isPlaying: true
        })
        // 创建动画
        const animation = wx.createAnimation({
          duration: that.data.showTime,
          timingFunction: 'linear',
        })
        // 选择动画出现位置
        if (this.data.position == 'top') {
          animation.top(0).step()
        } else {
          animation.bottom(0).step()
        }
        // 播放动画
        that.setData({
          animationData: animation.export()
        })
        if (toast.control == undefined) {
          showTimer = setTimeout(function() {
            that.close()
          }, toast.duration + that.data.showTime)
        }
      }

    },
    // 隐藏动画
    close: function(e) {
      let that = this;
      // 关闭动画的行为
      const animation = wx.createAnimation({
        timingFunction: 'linear',
      })
      animation.translate(0, that.data.position == 'top' ? -80 : 80).step({
        duration: that.data.closeTime
      })
      // 播放关闭动画
      that.setData({
        animationData: animation.export()
      })

      // 说明用户主动点击关闭按钮
      if (e != undefined) {
        clearTimeout(showTimer);
      }

      that.data.toast.splice(0, 1);
      setTimeout(function() {
        // 隐藏dom
        that.setData({
          show: false,
          isPlaying: false
        })
        // 是否还有剩余的toast
        if (that.data.toast.length > 0) {
          // 继续播放
          that.animations();
        }
      }, that.data.closeTime);
    }
  }

})