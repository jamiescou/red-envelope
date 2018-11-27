<template>
  <div class="catch_success_modal" v-if="isShowModal">
    <div class="modal_mask">
    </div>
    <div class="modal_content"
      style="background: url('http://img.dhqcy.cn/hb/packageout.png') no-repeat fixed center"
      v-if="isShowModal">
      <div class="head_img">
        <img :src="headImg" alt="">
      </div>
      <div class="modal_tips" v-if="result === 1">
        <!-- 恭喜你答对了 -->
        <img class="_success" src="../../../../static/images/answe_right.png" alt="">
      </div>
      <div class="modal_tips" v-if="result === 2">
        <!--恭喜你答对了 但手速慢了  -->
        <img class="_fail" src="../../../../static/images/find_out.png" alt="">
      </div>
      <div class="open_package" v-if="result === 1">
        <img  @click="openPackage()" src="http://img.dhqcy.cn/hb/open_package.png" alt="">
      </div>
      <div class="check_pack_detail" v-if="result === 2" @click="checkDetailPack()">
        查看领取详情 <span>></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isShowModal', 'packageInfo', 'callBackModal'],
  data () {
    return {
      result: 1,
      headImg: ''
    }
  },
  methods: {
    openPackage () {
      let that = this
      let { sendOutRecordId, useTimes, type, audioFilePath } = this.packageInfo
      if (type === 3) {
        setTimeout(function () {
          // 上传录音
          let urls = 'https://hbbeta.dhchecheng.com/api/upload/audio'
          wx.uploadFile({
            url: urls,
            filePath: audioFilePath,
            name: 'file',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {
              sendOutRecordId
            },
            success: function (res) {
              console.log('点击开上传语音', res)
              let dataRes = JSON.parse(res.data)
              if (dataRes.code === '200') {
                let postParams = {
                  memberId: that.memberId,
                  result: 1,
                  sendOutRecordId,
                  useTime: useTimes,
                  audio: dataRes.data.url
                }
                console.log('点击开准备抢红包的参数', postParams)
                // 点击开 抢红包
                that.request.post('/api/receiveRecord/gainRedEnvelope', postParams).then(resp => {
                  console.log('点击开抢到红包的返回', resp)
                  that.result = resp.data.result
                  if (that.result === 1) {
                    console.log('点击开抢到红包的返回', that.result)
                    that.$emit('callBackModal', false)
                  }
                }).catch(err => {
                  console.log(err)
                })
              }
            },
            fail: function (res) {
              wx.showModal({
                title: '提示',
                content: '网络请求失败，请确保网络是否正常',
                showCancel: false,
                success: function (res) {
                }
              })
            }
          })
        })
        return
      }
      let postParams = {
        memberId: that.memberId,
        result: 1,
        sendOutRecordId,
        useTime: useTimes
      }
      // 点击开 抢红包
      that.request.post('/api/receiveRecord/gainRedEnvelope', postParams).then(res => {
        that.result = res.data.result
        if (that.result === 1) {
          that.$emit('callBackModal', false)
          wx.redirectTo({
            url: `/pages/red-package/detail/main?type=${type}&id=${sendOutRecordId}`
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    checkDetailPack () {
      let {type, sendOutRecordId} = this.packageInfo // 区分是什么红包
      wx.redirectTo({
        url: `/pages/red-package/detail/main?type=${type}&id=${sendOutRecordId}`
      })
    }
  },
  created () {
    // 获取余额
    let that = this
    this.memberId = wx.getStorageSync('memberId')
    this.request.get('/api/sys/config/memberInfo', {memberId: this.memberId}).then(res => {
      that.headImg = res.data.headImg
    }).catch(err => {
      console.log(err)
    })
  },
  onShow () {
  },
  onLoad () {
    this.memberId = wx.getStorageSync('memberId')
  },
  onHide () {
    this.isShowModal = false
  },
  onUpload () {
    this.isShowModal = false
  }
}
</script>

<style>
  .catch_success_modal{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    left:0;
    top:0;
  }
  .catch_success_modal .modal_mask{
    width: 100%;
    height: 100%;
    position: fixed;
    background:rgba(0,0,0,1);
    opacity:0.4;
    z-index:-1;
  }
  .catch_success_modal .modal_content{
    position: relative;
    z-index: 999;
    width: 80%;
    height: 68%;
    margin: 0 auto;
    margin-top: 20%;
    background:rgba(255,67,71,1);
    border-radius:20rpx;
    background-size: cover;
    background-repeat:no-repeat;
    background-position:center;
    background-origin:content-box;
  }
  .catch_success_modal .modal_content .head_img{
    margin: 0 auto;
    text-align:center;
    /* padding-top:35rpx; */
    /* padding-bottom: 54rpx; */
    padding-top:4%;
    padding-bottom:8%;
  }
  .catch_success_modal .modal_content .head_img img{
    width:144rpx;
    height:144rpx;
    background:rgba(255,67,71,1);
    border:4rpx solid rgba(255, 255, 255, 0.3);
    border-radius:50%;
  }
  .modal_tips{
    text-align: center;
    margin: 2% 0;
  }
  .modal_tips ._success{
    width: 50%;
    height: 34rpx;
  }
  .modal_tips ._fail{
    width: 70%;
    height: 72rpx;
  }
  .open_package{
    margin: 0 auto;
    text-align: center;
    padding-bottom: 40%;
  }
  .open_package img{
    width:200rpx;
    height:200rpx;
    background:rgba(255,255,160,1);
    border-radius:50%;
  }
  .check_pack_detail{
    position: absolute;
    line-height: 24rpx;
    bottom: 52rpx;
    left: 38%;
    font-size:24rpx;
    font-weight:400;
    color:rgba(255,255,160,1);
    text-align: center;
  }
  .check_pack_detail span{
    width:12rpx;
    height:20rpx;
  }
</style>
