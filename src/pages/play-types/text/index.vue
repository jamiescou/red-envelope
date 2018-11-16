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
      <div class="item_input"><input placeholder-class="place-holder" @change="fieldMoney" placeholder="填写金额" /></div>
      <div class="next_step">元</div>
    </div>
    <div class="edit_item">
       <div class="item_title">红包数量</div>
      <div class="item_input"><input placeholder-class="place-holder" @change="fieldNumber" placeholder="填写数量" /></div>
      <div class="next_step">个</div>
    </div>
    <div class="edit_item" @click="pickerTimeData()">
      <div class="item_title">挑战时间</div>
      <div class="item_input"><input :value='timeSeconds' placeholder-class="place-holder" disabled placeholder="选择时间" /></div>
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
   <pickerTime :isShowTimeModal='isShowTimeModal' @setTimeCallBack="setTimeCallBack"></pickerTime>
  </div>
</template>

<script>
import pickerTime from '../../../components/modal/pick-time/index'
export default {
  components: {
    pickerTime
  },

  data () {
    return {
      textData: '',
      timeSeconds: '',
      isShowTimeModal: false,
      isPublish: 1,
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
      // 是否发布到广场
      let publishVal = val.target.value
      if (publishVal) {
        this.isPublish = 1
        return
      }
      this.isPublish = 2
    },
    pickerTimeChange (val) {
      this.timeIndex = val.target.value
    },
    setTimeCallBack (val, status) {
      this.timeSeconds = val + 's'
      this.isShowTimeModal = false
    },
    pickerTimeData () {
      this.isShowTimeModal = true
    },
    fieldMoney (e) {
      this.money = e.target.value
    },
    fieldNumber (e) {
      this.num = e.target.value
    },
    makeTextPackage () {
      let {money, num, contentId, timeSeconds, isPublish} = this
      if (!money || !num || !contentId || !timeSeconds || !isPublish) {
        wx.showToast({
          title: '请输入红包参数',
          icon: 'none'
        })
      }
      // 生成拼字红包
      // let that = this
      let postParams = {
        memberId: 100132,
        type: 2, // 1-拼图 2-拼字 3-语音
        contentId, // '素材id'
        money, // 红包
        num, // 红包个数
        timeRange: parseInt(timeSeconds), // 挑战时间
        bonusMoney: money * 0.02, // 手续费（按2%收取）
        publish: isPublish // 1-发布 2-不发布
        // level: 1 // 难度 1， 2， 3
      }
      // 调用应用实例的方法获取全局数据
      this.request.post('/api/sendOutRecord/commit', postParams).then(res => {
        let payType = res.data.payType
        let id = res.data.id
        let param = {
          id,
          memberId: 100132
        }
        if (payType === 1) {
          // 余额支付
          this.request.get('/api/sendOutRecord/payByBalance', param).then(res => {
            wx.navigateTo({
              url: `/pages/red-package/detail/main?type=2&id=${id}`
            })
          }).catch(err => {
            console.log(err)
          })
          return false
        }
        wx.requestPayment(
          // 微信支付
          {
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: 'MD5',
            paySign: '',
            success: function (res) {

            },
            fail: function (res) {

            },
            complete: function (res) {

            }
          })
      }).catch(err => {
        console.log(err)
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
    this.contentId = curPage.data.contentId
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
