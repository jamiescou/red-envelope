<template>
  <div class="audio_range">
    <div class='output-audio'>
      <div class='audio' :style='styles' @click='audioPlay()' :key="voices.id">
        <image class='ico' :src="!voices.bl ? '../../../static/images/yuyin-ico.png' : '../../../static/images/yuyin-gif.gif'" />
      </div>
      <div class='time'>{{voices.time}}"</div>
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
        console.log('开始播放另一个')
        if (this.voices.bl) {
          this.myAudio.stop()
          this.voices.bl = false
          this.$emit('audioCallBack', '')
        }
      } else {
        console.log('开始播放同一个')
        console.log('this voices==>>', this.voices.id)
        this.$emit('audioCallBack', this.voices.id) // 告诉父组件curId改变了
        this.voices.bl = true
        this.myAudio.src = this.voices.src
        this.myAudio.play()
      }
    },
    audioStop () {
      console.log('停止播放')
      this.myAudio.stop()
      this.voices.bl = false
    }
  },
  created () {
  },
  mounted () {
    this.styles = `width: ${this.voices.time * 10 + 100}rpx`
    this.myAudio.onEnded(() => {
      this.voices.bl = false
    })
  },
  onReady () {
    console.log('voices===>>>', this.voices)
  },
  onLoad () {
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
    height: 68rpx;
    border-radius: 8rpx;
    background:rgba(244,244,244,1);
    border:1rpx solid rgba(235,235,235,1);
    display: flex;
    align-items: center;
  }
  .audio_range .output-audio .audio .ico{
    margin-left: 8rpx;
    width: 28rpx;
    height: 30rpx;
  }
  .audio_range .output-audio .time{
    margin-left: 8rpx;
    font-size:28rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
</style>
