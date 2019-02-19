Component({
  /**
   * 组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段
   * type 表示属性类型
   * value 表示属性初始值
   * observer 表示属性值被更改时的响应函数
   */
  properties: {
    // 调用组件标签传过来的数字
    num: {
      type: Number,
      value: ''
    }
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.onload()
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  data: {
    
  },
  methods: {
    onload: function() {
      console.log('组件进入页面节点树时执行');
    },
    postId: function() {
      //后面的值，通常可以是请求接口后，获取到的某个值
      this.triggerEvent('getId', "2")
    }
  }
})