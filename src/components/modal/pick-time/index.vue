<template>
  <div class="pick_time_modal" v-if="isShowTimeModal">
    <div class="modal_mask">
    </div>
    <div class="modal_content"
      v-if="isShowTimeModal">
      <div class="time_title">
        选择时间
      </div>
      <div class="time_items">
        <div
          class="time_seconds"
          :class="item.isSelect ? 'active_time' : ''"
          @click="chooseTimes(item)"
          v-for="item in timeArray"
          :key='item.seconds'>
          {{item.seconds}}s
        </div>
      </div>
      <div class="custom_set">
        <div class="_title">自定义</div>
        <div class="field_time">
          <input @change="fieldTimeData" type='number' placeholder-class="place-holder" placeholder="填写时间" />
          <span class="_fixed">s</span>
        </div>
      </div>
      <div class="set_time_btn" @click="setTimeClick()">
        确定
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['isShowTimeModal', 'setTimeCallBack'],
  data () {
    return {
      timerData: 15,
      valueTime: '',
      timeArray: [
        {seconds: 15, isSelect: true},
        {seconds: 30, isSelect: false},
        {seconds: 45, isSelect: false},
        {seconds: 60, isSelect: false}
      ]
    }
  },
  methods: {
    chooseTimes (item) {
      this.timerData = item.seconds
      let tempChooseTime = this.timeArray
      tempChooseTime.forEach(info => {
        info.isSelect = false
        if (item.seconds === info.seconds) {
          info.isSelect = true
        }
      })
    },
    fieldTimeData (e) {
      if (e.target.value !== '') {
        this.timerData = e.target.value
        let tempChooseTimeArr = this.timeArray
        tempChooseTimeArr.forEach(info => {
          info.isSelect = false
        })
      }
    },
    setTimeClick () {
      this.$emit('setTimeCallBack', this.timerData, false)
      this.isShowTimeModal = false
    }
  },
  created () {
  }
}
</script>

<style>
  .pick_time_modal{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    left:0;
    top:0;
  }
  .pick_time_modal .modal_mask{
    width: 100%;
    height: 100%;
    position: fixed;
    background:rgba(0,0,0,1);
    opacity:0.4;
    z-index:-1;
  }
  .pick_time_modal .modal_content{
    position: relative;
    background:rgba(255,255,255,1);
    border-radius:20px;
    z-index: 999;
    width: 80%;
    height: 40%;
    margin: 0 auto;
    margin-top: 45%;
    border-radius:20rpx;
    background-size: cover;
    background-repeat:no-repeat;
    background-position:center;
    background-origin:content-box;
  }
  .pick_time_modal .time_title{
    padding-top: 35rpx;
    padding-bottom: 45rpx;
    text-align: center;
    font-size:28rpx;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .pick_time_modal .time_items{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 40rpx;
  }
  .active_time{
    border:1px solid rgba(231,46,45,1) !important;
    color:rgba(231,46,45,1) !important;
  }
  .pick_time_modal .time_seconds{
    width:68rpx;
    height:68rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border:1rpx solid rgba(153,153,153,1);
    border-radius:50%;
    font-size:28rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .pick_time_modal .custom_set{
    display: flex;
    align-items: center;
    margin:63rpx 40rpx 45rpx 44rpx;
  }
  .pick_time_modal .custom_set ._title{
    font-size:28rpx;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-right:12rpx;
  }
  .pick_time_modal .field_time{
    display: flex;
    align-items: center;
    font-size:28rpx;
    font-weight:400;
    color:rgba(51,51,51,1);
    border-bottom: 2rpx solid #f4f4f4;
    flex: 1;
    justify-content: flex-end;
  }
  .pick_time_modal .field_time .place-holder{
    font-size:28rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
 .pick_time_modal .field_time  input{
    font-size:28rpx;
    color: #999;
    padding-bottom: 10rpx;
  }
  .pick_time_modal .set_time_btn{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:28rpx;
    font-weight:400;
    color:rgba(255,255,255,1);
    height:68rpx;
    background:rgba(231,46,45,1);
    border-radius:10rpx;
  }
</style>
