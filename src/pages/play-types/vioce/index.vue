<template>
  <div class="more_play_box">
    <div class="change_languge">
      <div class="item_languge"
        :class="item.active ? 'active_item' : ''"
        @click="changeTab(item.type)"
        v-for=" item in languges"
        :key="item.type">
        {{item.name}}
      </div>
    </div>
   <div class="play_box_center">
     <div class="head_img">
       <img :src="headImg" alt="">
     </div>
     <div class="edit_item_text" @click="chooseMaterialData()">
      <div class="item_title">设置口令</div>
      <div class="item_input"><input :value="vioceData" placeholder="设置口令" disabled /></div>
      <div class="next_step_choose">></div>
    </div>
     <div class="choose_tips">
       小伙伴们语音匹配即可获得随机红包
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
       <div class="item_title">发布广场</div>
      <div class="item_publish"><switch checked @change="switchChange"/></div>
    </div>
    <div class="fee_info">
      需支付¥0.00元服务费，优先使用余额¥8.06元。
    </div>
   </div>
   <div class="save_as_package" @click="makeViocePackage()">
     生成开口红包
   </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      headImg: '../../../static/images/test_img.png',
      chooseData: '../../../static/images/test_play.png',
      type: 1, // 1普通话 2英语 3 粤语
      vioceData: '',
      isPublish: false,
      languges: [
        {
          type: 1,
          name: '普通话',
          active: true
        },
        {
          type: 2,
          name: '英语',
          active: false
        },
        {
          type: 3,
          name: '粤语',
          active: false
        }
      ]
    }
  },
  methods: {
    changeTab (id) {
      this.type = id
      let languges = this.languges
      let tempArr = []
      languges.forEach(item => {
        if (item.type === id) {
          item.active = true
        } else {
          item.active = false
        }
        tempArr.push(item)
      })
      this.languges = tempArr
    },
    chooseMaterialData () {
      let parmas = this.type
      wx.navigateTo({
        url: `/pages/material/main?id=${parmas}&type=vioce`
      })
    },
    switchChange (value) {
      this.isPublish = value.mp.detail.value // 是否发布到广场
    },
    makeViocePackage () {
      wx.navigateTo({
        url: `/pages/red-package/detail/main?type=1`
      })
    }
  },
  created () {
  },
  onShow () {
    // eslint-disable-next-line
    let pages = getCurrentPages()
    let curPage = pages[pages.length - 1] // 素材库选择的内容
    this.vioceData = curPage.data.data
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
.change_languge{
  height: 88rpx;
  background: #FF4347;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.active_item{
  color:rgba(255,255,160,1) !important;
  border-bottom: 2rpx solid rgba(255,255,160,1);
}
.item_languge{
  font-size:28rpx;
  font-family:PingFangSC;
  font-weight:400;
  padding-bottom: 12rpx;
  color:rgba(255,255,255,1);
}
.play_box_center{
  position: relative;
  margin: 108rpx 60rpx 0 60rpx;
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
.item_input input{
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
