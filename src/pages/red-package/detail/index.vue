<template>
  <div class="detail_box">
    <div class="package_box">
      <div class="package_info">
        <div class="start_record" v-if="isShowRecord">
          <div class="two_icon_record">
            <div class="hua_tong"><img src="../../../../static/images/huatong.png" alt=""></div>
            <div class="vioce_"><img src="../../../../static/images/record-gif.gif" alt=""></div>
          </div>
          <div class="_title_tips">手指松开，说话完成</div>
        </div>
        <div class="info_headimg">
          <img :src="redDetailInfo.headImg" alt="">
          <div class="head_title">{{redDetailInfo.nickname}}</div>
        </div>
        <div class="set_up" v-if="false">
          <img src="../../../../static/images/setup.png" alt="">
        </div>
        <div class="red_info text_package" v-if="type === 3">
          <!-- 语音 -->
          {{redDetailInfo.contentText}}
        </div>
        <div class="red_info text_package" v-if="type === 2">
          <!-- 拼字 -->
          <img src="../../../../static/images/text.png" alt="">
          {{redDetailInfo.contentText}}
        </div>
        <div class="red_info picture_package" v-if="type === 1" @click="previewImage()">
          <!-- 拼图 -->
          <img class="back_pic" :src="picContent" alt="">
          <span class="modal_picture"></span>
          <img class="hide_eye" src="../../../../static/images/eyes.png" alt="">
        </div>
        <div v-if="redDetailInfo.isReceived" class="has_received">
          {{redDetailInfo.memberMoney}}<span>元</span>
        </div>
        <div v-if="!redDetailInfo.isReceived && redDetailInfo.status === 2" class="press_red_btn" @click="toPlayDetail()" @longpress="getStartRecord" @touchend="recordStop">
          {{redBtnName}}
        </div>
        <div v-if="!redDetailInfo.isReceived && (redDetailInfo.status === 3 || redDetailInfo.status === 4)" class="press_red_btn">
          {{statusMap[redDetailInfo.status]}}
        </div>
        <div class="info_bottom_operation">
          <div class="operation_types checkout_cash" @click="checkCashOut()">
            <img src="../../../../static/images/checkout.png" alt="">
            <span>去提现</span>
          </div>
          <div class="operation_types send_one" @click="proxyToSend()">
            <img src="../../../../static/images/send.png" alt="">
            <span>我也要发一个</span>
          </div>
          <button
            open-type="share"
            class="operation_types proxy_other"
            :data-info="shareInfo">
            <img src="../../../../static/images/proxy.png" alt="">
            <span>转发</span>
          </button>
        </div>
      </div>
      <div class="get_package_msg">
        <div class="receive_info">
          <div class="redinfo_package">
            已领取<span>{{redDetailInfo.giveOffNum}}</span>/<span>{{redDetailInfo.num}}</span>个，共<span>{{redDetailInfo.giveOffMoney}}</span>元/<span>{{redDetailInfo.money}}</span>元
          </div>
          <button open-type="contact">
              投诉
          </button>
        </div>
        <div class="graber_box">
          <div class="graber_info" v-for="info in graberInfoList" :key="info.id">
            <!-- 抢到红包者的信息 -->
            <div class="_info_left">
              <img :src="info.headImg" alt="">
            </div>
            <div class="_info_center">
              <div class="_info_name">
                <span>{{info.nickname}}</span>
                <img :src="info.sex === 1 ? '../../../../static/images/male.png' : '../../../../static/images/female.png'" alt="">
              </div>
              <div>
                <audioRange v-if="type === 3" :voices='info.voice' :curId='curId' :myAudio="myAudio" @audioCallBack="audioCallBack" />
                <div v-else class="_user_time">{{info.useTime}}s</div>
              </div>
            </div>
            <div class="_info_right">
              <div class="red_balance">{{info.money}}元</div>
              <div class="graber_time">{{info.createTimeShow}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CatchSuccess :isShowModal="isShowModal" :packageInfo="packageInfo" @callBackModal="callBackModal"></CatchSuccess>
  </div>
</template>
<script>
import {getCurrentPageUrlWithArgs, getStorage, getSetting, loginWeChat, setStorage} from '../../../utils/index'
import { setTimeout } from 'timers'
import audioRange from '@/components/audioRange'
import CatchSuccess from '../../../components/modal/catch-sucess/index'
// import authorize from '../../../components/modal/authorize/index'
/* eslint-disable */
export default {
  components: {
    audioRange, CatchSuccess
  },
  data () {
    return {
      type: 3,
      curId: '',
      jumpName: '',
      gameTime: '',
      shareInfo: '',
      audioWasteTime: 0,
      level: '',
      isShowModal: false,
      isShowRecord: false,
      recorderManager: '',
      statusMap: {
        1: "未付款",
        2: "正常",
        3: '已抢完',
        4: '已失效'
      },
      packageInfo: {
        hasPack: false,
        sendOutRecordId: '',
        useTimes: '',
        audioFilePath: ''
      },
      redDetailInfo: {},
      textContent: '我叫你一声你敢答应吗',
      picContent: 'http://img2.dhqcy.cn/181018/0018101810023508441.jpg!jp_style',
      headImg: '../../../static/images/test_img.png',
      myAudio: '',
      redBtnName: '按住说出以上口令领取红包',
      graberInfoList: []
    }
  },
  methods: {
    async checkUserAuth () {
      console.log('检查是否有授权1111')
      let this_ = this
      // 判断是否获取授权
      let getSettingInfo = await getSetting()
      console.log('==>>', getSettingInfo)
      // 有授权就登录
      if (getSettingInfo.authSetting['scope.userInfo']) {
        console.log('有授权', getSettingInfo)
        let loginInfo = await loginWeChat()
        console.log('首页获取登录code', loginInfo)
        if (loginInfo.errMsg === 'login:ok') {
          let loginMemberId = await this.request.post('/api/wechat/login', {jscode: loginInfo.code})
          console.log('获取loginMemberId', loginMemberId)
          const memberId = wx.getStorageSync('memberId') || ''
          if (memberId === loginMemberId.data.memberId) {
            console.log('已登录')
            let memberInfo = await this.request.get('/api/sys/config/memberInfo', {memberId})
            console.log('shareNo 已存', memberInfo)
            await setStorage('shareNo', memberInfo.data.shareNo)
            console.log('shareNo 已存')
            this_.initData()
          } else {
            let memberInfo = await this.request.get('/api/sys/config/memberInfo', {memberId: loginMemberId.data.memberId})
            await setStorage('shareNo', memberInfo.data.shareNo)
            await setStorage('memberId', loginMemberId.data.memberId)
            await setStorage('token', loginMemberId.data.token)
            this_.initData()
          }
        }
      } else {
        wx.navigateTo({
          url: '../../authorize/main'
        })
      }
    },
    audioCallBack (val) {
      // 回调list数据
      this.curId = val
      this.graberInfoList.forEach((item) => {
        if (item.voice.id === val) {
          item.voice.bl = true
        } else {
          item.voice.bl = false
        }
      })
    },
    callBackModal (val) {
      this.isShowModal = false
      this.initData()
    },
    checkCashOut () {
      const url = '../../my/balance/main'
      wx.navigateTo({url})
    },
    proxyToSend () {
      // 我也要发一个
      let type = this.type
      let jumpName = this.jumpName
      const url = `../../play-types/${jumpName}/main`
      wx.navigateTo({url})
    },
    previewImage () {
      wx.previewImage({
        current: this.picContent, // 当前显示图片的http链接
        urls: [this.picContent] // 需要预览的图片http链接列表
      })
    },
    getStartRecord (e) {
      console.log('eeeee', e)
      let that = this
      const options = {
        duration: 20000,
        numberOfChannels: 1,
        // sampleRate: 48000,
        // encodeBitRate: 8000,
        sampleRate: 8000,
        encodeBitRate: 16000,
        format: 'mp3',
        frameSize: 50
      }
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.record',
              success () {
                // 用户已经同意小程序使用录音功能，后续调用 wx.recorderManager 接口不会弹窗询问
              }
            })
            return
          }
          console.log('options', options)
          that.recorderManager.start(options)
        }
      })
      this.recorderManager.onStart(() => {
        that.isShowRecord = true
        console.log('开始录音')
      })
      this.recorderManager.onStop((res) => {
        const { tempFilePath, duration} = res
        that.audioWasteTime = duration // 录音时间
        that.isShowRecord = false
        console.log('自动结束录音=', res)
        this.recordFileUpload(res)

      })
      this.recorderManager.onFrameRecorded((res) => {
        // 监听已录制完指定帧大小
        wx.hideToast()
        const { frameBuffer } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)
      })
    },
    recordStop (e) {
      let that = this
      this.recorderManager.stop()
      wx.hideToast()
      this.isShowRecord = false
      this.recorderManager.onStop((res) => {
        console.log('主动结束录音=', res)
        const { tempFilePath, duration} = res
        that.audioWasteTime = duration // 录音时间
        that.recordFileUpload(res)
      })
    },
    recordFileUpload (recodeData) {
      let that = this
      setTimeout(function () {
        // 拿取语音转文字信息
        // let urls = "https://hbbeta.dhchecheng.com/api/upload/audio"
        // console.log('recodeData==>>', recodeData)
        let urls = "https://hbbeta.dhchecheng.com/api/upload/transToText"
        wx.uploadFile({
          url: urls,
          filePath: recodeData.tempFilePath,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            sendOutRecordId: that.id
          },
          success: function (res) {
            let resultData = JSON.parse(res.data)
            if (resultData.data === 1) {
              that.packageInfo.hasPack = true
              that.packageInfo.type = 3
              that.packageInfo.useTimes = parseInt(that.audioWasteTime / 1000)
              that.packageInfo.sendOutRecordId = that.id
              that.packageInfo.audioFilePath = recodeData.tempFilePath
              that.isShowModal = true
            } else {
              wx.hideToast()
              wx.showToast({
                title: '您说了什么我不太明白',
                icon: 'none',
                duration: 2000
              })
            }
          },  
          fail: function (res) {
            console.log(res)
            wx.showModal({
              title: '提示',
              content: "网络请求失败，请确保网络是否正常",
              showCancel: false,
              success: function (res) {
              }
            })
            wx.hideToast() 
          }
        })
      })
    },
    toPlayDetail () {
      // 开始抢红包
      let type = this.type
      let jumpName = this.jumpName
      let content = ''
      if (type === 3) {
        return false
      }
      if (type === 2) {
        content = this.textContent
      }
      if (type === 1) {
        content = this.picContent
      }
      const url = `../../play-detail/${jumpName}/begin/main?content=${content}&id=${this.id}&gameTime=${this.gameTime}&level=${this.level}`
      wx.navigateTo({url})
    },
    async getPackDetail (sendOutId, shareNo) {
      let that = this
      let memberId = await getStorage('memberId')
      this.request.post('/api/sendOutRecord/detail', {
        memberId: memberId.data,
        shareNo,
        id: sendOutId
      }).then(res => {
        // 红包详情
        that.redDetailInfo = res.data
        that.textContent = res.data.contentText
        that.picContent = res.data.contentImg
        that.gameTime = res.data.timeRange
        that.level = res.data.level
      }).catch(err => {
        console.log(err)
      })
    },
    async initData () {
      // TODO
      let that = this
      let sendOutId = this.$root.$mp.query.id
      let shareNo = this.$root.$mp.query.shareNo
      this.shareNo = await getStorage('shareNo')
      console.log('initData shareNo==>', this.$root.$mp.query)
      this.getPackDetail(sendOutId, shareNo)
      let postParams = {
        sendOutId
      }
      // 调用应用实例的方法获取全局数据
      this.request.post('/api/receiveRecord/listBySendOut', postParams).then(res => {
        that.graberInfoList = res.data.data
      }).catch(err => {
        console.log(err)
      })
      // 拿取分享信息
      this.request.get('/api/shareConfig/queryOne?type=' + this.type).then(res => {
        that.shareInfo = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  onShareAppMessage(res) {
    if (res.from !== 'button') return false
    let url = getCurrentPageUrlWithArgs() + '&shareNo=' + this.shareNo.data
    return {
      title: this.shareInfo.title,
      path: url,
      imageUrl: this.shareInfo.img
    }
  },
  created () {
  },
  onShow () {
    this.checkUserAuth()
  },
  onLoad () {
    this.isShowModal = false
    this.myAudio = wx.createInnerAudioContext() // 调用音频
    this.recorderManager = wx.getRecorderManager() // 调用录音
    this.type = Number(this.$root.$mp.query.type) // 判断是什么红包 语音 文字 拼图
    this.id = Number(this.$root.$mp.query.id) // 红包id
    console.log('onload== shareNo==>', this.$root.$mp.query)
    let titleName = '开口红包'
    this.redBtnName = '按住说出以上口令领取红包'
    this.jumpName = 'vioce'
    if (this.type === 2) {
      titleName = '拼字红包'
      this.redBtnName = '点击拼出上面的文字领红包'
      this.jumpName = 'text'
    } else if (this.type === 1) {
      titleName = '拼图红包'
      this.redBtnName = '点击拼出上面的图片领红包'
      this.jumpName = 'picture'
    }
    wx.setNavigationBarTitle({
      title: titleName
    })
  },
  onUnload () {
      this.curId = ''
      this.jumpName = ''
      this.gameTime = ''
      this.shareInfo = ''
      this.audioWasteTime = 0
      this.level = ''
      this.isShowModal = false
      this.isShowRecord = false
      this.recorderManager = ''
      this.packageInfo = {
        hasPack: false,
        sendOutRecordId: '',
        useTimes: '',
        audioFilePath: ''
      }
      this.redDetailInfo =  {}
      this.textContent = '我叫你一声你敢答应吗'
      this.picContent = ''
      this.headImg = ''
      this.myAudio = ''
      this.redBtnName =  ''
      this.graberInfoList = []
  }
}
</script>

<style>
.detail_box{
  width: 100%;
  height: 100%;
}
.package_box{
  position: fixed;
  width: 100%;
  z-index: 10;
}
.package_info{
  width: 100%;
  background: #FF4347;
  position: relative;
}
.start_record {
  position: absolute;
  top:5%;
  left:35.5%;
  width:220rpx;
  height:220rpx;
  border-radius:8rpx;
  background:rgba(0,0,0,1);
  opacity:0.7;
}
.start_record ._title_tips{
  text-align: center;
  font-size:22rpx;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.start_record .two_icon_record{
  position: relative;
  margin-top:25%;
}
.two_icon_record .hua_tong {
  margin-left:30%;
  opacity: 1;
}
.two_icon_record .hua_tong img{
  width:60rpx;
  height:87rpx;
  color:rgba(255,255,255,1);
}
.two_icon_record .vioce_ {
  position:absolute;
  top:-50%;
  right:0;
}
.two_icon_record .vioce_ img{
  width:218rpx;
  height:200rpx;
}
.info_headimg{
  width: 300rpx;
  height:144rpx;
  padding-top: 44rpx;
  margin: 0 auto;
  text-align: center;
}
.has_received{
  text-align: center;
  font-size:60rpx;
  font-weight:bold;
  color:rgba(255,255,160,1);
}
.has_received span{
  font-size:28rpx;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.receive_info button {
  text-align: right;
  color:rgba(255,255,255,1);
  padding: 0;
  margin: 0;
  display: inline-block;
  background: #f4f4f4;
  font-size:24rpx;
  font-weight:400;
  color:rgba(3,135,195,1);
  border-radius: 0px;
  height: 48rpx;
  line-height: 48rpx;
}
.receive_info button::after{ border: none; }
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
.info_bottom_operation button{
  display:flex;
  align-items:center;
  padding: 0;
  font-size:28rpx;
  margin:0;
  margin-top:81rpx;
  font-weight:400;
  color:rgba(255,255,255,1);
  background: rgba(255,67,71,1) !important;
}
.info_bottom_operation button::after{ border: none; }
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
  width: 150rpx;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  font-size: 24rpx;
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
