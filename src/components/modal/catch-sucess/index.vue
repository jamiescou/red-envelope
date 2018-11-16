<template>
  <div class="catch_success_modal" v-if="isShowModal">
    <div class="modal_mask">
    </div>
    <div class="modal_content"
      style="background: url('http://img.dhqcy.cn/hb/packageout.png') no-repeat fixed center"
      v-if="isShowModal">
      <div class="head_img">
        <img :src="packageInfo.headImg" alt="">
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
  props: ['isShowModal', 'packageInfo'],
  data () {
    return {
      result: 1
    }
  },
  methods: {
    openPackage () {
      let { sendOutRecordId, useTimes, type } = this.packageInfo
      let postParams = {
        memberId: 100132,
        result: 1,
        sendOutRecordId,
        useTime: useTimes
      }
      // 点击开 抢红包
      this.request.post('/api/receiveRecord/gainRedEnvelope', postParams).then(res => {
        this.result = res.data.result
        if (this.result === 1) {
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
