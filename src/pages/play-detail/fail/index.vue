<template>
  <div class="play_fail_page">
    <div class="fail_picture">
      <img src="http://img.dhqcy.cn/hb/fail.png" alt="">
    </div>
    <div class="fail_info">
      虽败犹荣，您几百了全国96.66%的玩家
    </div>
    <div class="challenge_again" @click="challengeAgain()">
      重新挑战
    </div>
    <div class="back_index" @click="backIndex()">
      返回首页
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    challengeAgain () {
      wx.navigateTo({
        url: `/pages/red-package/detail/main?type=${this.type}&id=${this.id}`
      })
    },
    backIndex () {
      wx.reLaunch({
        url: '/pages/index/main'
      })
      console.log('okay')
    }
  },
  created () {
  },
  onLoad () {
    this.type = this.$root.$mp.query.type
    this.id = this.$root.$mp.query.id
  }
}
</script>
<style>
.play_fail_page{
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: scroll;
}
.fail_picture{
  padding: 61rpx 0 51rpx 0;
  margin: 0 auto;
  text-align: center;
}
.fail_picture img{
  width:290rpx;
  height:541rpx;
}
.fail_info{
  text-align: center;
  font-size:28rpx;
  font-weight:400;
  color:rgba(153,153,153,1);
  margin-bottom: 188rpx;
}
.challenge_again{
  margin: 0 auto;
  text-align: center;
  line-height: 88rpx;
  height:88rpx;
  width: 80%;
  background:rgba(255,67,71,1);
  box-shadow:3rpx 3rpx 4rpx 0rpx rgba(189,184,184,0.82);
  border-radius:44rpx;
  font-size:32rpx;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.back_index{
  margin: 42rpx auto;
  text-align: center;
  line-height: 88rpx;
  height:88rpx;
  width: 80%;
  background:rgba(255,255,255,1);
  border:1rpx solid rgba(255,67,71,1);
  box-shadow:3rpx 3rpx 4rpx 0rpx rgba(211,211,211,0.82);
  border-radius:44rpx;
  font-size:32rpx;
  font-weight:400;
  color:rgba(255,67,71,1);
}
</style>
