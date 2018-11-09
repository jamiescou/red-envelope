<template>
  <div class="more_play_box">
   <div class="play_box_center">
     <div class="head_img">
       <img :src="headImg" alt="">
     </div>
     <div class="edit_item_text" @click="chooseMaterialData()">
       <div class="item_title">设置文字</div>
      <div class="item_input"><input :value="textData" placeholder="设置文字" disabled /></div>
      <div class="next_step_choose">></div>
    </div>
     <div class="choose_tips">
       小伙伴们拼对文字即可获得随机红包
     </div>
     <div class="edit_item">
       <div class="item_title">红包金额</div>
      <div class="item_input"><input placeholder-class="place-holder" placeholder="填写金额" /></div>
      <div class="next_step">元</div>
    </div>
    <div class="edit_item">
       <div class="item_title">红包数量</div>
      <div class="item_input"><input placeholder-class="place-holder" placeholder="填写数量" /></div>
      <div class="next_step">个</div>
    </div>
    <div class="edit_item">
       <div class="item_title">挑战时间</div>
      <div class="item_input">
        <picker @change="pickerTimeChange" :value="timeIndex" :range="timeArray">
          <div class="picker_level">
            {{timeArray[timeIndex]}}
          </div>
        </picker>
      </div>
      <div class="next_step_choose">></div>
    </div>
    <div class="edit_item">
       <div class="item_title">发布广场</div>
      <div class="item_publish"><switch checked @change="switchChange"/></div>
    </div>
    <div class="fee_info">
      需支付¥0.00元服务费，优先使用余额¥8.06元。
    </div>
   </div>
   <div class="save_as_package" @click="makeTextPackage()">
     生成拼字红包
   </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      textData: '',
      isPublish: false,
      timeArray: ['15s', '30s', '60s', '自定义'],
      timeIndex: 0,
      headImg: '../../../static/images/test_img.png',
      chooseData: '../../../static/images/test_play.png'
    }
  },
  methods: {
    chooseMaterialData () {
      let parmas = null
      wx.navigateTo({
        url: `/pages/material/main?id=${parmas}&type=text`
      })
    },
    switchChange (val) {
      this.isPublish = val.mp.detail.value // 是否发布到广场
    },
    pickerTimeChange (val) {
      this.timeIndex = val.target.value
    },
    makeTextPackage () {
      wx.navigateTo({
        url: `/pages/red-package/detail/main?type=2`
      })
    }
  },
  created () {
  },
  onShow () {
    // eslint-disable-next-line
    let pages = getCurrentPages()
    let curPage = pages[pages.length - 1] // 素材库选择的内容
    this.textData = curPage.data.data
  }
}
</script>

<style>
.more_play_box{
  height: 100%;
  width: 100%;
  position: fixed;
  background: #f4f4f4;
}
.play_box_center{
  position: relative;
  margin: 198rpx 60rpx 0 60rpx;
  background:rgba(255,255,255,1);
  box-shadow:4rpx 7rpx 8rpx 0rpx rgba(155,155,155,0.82), 0rpx 8rpx 8rpx 0rpx rgba(155,155,155,0.45);
  border-radius:10rpx;
}
.play_box_center .head_img{
  position: absolute;
  width:120rpx;
  height:120rpx;
  border-radius:50%;
  top:-10%;
  left:40%;
}
.play_box_center .head_img img {
  width:120rpx;
  height:120rpx;
  border-radius:50%;
}
.next_step_choose{
  width:2%;
  height:28rpx;
  color:#999999;
  display:flex;
  text-align: right;
  align-items:center;
}
.choose_tips{
  margin-left: 30rpx;
  font-size:22rpx;
  font-weight:400;
  color:rgba(153,153,153,1);
}
.edit_item_text{
  display: flex;
  align-items: center;
  padding-top:100rpx;
  margin: 0 60rpx 33rpx 31rpx;
}
.edit_item{
  display: flex;
  align-items: center;
  margin: 17rpx 60rpx 33rpx 31rpx;
}
.item_title{
  font-size:28rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
  width: 35%;
}
.item_input{
  width:60%;
}
.item_publish{
  display: flex;
  width:70%;
  justify-content: flex-end
}
.item_input .place-holder{
  font-size:28rpx;
  font-weight:400;
  color:rgba(153,153,153,1);
}
.picker_level, .item_input input{
  font-size:28rpx;
  color: #999;
  padding-bottom: 10rpx;
  border-bottom: 2rpx solid #f4f4f4
}
.edit_item .next_step{
  font-size:28rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
}
.fee_info{
  padding-bottom: 41rpx;
  margin-left: 31rpx;
  font-size:22rpx;
  font-weight:400;
  color:rgba(153,153,153,1);
}
.save_as_package{
  margin: 70rpx 60rpx 0 60rpx;
  height:88rpx;
  background:rgba(255,67,71,1);
  border-radius:4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:28rpx;
  font-weight:400;
  color:rgba(255,255,255,1);
}
</style>
