<template>
  <div class="playing_picture_page">
    <!-- 正式开始拼字详细 -->
    <div class="count_times">
      {{timeSeconds}}s
    </div>
    <div class="text_content" v-for="(item, index) in pic" :key="index">
      <div
        class=''
        style=''
        data-index="{{index}}"
        bindtap="{{isFirst?'touchD':'touchH'}}">
        <image mode='widthFix' src='{{ImageSrc}}' style='{{item.picPosi}}' />
      </div>
    </div>
    <CatchSuccess :isShowModal="isShowModal" :packageInfo="packageInfo"></CatchSuccess>
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers'
import CatchSuccess from '../../../../components/modal/catch-sucess/index'
import { getBasicBlockInfo, getInitPositionList, piecesImage, nomalIndex, getImageInfo } from '../../../../utils/index'
export default {
  components: {
    CatchSuccess
  },
  data () {
    return {
      isShowModal: false,
      pic:[],
      pic1: [],
      picBox: "margin:30rpx auto;width:630rpx;height:630rpx;postion:relative",
      packageInfo: {
        // headImg: '../../../../static/images/test_img.png',
        hasPack: false,
        sendOutRecordId: '',
        useTimes: ''
      },
      textContent: '',
      canvasStyles: `width: 315px`,
      timer: null,
      gameTime: 120,
      timeSeconds: 120,
      initPositions: {},
      imgOption: {},
      tempIndex: [],
      levelMap: {
        1: 3,
        2: 4,
        3: 5
      }
    }
  },
  methods: {
    initData () {
      console.log('init', this.levelMap, this.level)
      this.imgOption = getBasicBlockInfo(this, this.levelMap[this.level], this.loadImgSrc.height) // 获取切片的信息
      let imageInfos = getInitPositionList(this.imgOption, true)
      this.initPositions = imageInfos
      piecesImage('playingPic', this.loadImgSrc.path, imageInfos)
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.timeSeconds--
        if (this.timeSeconds === 0) {
          clearInterval(this.timer)
          const url = `../../../play-detail/fail/main?type=1&id=${this.id}`
          wx.redirectTo({url})
        }
      }, 1000)
    },
    canvasClick (e) {
      let curPageX = e.x
      let curPageY = e.y
      let {startX, breakSpace} = this.imgOption // 切片宽度等信息
      let {imagesPositionArr} = this.initPositions // 带canvas坐标
      let itemRangePos = []
      let indexOriginList = nomalIndex(this.levelMap[this.level])
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
        piecesImage('playingPic', this.loadImgSrc.path, this.initPositions, this.tempIndex[0])
        this.tempIndex = []
        tempImgData0 = null
        tempImgData1 = null
        let tempIndexList = []
        for (var n = 0; n < imagesPositionArr.length; n++) {
          tempIndexList.push(imagesPositionArr[n].imgPosition[2].imgIndex)
        }
        console.log('当前索引', tempIndexList, '原始索引', indexOriginList)
        if (tempIndexList.toString() === indexOriginList.toString()) {
          clearInterval(this.timer)
          this.packageInfo.hasPack = true
          this.packageInfo.type = 1
          this.packageInfo.sendOutRecordId = this.id
          this.packageInfo.useTimes = this.gameTime - this.timeSeconds
          this.isShowModal = true
          console.log('okay,匹配成功 用时', this.gameTime - this.timeSeconds)
        }
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
    // clearInterval(this.timer)
    // this.imgSource = '../../../../../static/images/001809191413098212.jpg'
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
.canvas_picture{
  /* position: relative;
  z-index: -1; */
  /* margin: 2% 6.7%; */
  /* text-align: center; */
  /* margin: 22rpx auto; */
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
