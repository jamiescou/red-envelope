<template>
  <div class="playing_text_page">
    <!-- 正式开始拼字详细 -->
    <div class="count_times">
      {{timeSeconds}}s
    </div>
    <div class="text_list_box">
      <div class="text_item" v-for="(item, index) in textData" :key="index">
        {{item}}
      </div>
    </div>
    <div class="choose_text_list">
      <div
        :class="info.active ? 'text_item selected_' : 'text_item'"
        v-for="(info, index) in textList"
        :key="info"
        @click="chooseText(info,index)">
        {{info.value}}
      </div>
    </div>
    <CatchSuccess :isShowModal="isShowModal" :packageInfo="packageInfo"></CatchSuccess>
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers'
import CatchSuccess from '../../../../components/modal/catch-sucess/index'
export default {
  components: {
    CatchSuccess
  },
  data () {
    return {
      isShowModal: false,
      packageInfo: {
        headImg: '../../../../static/images/test_img.png',
        hasPack: false
      },
      textContent: '',
      timer: null,
      count: -1,
      selectedIndex: [],
      textData: [],
      textList: [],
      tempTextList: [],
      gameTime: 30,
      timeSeconds: 30
    }
  },
  methods: {
    chooseText (info, index) {
      info.active = true
      if (this.selectedIndex.indexOf(index) > -1) {
        return
      }
      this.count += 1
      if (this.count < this.textList.length) {
        this.textData[this.count] = info.value
      }
      this.selectedIndex.push(index)
      let resultData = this.textData.join('')
      if (this.selectedIndex.length === this.textList.length) {
        if (resultData === this.textContent) {
          clearInterval(this.timer)
          this.isShowModal = true
          console.log('okay,匹配成功 用时', this.gameTime - this.timeSeconds)
        } else {
          this.initData()
        }
      }
    },
    initData () {
      this.textList = []
      this.tempTextList.forEach(ele => {
        this.textList.push({
          value: ele,
          active: false
        })
      })
      clearInterval(this.timer)
      this.textData = [] // 用户选中要显示的数据
      this.count = -1 // 记录每一次点击
      this.selectedIndex = [] // 记录每一次点击数据的索引
      for (var i = 0; i < this.textList.length; i++) {
        this.textData.push('') // 显示多少字要选
      }
      this.timer = setInterval(() => {
        this.timeSeconds--
        if (this.timeSeconds === 0) {
          // this.timeSeconds = 30
          clearInterval(this.timer)
          const url = `../../../play-detail/fail/main?type=2`
          wx.redirectTo({url})
        }
      }, 1000)
    }
  },
  created () {
  },
  onLoad () {
    this.tempTextList = []
    this.timeSeconds = 30
    this.textContent = this.$root.$mp.query.content
    this.tempTextList = this.textContent.split('')
    this.tempTextList.sort(() => (0.5 - Math.random()))
    this.initData()
    if (this.timeSeconds === 0) {
      const url = `../../../play-detail/fail/main?type=2`
      wx.redirectTo({url})
    }
  },
  onUnload () {
    clearInterval(this.timer)
  }
}
</script>

<style>
.playing_text_page{
  width: 100%;
  height: 100%;
  position: fixed;
}
.count_times{
  width:168rpx;
  height:168rpx;
  background:rgba(255,67,71,1);
  box-shadow:3rpx 3rpx 4rpx 0rpx rgba(193,190,190,0.82);
  border-radius:84rpx;
  font-size:68rpx;
  font-weight:400;
  margin: 65rpx auto;
  color:rgba(255,255,255,1);
  line-height: 168rpx;
  text-align: center;
}
.text_list_box {
  margin: 49rpx 64rpx;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.text_list_box .text_item {
  box-sizing: border-box;
  flex: 0 0 11%;
  text-align: center;
  line-height: 60rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
  height: 64rpx;
  font-size:28rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
  background:rgba(244,244,244,1);
  border:1rpx solid rgba(218,215,215,1);
  border-radius:4rpx;
}
.choose_text_list{
  margin-top: 161rpx;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: center;
}
.choose_text_list .text_item{
  box-sizing: border-box;
  flex: 0 0 14.3%;
  text-align: center;
  height: 90rpx;
  line-height: 80rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
  font-size:32rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
  background:rgba(244,244,244,1);
  border:1rpx solid rgba(218,215,215,1);
  border-radius:4rpx;
}
.selected_{
  background: #FFFFA0 !important
}
</style>
