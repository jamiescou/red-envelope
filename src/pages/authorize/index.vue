<template>
  <div class="authorize_box">
    <auth-mask v-if="isAuth" @onGotUserInfo="onGotUserInfo"></auth-mask>
  </div>
</template>
<script>
import {loginWeChat, getSetting, getUserInfo, setStorage} from '../../utils/index'
import authMask from '../../components/modal/mask-auth/index'
export default {
  data () {
    return {
      isAuth: false
    }
  },
  components: {
    authMask
  },
  methods: {
    async login () {
      try {
        let loginInfo = await loginWeChat()
        console.log('获取登录code', loginInfo)
        if (loginInfo.errMsg === 'login:ok') {
          let loginMemberId = await this.request.post('/api/wechat/login', {jscode: loginInfo.code})
          console.log('获取loginMemberId', loginMemberId)
          const memberId = wx.getStorageSync('memberId') || ''
          if (memberId === loginMemberId.data.memberId) {
            console.log('已登录')
            return wx.navigateBack()
          }
          // 否则存储用户id
          await setStorage('memberId', loginMemberId.data.memberId)
          await setStorage('token', loginMemberId.data.token)
          // 获取用户信息
          const userInfo = await getUserInfo()
          console.log('获取userInfo', userInfo)
          // 存储用户信息
          await setStorage('userInfo', userInfo.userInfo)
          // 保存到后端
          await this.request.post('/api/wechat/addMember', {
            memberId: loginMemberId.data.memberId,
            encryptedData: userInfo.encryptedData,
            iv: userInfo.iv
          })
          console.log('保存用户信息成功')
          let memberInfo = await this.request.get('/api/sys/config/memberInfo', {memberId: loginMemberId.data.memberId})
          await setStorage('shareNo', memberInfo.data.shareNo)
          wx.navigateBack()
        }
      } catch (err) {
        console.log('error in auth==>', err)
      }
    },
    onGotUserInfo (e) {
      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        this.login()
        this.isAuth = false
      } else {
        this.isAuth = true
      }
    },
    async checkUserAuth () {
      console.log('检查是否有授权')
      let this_ = this
      // 判断是否获取授权
      let getSettingInfo = await getSetting()
      // 有授权就登录
      if (getSettingInfo.authSetting['scope.userInfo']) {
        console.log('有授权，去登录')
        this_.isAuth = false
        this_.login()
      } else {
        console.log('没有授权，去授权')
        this_.isAuth = true
      }
    }
  },
  onLoad () {
    this.isAuth = true
  }
}
</script>
<style>
.authorize_box{
  width: 100%;
  position: fixed;
  z-index: 9999;
}

</style>