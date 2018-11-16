<template>
  <div class="authorize_box">
    <div class="icon_list">
      <div class="wechat_icon"><img src="../../../static/images/wechat.png" alt=""></div>
      <div class="change_icon"><img src="../../../static/images/changeIcon.png" alt=""></div>
      <div class="redpack_icon"><img src="../../../static/images/redIcon.png" alt=""></div>
    </div>
    <div class="please_login">
      Hi，请授权登录~
    </div>
    <div class="login_after_tips">
      授权后可以更好的体验我们哟~
    </div>
    <button class="authorize_login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button>
  </div>
</template>
<script>
import {setStorage} from '../../utils/index'
export default {
  data () {
    return {
      url: ''
    }
  },
  components: {
  },
  methods: {
    onGotUserInfo (e) {
      let url = decodeURIComponent(this.$root.$mp.query.url)
      console.log('curUrl in auth before', this.$root.$mp.query, url)
      if (e.target.userInfo) {
        setStorage('userInfo', e.target.userInfo)
        let curUrl = url.replace(/^pages/g, '..')
        wx.reLaunch({url: curUrl})
      }
    }
  }
}
</script>
<style>
.authorize_box{
  width: 100%;
  height: 100%;
  position: fixed;
}
.authorize_box .icon_list{
  display: flex;
  margin: 119rpx 207rpx;
  align-items: center;
  justify-content: space-around;
}
.authorize_box .icon_list .wechat_icon img{
  width:100rpx;
  height:100rpx;
}
.authorize_box .icon_list .change_icon img{
  width:38rpx;
  height:38rpx;
}
.authorize_box .icon_list .redpack_icon img{
  width:100rpx;
  height:100rpx;
}
.please_login{
  text-align: center;
  font-size:36rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
}
.login_after_tips{
  margin: 20rpx 0 62rpx 0;
  text-align: center;
  font-size:28rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
}
.authorize_login{
  width: 80%;
  margin: 0 auto;
  line-height: 88rpx;
  height:88rpx;
  background:rgba(255,67,71,1);
  border-radius:4rpx;
  font-size:28rpx;
  font-weight:400;
  color:rgba(255,255,255,1);
}
</style>