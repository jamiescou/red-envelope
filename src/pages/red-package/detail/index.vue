<template>
  <div class="detail_box">
    <div class="package_info">
      <div class="info_headimg">
        <img :src="headImg" alt="">
        <div class="head_title">阿萨德撒多</div>
      </div>
      <div class="set_up">
        <img src="../../../../static/images/setup.png" alt="">
      </div>
      <div class="red_info" v-if="type === 1">
        <!-- 语音 -->
      </div>
      <div class="red_info text_package" v-if="type === 2">
        <!-- 拼字 -->
        <img src="../../../../static/images/text.png" alt="">
        {{textContent}}
      </div>
      <div class="red_info picture_package" v-if="type === 3">
        <!-- 拼图 -->
        <img class="back_pic" src="../../../../static/images/test_img.png" alt="">
        <span class="modal_picture"></span>
        <img class="hide_eye" src="../../../../static/images/eyes.png" alt="">
      </div>
      <div class="press_red_btn" @click="toPlayDetail()">
        {{redBtnName}}
      </div>
      <div class="info_bottom_operation">
        <div class="operation_types checkout_cash">
          <img src="../../../../static/images/checkout.png" alt="">
          <span>去提现</span>
        </div>
        <div class="operation_types send_one" @click="proxyToSend()">
          <img src="../../../../static/images/send.png" alt="">
          <span>我也要发一个</span>
        </div>
        <div class="operation_types proxy_other">
          <img src="../../../../static/images/proxy.png" alt="">
          <span>转发</span>
        </div>
      </div>
    </div>
    <div class="get_package_msg">
      <div class="receive_info">
        <div class="redinfo_package">
          已领取<span>2</span>/<span>8</span>个，共<span>33.33</span>元/<span>100.00</span>元
        </div>
        <div class="complaint_btn">
          投诉
        </div>
      </div>
      <div class="graber_box">
        <div class="graber_info" v-for="info in graberInfoList" :key="info.id">
          <!-- 抢到红包者的信息 -->
          <div class="_info_left">
            <img :src="info.headImg" alt="">
          </div>
          <div class="_info_center">
            <div class="_info_name">
              <span>{{info.nickName}}</span>
              <img :src="info.sex === '1' ? '../../../../static/images/male.png' : '../../../../static/images/female.png'" alt="">
            </div>
            <div>
              <audioRange v-if="type === 1" :voices='info.voice' :curId='curId' :myAudio="myAudio" @audioCallBack="audioCallBack" />
              <div v-else class="_user_time">{{info.useTime}}s</div>
            </div>
          </div>
          <div class="_info_right">
            <div class="red_balance">{{info.redBalance}}元</div>
            <div class="graber_time">{{info.graberTime}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import audioRange from '@/components/audioRange'
const myAudio = wx.createInnerAudioContext()
/* eslint-disable */
export default {
  components: {
    audioRange
  },
  data () {
    return {
      type: 1,
      curId: '',
      jumpName: '',
      textContent: '我叫你一声你敢答应吗',
      picContent: 'http://img2.dhqcy.cn/181018/0018101810023508441.jpg!jp_style',
      headImg: '../../../static/images/test_img.png',
      myAudio: myAudio,
      redBtnName: '按住说出以上口令领取红包',
      graberInfoList: [
        {
          id: 1,
          headImg: '../../../static/images/test_img.png',
          nickName: '阿萨德撒',
          sex: '1',
          voice: {
            id: '001',
            src: 'http://www.ytmp3.cn/down/36549.mp3',
            time: '31',
            bl: false
          },
          redBalance: 8.88,
          graberTime: '11-1 18:37',
          useTime: 10
        },
        {
          id: 2,
          headImg: '../../../static/images/test_img.png',
          nickName: '多撒多撒',
          sex: '2',
          voice: {
            id: '002',
            src: 'http://www.ytmp3.cn/down/53909.mp3',
            time: '40',
            bl: false
          },
          redBalance: 18.88,
          graberTime: '11-2 18:37',
          useTime: 9
        },
        {
          headImg: '../../../static/images/test_img.png',
          id: 3,
          nickName: '放电饭锅',
          sex: '1',
          voice: {
            id: '003',
            src: 'http://www.ytmp3.cn/down/52612.mp3',
            time: '32',
            bl: false
          },
          redBalance: 4.88,
          graberTime: '11-1 19:37',
          useTime: 18
        },
        {
          headImg: '../../../static/images/test_img.png',
          id: 4,
          nickName: '共和国',
          sex: '2',
          voice: {
            id: '004',
            src: 'http://www.ytmp3.cn/down/54376.mp3',
            time: '227',
            bl: false
          },
          redBalance: 88.88,
          graberTime: '11-1 10:37',
          useTime: 12
        }
      ]
    }
  },
  methods: {
    audioCallBack (val) {
      // 回调list数据
      this.curId = val
      this.graberInfoList.forEach((item) => {
        if (item.voice.id === val) {
          item.voice.bl = true;
        } else {
          item.voice.bl = false;
        }
      })
    },
    proxyToSend () {
      // 我也要发一个
      let type = this.type
      let jumpName = this.jumpName
      const url = `../../play-types/${jumpName}/main`
      wx.navigateTo({url})
    },
    toPlayDetail () {
      // 开始抢红包
      let type = this.type
      let jumpName = this.jumpName
      let content = ''
      if (type === 1) {
        // 语音红包不跳页面
        return 
      }
      if (type === 2) {
        content = this.textContent
      }
      if (type === 3) {
        content = this.picContent
      }
      const url = `../../play-detail/${jumpName}/begin/main?content=${content}`
      wx.navigateTo({url})
    }
  },
  created () {
  },
  mounted () {
  },
  onLoad () {
    this.type = Number(this.$root.$mp.query.type) // 判断是什么红包 语音 文字 拼图
    console.log('onload', this.type)
    let titleName = '开口红包'
    this.textContent = '我叫你一声你敢答应吗'
    this.redBtnName = '按住说出以上口令领取红包'
    this.jumpName = 'vioce'
    if (this.type === 2) {
      titleName = '拼字红包'
      this.redBtnName = '点击拼出上面的文字领红包'
      this.jumpName = 'text'
    } else if (this.type === 3) {
      titleName = '拼图红包'
      this.redBtnName = '点击拼出上面的图片领红包'
      this.jumpName = 'picture'
    }
    wx.setNavigationBarTitle({
      title: titleName
    })
  }
}
</script>

<style>
.detail_box{
  width: 100%;
  height: 100%;
}
.package_info{
  width: 100%;
  background: #FF4347;
  position: relative;
}
.info_headimg{
  width: 300rpx;
  height:144rpx;
  padding-top: 44rpx;
  margin: 0 auto;
  text-align: center;
}
.set_up{
  position: absolute;
  right:10%;
  top:36rpx;
}
.set_up img{
  width:100rpx;
  height:32rpx;
  background:rgba(255,255,160,1);
  border-radius:16px;
}
.info_headimg img{
  width:144rpx;
  height:144rpx;
  background:rgba(255,67,71,1);
  border:4rpx solid rgba(255, 255, 255, 0.3);
  border-radius:50%;
}
.info_headimg .head_title{
  font-size:32rpx;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.red_info{
  margin: 0 auto;
  margin-top: 86rpx;
  font-size:36rpx;
  text-align: center;
  font-weight:400;
  color:rgba(255,255,160,1);
  margin-bottom:30rpx;
}
.text_package img{
  width:32rpx;
  height:28rpx;
  margin-right: 25rpx; 
}
.picture_package{
  width:88rpx;
  height:88rpx;
  position: relative;
}
.picture_package .hide_eye{
  position: absolute;
  width:46rpx;
  height:27rpx;
  left:26%;
  top:35%;
}
.picture_package .modal_picture{
  position: absolute;
  left:0;
  top:0;
  display: inline-block;
  width:88rpx;
  height:88rpx;
  background:rgba(0,0,0,1);
  opacity:0.7;
}
.picture_package .back_pic{
  width:88rpx;
  height:88rpx;
}
.press_red_btn{
  width: 80%;
  height:88rpx;
  background:rgba(255,255,160,1);
  box-shadow:3rpx 3rpx 4rpx 0rpx rgba(227,227,21,0.82);
  border-radius:8rpx;
  line-height: 88rpx;
  text-align: center;
  margin: 0 auto;
  font-size:28rpx;
  font-weight:bold;
  color:rgba(255,67,71,1);
}
.info_bottom_operation{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 52rpx; 
}
.checkout_cash img{
  width:28rpx;
  height:28rpx;
}
.send_one img{
  width:26rpx;
  height:28rpx;
}
.proxy_other img{
  width:28rpx;
  height:28rpx;
}
.operation_types{
  margin-top: 81rpx;
}
.operation_types span{
  margin-left: 17rpx;
  font-size:28rpx;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.get_package_msg{
  width: 100%;
  height: 100%;
}
.receive_info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 37rpx 0 39rpx;
  height:48rpx;
  background:rgba(244,244,244,1);
}
.redinfo_package{
  font-size:24rpx;
  font-weight:400;
  color:rgba(102,102,102,1);
}
.complaint_btn{
  font-size:24rpx;
  font-weight:400;
  color:rgba(3,135,195,1);
}
.graber_box{
  /* 抢红包者信息 */
}
.graber_info{
  padding: 28rpx 36rpx;
  display: flex;
  overflow: scroll;
  align-items: center;
  border-bottom: 2rpx solid #f4f4f4;
}
._info_left{
  width: 13%;
}
._info_left img{
  width:88rpx;
  height:88rpx;
  border-radius:4rpx;
}
._info_center{
  width: 56%;
  padding-left: 23rpx; 
}
._info_center ._info_name span{
  font-size:24rpx;
  font-weight:400;
  color:rgba(102,102,102,1);
  margin-right: 6rpx; 
}
._info_center ._info_name img{
  width:19rpx;
  height:19rpx;
}
._info_center ._user_time{
  font-size:24rpx;
  font-weight:400;
  color:rgba(255,67,71,1);
}
._info_right{
  width: 30%;
  text-align: right;
}
._info_right .red_balance{
  font-size:28rpx;
  font-weight:400;
  color:rgba(255,67,71,1);
}
._info_right .graber_time{
  font-size:24rpx;
  font-weight:400;
  color:rgba(102,102,102,1);
}
</style>
