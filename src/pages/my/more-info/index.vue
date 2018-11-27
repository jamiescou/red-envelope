<template>
  <div class="more_info_box">
    <div class="modal_item_list" v-for="(item, index) in moreInfoList" :key="index">
      <div class="head_title">
        <div class="title_left">
          {{item.title}}
        </div>
        <div class="more_icon" @click="showMore(item)">
          <img src="../../../../static/images/moreinfo.png" alt="">
        </div>
      </div>
      <div class="info_bottom" v-if="item.isShowMore">
        {{item.ques}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      moreInfoList: [
        {
          title: '开口红怎么玩？',
          ques: '你可以设置一个语音口令红包，好友说出指定口令才能领取红包',
          isShowMore: false
        },
        {
          title: '我支付了但没有发出去？',
          ques: '请在“我的-我的记录”中找到相应的记录，点击进入详情后点击“去转发”可把红包转发出去',
          isShowMore: false
        },
        {
          title: '好友可以转发我的红包么？',
          ques: '可以的，你分享给好友或者转发到微信群，其他好友均可再次转发',
          isShowMore: false
        },
        {
          title: '发红包会收取服务费吗？',
          ques: '发红包收取2%的服务费',
          isShowMore: false
        },
        {
          title: '未领取的金额会怎么样处理？',
          ques: '未领取完的金额会在24小时候退还到您的余额账户，敬请留意',
          isShowMore: false
        },
        {
          title: '如何提现到微信钱包？',
          ques: '请在“我的-我的余额”中或详情页的“去提现”均可跳转至余额提现页面进行提现，提现金额每次至少1元，每天至多提现3次',
          isShowMore: false
        },
        {
          title: '提现会收取服务费吗？多久到账？',
          ques: '提现不收取服务费，提现金额将会在1-5个工作日内打到您的微信钱包，敬请留意。如未及时到账，请联系客服在线咨询',
          isShowMore: false
        },
        {
          title: '如何联系客服？',
          ques: '可以点击上页联系客服按钮联系在线客服，或添加客服微信gaohuan808，客服在线时间：周一至周六9:00-22:00',
          isShowMore: false
        },
        {
          title: '企业能开发票么？',
          ques: '可以，请加微信：gaohuan808 联系具体事宜',
          isShowMore: false
        }
      ]
    }
  },
  methods: {
    showMore (item) {
      item.isShowMore = !item.isShowMore
    }
  },
  created () {
  }
}
</script>
<style>
 .more_info_box{
  position: relative;
  background: #f4f4f4;
  min-height: 100%;
  width: 100%;
  position: fixed;
 }
 .modal_item_list{
   margin: 20rpx 36rpx;
   background: #fff;
 }
 .head_title{
  display: flex;
  padding: 0 16rpx;
  justify-content:space-between;
  align-items: center;
  height:88rpx;
  background:rgba(255,255,255,1);
  border-radius:4rpx 4rpx 0rpx 0rpx;
  border-bottom: 1rpx solid #f4f4f4;
 }
 .head_title .title_left{
    font-size:28rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
 }
 .head_title .more_icon img{
    width:35rpx;
    height:20rpx;
 }
 .info_bottom{
    height: 100%;
    padding: 20rpx 15rpx;
    font-size:28rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
 }
</style>
