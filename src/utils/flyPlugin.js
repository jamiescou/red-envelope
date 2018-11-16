import {getStorage} from '../utils/index'
var Fly = require('flyio/dist/npm/wx') // npm引入方式
const request = new Fly()
request.config.timeout = 10 * 1000
// request.config.baseURL = 'http://192.168.1.85:8070'
request.config.baseURL = 'https://hbbeta.dhchecheng.com'
request.interceptors.request.use(async (request) => {
  wx.showLoading({ title: '拼命加载中...' })
  // 给所有请求添加自定义header
  let value = getStorage('session_key')
  request.headers['session_key'] = value
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
export default request
