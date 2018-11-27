var Fly = require('flyio/dist/npm/wx') // npm引入方式

const request = new Fly()

request.config.timeout = 10 * 1000 // 请求超时10秒

request.config.baseURL = process.env.NODE_ENV === 'development' ? 'https://applet-test.houbank.net' : 'https://applet.houbank.com' // 测试环境和线上环境

request.interceptors.request.use(async (request) => {
  // wx.showLoading({ title: '拼命加载中...' })
  // 出了code2Session 给每一个接口添加userId
  if (request.url.indexOf('code2Session') < 0) {
    // 如果localstorage里面有userId每一个请求的参数里添加上userId
    const userId = wx.getStorageSync('userId') || ''
    if (userId) {
      request.body = Object.assign({}, request.body, {'userId': userId})
    }
  }
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    // wx.hideLoading()
    // 如果不是00000抛出异常
    if (response.data.resultCode !== '00000') {
      wx.showToast({
        title: response.data.resultMsg || '服务器异常，请稍后重试',
        icon: 'none'
      })
    }
    return promise.resolve(response.data)
  },
  (err, promise) => {
    // 状态为0 网络错误
    if (Number(err.status) === 0) {
      wx.showToast({
        title: '网络错误,请稍后重试',
        icon: 'none'
      })
      return promise.resolve()
    }
    // 状态为1 网络超时
    if (Number(err.status) === 1) {
      wx.showToast({
        title: '网络超时，请稍后重试',
        icon: 'none'
      })
      return promise.resolve()
    }
    if (Number(err.status) > 200) {
      wx.showToast({
        title: err.status + '服务器异常,请稍后重试',
        icon: 'none'
      })
      return promise.resolve()
    }
    // wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)
export default request