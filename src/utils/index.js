import request from './flyPlugin'
export function checkAuthorize (from, callback, curUrl) {
  console.log('授权检测', curUrl)
  // 检查是否授权 callback是授权并登陆后要执行的函数
  wx.getSetting({
    success (res) {
      if (!res.authSetting['scope.userInfo'] && from === 'detail' && curUrl) {
        console.log('url in 授权检测', curUrl)
        wx.redirectTo({url: '../../authorize/main?url=' + encodeURIComponent(curUrl)})
        return
      }
      if (!res.authSetting['scope.userInfo'] && from === 'index' && curUrl) {
        wx.redirectTo({url: '../authorize/main?url=' + encodeURIComponent(curUrl)})
        return
      }
      checkLoginApp(callback)
    }
  })
}
export function checkLoginApp (callback) {
  console.log('登录检测')
  wx.checkSession({
    success (res) {
      // session_key 未过期，并且在本生命周期一直有效
      if (callback) {
        console.log('登录中触发首页的回调')
        callback()
      }
    },
    // session_key 已经失效，需要重新执行登录流程
    fail (err) {
      console.log('session过期', err)
      loginApp(callback) // 重新登录
    }
  })
}
export function loginApp (callback) {
  console.log('准备登录')
  // 登录
  wx.showToast({
    title: '登录中',
    icon: 'loading',
    duration: 2000
  })
  wx.login({
    success (res) {
      if (res.code) {
        // 发起网络请求
        request.post('/api/wechat/login', {jscode: res.code}).then(resKeyInfo => {
          addMemberByUserInfo(resKeyInfo, callback)
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
async function addMemberByUserInfo (resKeyInfo, callback) {
  // 异步存储sessionKey和拿取userInfo
  await setStorage('session_key', resKeyInfo.data.session_key)
  let userInfo = await getStorage('userInfo')
  let parmas = {
    opendId: resKeyInfo.data.openid,
    sessionKey: resKeyInfo.data.session_key,
    nickname: userInfo.data.nickName,
    city: userInfo.data.city,
    province: userInfo.data.province,
    sex: userInfo.data.gender,
    headImg: userInfo.data.avatarUrl,
    phone: ''
  }
  request.post('api/wechat/addMember', parmas).then(resMemberInfo => {
    setStorage('shareNo', resMemberInfo.data.shareNo)
    setStorage('memberId', resMemberInfo.data.id).then(res => {
      callback()
    })
    // wx.setStorage({
    //   key: 'memberId',
    //   data: resMemberInfo.data.id,
    //   success: function (res) {
    //     if (callback) {
    //       console.log('登录后触发首页的回调')
    //       callback()
    //     }
    //   }
    // })
  })
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
{typeNumber} 矩阵维数 3， 4， 5
{imgSourceW} 原图片宽度
*/
export function getBasicBlockInfo (obj, typeNumber, imgSourceW) {
  let windowWidth = 375
  let marginFix = 50 // 左右margin总和
  wx.getSystemInfo({
    success: function (res) {
      // 可使用窗口宽度、高度
      windowWidth = res.windowWidth
      // 计算主体部分高度,单位为px
    }
  })
  let curWidth = windowWidth - marginFix // 当前canvas的宽度
  obj.canvasStyles = `width: ${curWidth}px;height: ${curWidth}px;`
  const breakSpace = 1 // 切片间隔
  const imgW = curWidth - breakSpace * (typeNumber - 1) // 除去几个像素的间隔
  let startX = parseInt(imgW / typeNumber) // 每个切片的宽度
  let pieceImgSize = imgSourceW / typeNumber
  return {
    startX, // 切片宽度
    breakSpace,
    pieceImgSize,
    typeNumber
  }
}
export function nomalIndex (typeNumber) {
  // 正常索引值
  let arr = []
  for (var i = 0; i < typeNumber * typeNumber; i++) {
    arr.push(i)
  }
  return arr
}
export function randIndex (typeNumber) {
  // 随机索引值
  let arr = nomalIndex(typeNumber)
  var len = arr.length
  // 首先从最大的数开始遍历，之后递减
  for (var j = len - 1; j >= 0; j--) {
    // 随机索引值randomIndex是从0-arr.length中随机抽取的
    var randomIndex = Math.floor(Math.random() * (j + 1))
    // 下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
    var itemIndex = arr[randomIndex]
    arr[randomIndex] = arr[j]
    arr[j] = itemIndex
  }
  // 每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0)
  return arr
}
export function getInitPositionList (blockInfo, randomFlag) {
  let {startX, breakSpace, pieceImgSize, typeNumber} = blockInfo
  let tempArr = [] // 坐标数组
  let imagesPositionArr = []
  let randomIndexList = nomalIndex(typeNumber)
  for (var j = 0; j < typeNumber; j++) {
    for (var i = 0; i < typeNumber; i++) {
      tempArr.push({x: i, y: j})
    }
  }
  if (randomFlag) {
    // 需要拼图时，打乱顺序
    randomIndexList = randIndex(typeNumber)
  }
  for (var k = 0; k < tempArr.length; k++) {
    imagesPositionArr.push(
      {
        imgPosition: [tempArr[randomIndexList[k]].x * pieceImgSize, tempArr[randomIndexList[k]].y * pieceImgSize, {imgIndex: randomIndexList[k]}],
        canvasPosition: [(startX + breakSpace) * tempArr[k].x, (startX + breakSpace) * tempArr[k].y]
      }
    )
  }
  return {
    startX,
    pieceImgSize,
    imagesPositionArr
  }
}
/**
*
@method 生产原图切片 并渲染到canvas矩阵中
@param
{obj} 当前调用该方法的实例
{canvasId} canvasId
{imgSource} 原图地址
{typeNumber} 矩阵维数 3， 4， 5
{imgSourceW} 原图片宽度
*/
export function piecesImage (canvasId, imgSource, imagesInfo) {
  // 每个切片的宽度 渲染时每个切片的宽 所有需要渲染的坐标
  let {startX, pieceImgSize, imagesPositionArr} = imagesInfo
  const ctx = wx.createCanvasContext(canvasId)
  for (var i = 0; i < imagesPositionArr.length; i++) {
    ctx.drawImage(
      imgSource,
      imagesPositionArr[i].imgPosition[0], // 坐标必须是数字 否则默认裁了全部 // 原图选框X坐标
      imagesPositionArr[i].imgPosition[1],
      pieceImgSize,
      pieceImgSize,
      imagesPositionArr[i].canvasPosition[0],
      imagesPositionArr[i].canvasPosition[1],
      startX,
      startX
    )
  }
  ctx.draw(true)
}
export function setStorage (key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
  })
}
export function getStorage (key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject })
  })
}
export default {
  checkAuthorize,
  checkLoginApp,
  loginApp,
  formatNumber,
  formatTime,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  getInitPositionList,
  piecesImage,
  randIndex,
  nomalIndex,
  setStorage,
  getStorage
}
