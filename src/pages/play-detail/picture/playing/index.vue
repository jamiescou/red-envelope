<template>
  <div class="playing_picture_page">
    <!-- 正式开始拼字详细 -->
    <div class="count_times">
      {{timeSeconds}}s
    </div>
    <div class="text_content" v-on:click="canvasClick">
      <canvas
        class="canvas_picture"
        :style='canvasStyles'
        v-on:touchstart='touchStartImage'
        v-on:touchmove="touchMoveImage"
        canvas-id="playingPic">
      </canvas>
    </div>
    <CatchSuccess :isShowModal="isShowModal" :packageInfo="packageInfo"></CatchSuccess>
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers'
import CatchSuccess from '../../../../components/modal/catch-sucess/index'
import { getBasicBlockInfo, getInitPositionList, piecesImage, nomalIndex } from '../../../../utils/index'
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
      canvasStyles: `width: 315px`,
      timer: null,
      gameTime: 30,
      timeSeconds: 30,
      initPositions: {},
      imgOption: {},
      tempIndex: [],
      typeNumber: 3
    }
  },
  methods: {
    initData () {
      this.imgSource = '../../../../../static/images/night_img.jpg'
      this.typeNumber = 3
      this.imgOption = getBasicBlockInfo(this, this.typeNumber, 1300) // 获取切片的信息
      let imageInfos = getInitPositionList(this.imgOption, true)
      this.initPositions = imageInfos
      piecesImage('playingPic', this.imgSource, imageInfos)
      clearInterval(this.timer)
      console.log('timer==init', this.timer)
      this.timer = setInterval(() => {
        this.timeSeconds--
        if (this.timeSeconds === 0) {
          clearInterval(this.timer)
          const url = `../../../play-detail/fail/main?type=2`
          wx.redirectTo({url})
        }
      }, 1000)
    },
    canvasClick (e) {
      let curPageX = e.x - e.currentTarget.offsetLeft
      let curPageY = e.y - e.currentTarget.offsetTop
      let {startX, breakSpace} = this.imgOption // 切片宽度等信息
      let {imagesPositionArr} = this.initPositions // 带canvas坐标
      let itemRangePos = []
      let indexOriginList = nomalIndex(this.typeNumber)
      for (var i = 0; i < imagesPositionArr.length; i++) {
        itemRangePos.push([imagesPositionArr[i].canvasPosition, [imagesPositionArr[i].canvasPosition[0] + startX + breakSpace, imagesPositionArr[i].canvasPosition[1] + startX + breakSpace]])
      }
      let dis = [curPageX, curPageY]
      let index = -1
      for (var k = 0; k < itemRangePos.length; k++) {
        let item = itemRangePos[k]
        let x1 = item[0][0]
        let x2 = item[1][0]
        let y1 = item[0][1]
        let y2 = item[1][1]
        if (dis[0] > x1 && dis[0] < x2 && dis[1] > y1 && dis[1] < y2) {
          index = k
          break
        }
      }
      this.tempIndex.push(index)
      if (this.tempIndex.length === 2) {
        let tempImgData0 = imagesPositionArr[this.tempIndex[0]].imgPosition
        let tempImgData1 = imagesPositionArr[this.tempIndex[1]].imgPosition
        imagesPositionArr[this.tempIndex[0]].imgPosition = tempImgData1
        imagesPositionArr[this.tempIndex[1]].imgPosition = tempImgData0
        piecesImage('playingPic', this.imgSource, this.initPositions)
        this.tempIndex = []
        tempImgData0 = null
        tempImgData1 = null
        let tempIndexList = []
        for (var n = 0; n < imagesPositionArr.length; n++) {
          tempIndexList.push(imagesPositionArr[n].imgPosition[2].imgIndex)
        }
        if (tempIndexList.toString() === indexOriginList.toString()) {
          console.log('恭喜你拼好了')
          clearInterval(this.timer)
          this.isShowModal = true
          console.log('okay,匹配成功 用时', this.gameTime - this.timeSeconds)
        }
      }
    }
  },
  created () {
    clearInterval(this.timer)
  },
  onLoad () {
    clearInterval(this.timer)
    this.timeSeconds = 30
    this.initData()
  },
  onUnload () {
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
.canvas_picture{
  /* margin: 2% 6.7%; */
  /* text-align: center; */
  /* margin: 22rpx auto; */
}
.text_content{
  position: relative;
  height: 60%;
  margin:35px 25px;
  font-size:36rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
}
</style>
