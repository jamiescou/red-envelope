function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
// 获取当前页url
export function getCurrentPageUrl () {
  // eslint-disable-next-line
  let pages = getCurrentPages() // 获取加载的页面
  let currentPage = pages[pages.length - 1] // 获取当前页面的对象
  let url = currentPage.route // 当前页面url
  return url
}
// 获取当前页带参数的url
export function getCurrentPageUrlWithArgs () {
  // eslint-disable-next-line
  let pages = getCurrentPages() // 获取加载的页面
  let currentPage = pages[pages.length - 1] // 获取当前页面的对象
  let url = currentPage.route // 当前页面url
  let options = currentPage.options // 如果要获取url中所带的参数可以查看options
  // 拼接url的参数
  let urlWithArgs = url + '?'
  for (let key in options) {
    let value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  return urlWithArgs
}
/**
*
@method 生产原图切片 并渲染到canvas矩阵中
@param
{obj} 当前调用该方法的实例
{canvasId} canvasId
{imgSource} 原图地址
{windowWidth} 当前设备宽度
{typeNumber} 矩阵维数 3， 4， 5
{imgSourceW} 原图片宽度
*/
export function piecesImage (obj, canvasId, imgSource, typeNumber, imgSourceW) {
  let windowWidth = 375
  wx.getSystemInfo({
    success: function (res) {
      // 可使用窗口宽度、高度
      windowWidth = res.windowWidth
      // 计算主体部分高度,单位为px
    }
  })
  let curWidth = windowWidth - 50 // 当前canvas的宽度
  obj.canvasStyles = `width: ${curWidth}px;height: ${curWidth}px`
  const breakSpace = 5 // 切片间隔
  const ctx = wx.createCanvasContext(canvasId)
  const imgW = curWidth - breakSpace * (typeNumber - 1) // 除去几个像素的间隔
  let startX = parseInt(imgW / typeNumber) // 每个切片的宽度
  let pieceImgSize = imgSourceW / typeNumber
  for (var i = 0; i < typeNumber; i++) {
    for (var j = 0; j < typeNumber; j++) {
      ctx.drawImage(
        imgSource,
        i * pieceImgSize,
        j * pieceImgSize,
        pieceImgSize,
        pieceImgSize,
        (startX + breakSpace) * i,
        (startX + breakSpace) * j,
        startX,
        startX
      )
    }
  }
  ctx.draw(true)
}
export default {
  formatNumber,
  formatTime,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  piecesImage
}
