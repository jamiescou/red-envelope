var Fly = require('flyio/dist/npm/wx') // npm引入方式
const request = new Fly()
request.config.timeout = 10 * 1000
// request.config.baseURL = 'http://192.168.1.85:8070'
request.config.baseURL = 'https://hbbeta.dhchecheng.com'
request.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  wx.showToast({
    title: '数据加载中',
    icon: 'loading'
  })
  let value = wx.getStorageSync('token')
  request.headers['token'] = value
  console.log(request.body)
  return request
})
request.interceptors.response.use(
  (response, promise) => {
    let resCode = response.data.code
    if (resCode !== '200') {
      console.log('response.data.message', response.data.message)
      wx.showToast({
        title: response.data.message || '服务器异常，请稍后重试',
        icon: 'none'
      })
      // return
    }
    wx.hideToast()
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
        title: err.status + '！服务器异常,请稍后重试',
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
