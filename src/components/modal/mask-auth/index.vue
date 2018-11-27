<template>
  <div class="mask_authorize_box">
    <div class="icon_list">
      <div class="wechat_icon"><img src="../../../../static/images/wechat.png" alt=""></div>
      <div class="change_icon"><img src="../../../../static/images/changeIcon.png" alt=""></div>
      <div class="redpack_icon"><img src="../../../../static/images/redIcon.png" alt=""></div>
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
      this.$emit('onGotUserInfo', e)
    }
  }
}
</script>
<style>
.mask_authorize_box{
  width: 100%;
  height: 100%;
  position: fixed;
  background:#fff;
}
.mask_authorize_box .icon_list{
  display: flex;
  margin: 119rpx 207rpx;
  align-items: center;
  justify-content: space-around;
}
.mask_authorize_box .icon_list .wechat_icon img{
  width:100rpx;
  height:100rpx;
}
.mask_authorize_box .icon_list .change_icon img{
  width:38rpx;
  height:38rpx;
}
.mask_authorize_box .icon_list .redpack_icon img{
  width:100rpx;
  height:100rpx;
}
.mask_authorize_box .please_login{
  text-align: center;
  font-size:36rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
}
.mask_authorize_box .login_after_tips{
  margin: 20rpx 0 62rpx 0;
  text-align: center;
  font-size:28rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
}
.mask_authorize_box .authorize_login{
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