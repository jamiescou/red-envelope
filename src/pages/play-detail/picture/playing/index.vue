<template>
  <div class="playing_picture_page">
    <!-- 正式开始拼字详细 -->
    <div class="count_times">
      {{timeSeconds}}s
    </div>
    <div :style="picBox">
      <div v-for="(item, index) in pic" :key="index">
        <div
          class='image_box'
          :class="activeIndex === index ? 'activeClass' : ''"
          :style='item.BoxPosi'
          @click="clickImage($event, index)">
          <image mode='widthFix' :src='imgSource' :style='item.picPosi' />
        </div>
      </div>
    </div>
    <CatchSuccess :isShowModal="isShowModal" :packageInfo="packageInfo"></CatchSuccess>
  </div>
</template>
<script>
// import { setInterval, clearInterval } from 'timers'
import CatchSuccess from '../../../../components/modal/catch-sucess/index'
import { getImageInfo, figure } from '../../../../utils/index'
export default {
  components: {
    CatchSuccess
  },
  data () {
    return {
      isShowModal: false,
      packageInfo: {
        headImg: '',
        hasPack: false,
        sendOutRecordId: '',
        useTimes: ''
      },
      picBox: 'margin:30rpx auto;width:630rpx;height:630rpx;postion:relative',
      pic: [],
      pic1: [],
      textContent: '',
      canvasStyles: `width: 315px`,
      timer: null,
      gameTime: 0,
      timeSeconds: 0,
      initPositions: {},
      imgSource: '',
      imgOption: {},
      tempIndex: [],
      activeIndex: -1,
      levelMap: {
        1: 3,
        2: 4,
        3: 5
      }
    }
  },
  methods: {
    initData () {
      const temp = figure(this.loadImgSrc.height, this.loadImgSrc.height, this.levelMap[this.level])
      this.pic1 = temp
      this.sortRandom()
      this.timer = setInterval(() => {
        this.timeSeconds--
        if (this.timeSeconds === 0) {
          clearInterval(this.timer)
          const url = `../../../play-detail/fail/main?type=1&id=${this.id}`
          wx.redirectTo({url})
        }
      }, 1000)
    },
    sortRandom () {
      const temp = figure(this.loadImgSrc.height, this.loadImgSrc.height, this.levelMap[this.level])
      this.pic = temp.sort(function (a, b) { return Math.random() > 0.5 ? -1 : 1 }) // 打乱顺序
    },
    clickImage (e, index) {
      this.tempIndex.push(index)
      this.activeIndex = this.tempIndex[0]
      if (this.tempIndex.length === 2) {
        let tempPic0 = this.pic[this.tempIndex[0]]
        let tempPic1 = this.pic[this.tempIndex[1]]
        this.pic[this.tempIndex[0]] = tempPic1
        this.pic[this.tempIndex[1]] = tempPic0
        this.tempIndex = []
        this.activeIndex = -1
      }
      var i
      var len = this.pic.length
      for (i = 0; i < len; i++) {
        if (this.pic[i].id !== this.pic1[i].id) {
          break
        }
      }
      if (i === len) {
        clearInterval(this.timer)
        console.log('拼好了')
        this.packageInfo.hasPack = true
        this.packageInfo.type = 1
        this.packageInfo.sendOutRecordId = this.id
        this.packageInfo.useTimes = this.gameTime - this.timeSeconds
        this.isShowModal = true
      }
    }
  },
  created () {
    clearInterval(this.timer)
  },
  onShow () {
    clearInterval(this.timer)
  },
  async onLoad () {
    this.isShowModal = false
    clearInterval(this.timer)
    this.imgSource = this.$root.$mp.query.content
    this.loadImgSrc = await getImageInfo(this.imgSource) // 下载图片到本地
    this.id = this.$root.$mp.query.id
    this.gameTime = this.$root.$mp.query.gameTime
    this.level = this.$root.$mp.query.level
    this.timeSeconds = this.$root.$mp.query.gameTime
    this.initData()
  },
  onUnload () {
    this.isShowModal = false
    clearInterval(this.timer)
  }
}
</script>

<style>
.playing_picture_page{
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
.activeClass{
  border:1rpx solid rgba(255,255,255,1) !important;
}
.canvas_picture{
  /* position: relative;
  z-index: -1; */
  /* margin: 2% 6.7%; */
  /* text-align: center; */
  /* margin: 22rpx auto; */
}
.image_box {
  margin:0 auto;
  width:160rpx;
  height:160rpx;
  overflow: hidden;
  position:relative;
  float:left;
}
.text_content{
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling : touch;
  z-index: 88;
  height: 60%;
  margin:35px 25px;
  font-size:36rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
}
</style>
