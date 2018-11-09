// import Vue from 'vue'
var Fly = require('flyio/dist/npm/wx') // npm引入方式

const request = new Fly()

request.config.timeout = 10 * 1000
request.config.baseURL = ''

request.interceptors.request.use((request) => {
  wx.showLoading({ title: '拼命加载中...' })
  // 给所有请求添加自定义header
  request.headers['token'] = 'token'
  // 打印出请求体
  console.log(request.body)
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

const plugin = (Vue, opts) => {
  if (!Vue.prototype.request) {
    Vue.prototype.request = request
  }
  if (!Vue.prototype.$post) {
    Vue.prototype.$post = request.post
  }

  if (!Vue.prototype.$get) {
    Vue.prototype.$get = request.get
  }
}

export default plugin