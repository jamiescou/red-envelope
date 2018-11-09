<template>
  <div class="play_style_box">
    <div class="my_info_box">
      <div class="head_top">
        <div class="head_img">
          <img :src="headImg" alt="">
        </div>
      </div>
      
      <div class="my_info_bottom">
        <div class="my_record">
          <div class="_record_img">
            <img src="../../../static/images/myrecord.png" alt="">
          </div>
          <div class="title_text">
            我的记录
          </div>
          
        </div>
        <div class="my_remain_balance">
          <div class="_balance">
            8.88
          </div>
          <div class="title_text">
            我的余额
          </div>
          
        </div>
        <div class="contact_customer_service">
          <div class="_customer_img">
            <img src="../../../static/images/customer.png" alt="">
          </div>
          <div class="title_text">
            联系客服
          </div>
        </div>
      </div>
      <div class="any_question">
        常见问题
      </div>
    </div>
    <div class="more_play bottom_common">
      <div class="_title">更多玩法</div>
      <div class="_next_step">></div>
    </div>
    <div class="invited_friend bottom_common">
      <div class="_title">推荐给朋友</div>
      <div class="_next_step">></div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      headImg: '../../static/images/test_img.png'

    }
  },
  created () {
  }
}
</script>

<style>
 .my_info_box{
    position: relative;
    padding-bottom: 30rpx;
    border-bottom: 10rpx solid #f4f4f4;
 }
 .my_info_box .head_top{
    height:365rpx;
    display: flex;
    justify-content: center;
    align-items: center;
 }
 .my_info_box .head_top .head_img{
    width:144rpx;
    height:144rpx;
    border-radius:50%;
 }
  .my_info_box .head_top .head_img img{
    width:144rpx;
    height:144rpx;
    border-radius:50%;
  }
  .my_info_box .my_info_bottom{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 5%;
  }
  .my_info_box .my_info_bottom .my_record{
    font-size:24rpx;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(102,102,102,1);
    text-align: center;
    width: 33%;
    border-right: 2rpx solid rgba(244,244,244,1);
  }
  .my_info_box .my_info_bottom .my_remain_balance{
    font-size:24rpx;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(102,102,102,1);
    text-align: center;
    margin:0 auto;
    width: 33%;
    border-right: 2rpx solid rgba(244,244,244,1);
  }
  .my_info_box .my_info_bottom .contact_customer_service{
    font-size:24rpx;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(102,102,102,1);
    text-align: center;
    width: 33%;
  }
  .my_info_bottom .my_record ._record_img{
    width: 32rpx;
    height: 32rpx;
    margin: 0 auto
  }
  .my_info_bottom .my_record ._record_img img{
    width: 32rpx;
    height: 32rpx;
  }
  .my_info_bottom .my_remain_balance ._balance{
    font-size:28rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
    
  }
  .my_info_bottom .contact_customer_service ._customer_img{
    width:32rpx;
    height:32rpx;
    margin: 0 auto
  }
  .my_info_bottom .contact_customer_service ._customer_img img{
    width:32rpx;
    height:23rpx;
  }
  .my_info_bottom .title_text{
    margin-top: 14rpx;
  }
  .my_info_box .any_question{
    background:rgba(255,255,255,1);
    border:1px solid rgba(207,207,207,1);
    border-radius:18rpx;
    text-align: center;
    position: absolute;
    font-size:24rpx;
    font-weight:400;
    width:128rpx;
    height:36rpx;
    color:rgba(153,153,153,1);
    right: 42rpx;
    top: 68rpx;
  }
  .bottom_common{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 38rpx;
    height: 88rpx;
    border-bottom: 2rpx solid #f4f4f4;
  }
  .bottom_common ._title{
    font-size:28rpx;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .bottom_common ._next_step{
    color:rgba(51,51,51,1);
  }

</style>
