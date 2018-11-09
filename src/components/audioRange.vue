<template>
  <div class="audio_range">
    <div class='output-audio'>
      <div class='audio' :style='styles' @click='audioPlay()' :key="voices.id">
        <image class='ico' :src="!voices.bl ? '../../../static/images/yuyin-ico.png' : '../../../static/images/yuyin-gif.gif'" />
      </div>
      <div class='time'>{{voices.time}}'</div>
    </div>
  </div>
</template>

<script>
// import { setTimeout } from 'timers'
export default {
  props: ['voices', 'myAudio', 'curId', 'audioCallBack'],
  data () {
    return {
      styles: `width: 50rpx`,
      timeCount: 0,
      timeLeft: 0,
      curIndex: '',
      flag: false
    }
  },
  methods: {
    audioPlay () {
      if (this.voices.id === this.curId) {
        if (this.voices.bl) {
          this.myAudio.stop()
          this.voices.bl = false
          this.$emit('audioCallBack', '')
        }
      } else {
        this.$emit('audioCallBack', this.voices.id) // 告诉父组件curId改变了
        this.voices.bl = true
        this.myAudio.src = this.voices.src
        this.myAudio.play()
      }
    },
    audioStop () {
      this.myAudio.stop()
      this.voices.bl = false
    }
  },
  created () {
  },
  mounted () {
    // let that = this
    // // this.myAudio = wx.createInnerAudioContext()
    // // this.myAudio.src = this.voices.src
    // this.myAudio.onCanplay(() => {
    //   // eslint-disable-next-line
    //   that.myAudio.duration // 初始化duration
    //   that.timeCount = that.myAudio.duration // 延时获取长度
    //   that.timeLeft = that.myAudio.currentTime // 延时获取当前时间
    //   setTimeout(function () {
    //     that.timeCount = parseInt(that.myAudio.duration) // 延时获取长度
    //     that.timeLeft = parseInt(that.myAudio.currentTime) // 延时获取当前时间
    this.styles = `width: ${this.voices.time * 5 + 50}rpx`
    //   }, 10) // 这里设置延时1秒获取
    // })
    this.myAudio.onEnded(() => {
      this.voices.bl = false
    })
    // this.myAudio.onPlay(() => {
    //   console.log('播放着中')
    // })
    // this.myAudio.onTimeUpdate(() => {
    //   console.log('播放着中1111')
    // })
  },
  onReady () {
    // this.myAudio.onPlay(() => {
    //   console.log('播放着中', this.myAudio)
    // })
    // this.myAudio.onTimeUpdate(() => {
    //   console.log('播放着中1111')
    // })
  }
}
</script>

<style>
  .audio_range .output-audio{ 
    /* width: 150rpx; */
    display: flex;
    align-items: flex-end
  }
  .audio_range .output-audio .audio{
    height: 48rpx;
    border-radius: 4rpx;
    background:rgba(244,244,244,1);
    border:1rpx solid rgba(235,235,235,1);
    display: flex;
    align-items: center;
  }
  .audio_range .output-audio .audio .ico{
    margin-left: 8rpx;
    width: 26rpx;
    height: 30rpx;
  }
  .audio_range .output-audio .time{
    margin-left: 8rpx;
    font-size:18rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
</style>
