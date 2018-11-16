<template>
  <div class="balance_detail_box">
    <div class="balance_detail_list" v-for="item in balanceRecordList" :key='item.id'>
      <div class="list_left">
        <div class="item_name">{{item.remark}}</div>
        <div class="created_time">{{item.createTime}}</div>
      </div>
      <div :class="item.flag === 1 ? 'in_balance' : 'out_balance'">
        {{item.flag === 1 ? '+' : '-'}}{{item.money}}
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
      balanceRecordList: [
        {
          itemName: '创建红包',
          id: 1,
          createdTime: '2018-12-22  21:55',
          money: 100,
          flag: 2
        },
        {
          id: 2,
          itemName: '领取-哈皮哥的红包',
          createdTime: '2018-12-22  21:55',
          money: 8.88,
          flag: 1
        },
        {
          id: 3,
          itemName: '领取-哈皮姐的红包',
          createdTime: '2018-12-22  21:55',
          money: 18.88,
          flag: 1
        },
        {
          id: 4,
          itemName: '领取-哈的红包',
          createdTime: '2018-12-22  21:55',
          money: 6.88,
          flag: 1
        },
        {
          id: 5,
          itemName: '领取-都是对的的红包',
          createdTime: '2018-12-22  21:55',
          money: 88.88,
          flag: 1
        }
      ]
    }
  },
  methods: {
  },
  created () {
  },
  onLoad () {
    let that = this
    let postParams = {
      page: 1,
      limit: 10,
      memberId: 100132
    }
    // 调用应用实例的方法获取全局数据
    this.request.post('/api/balanceRecord/list', postParams).then(res => {
      that.balanceRecordList = res.data.data
    }).catch(err => {
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    })
  }
}
</script>

<style>
 .balance_detail_box{
   position: fixed;
   width: 100%;
   height: 100%;
 }
 .balance_detail_list{
   display: flex;
   justify-content: space-between;
   align-items: center;
   border-bottom: 2rpx solid #f4f4f4;
   height: 118rpx;
   padding: 0 37rpx;
 }
 .list_left .item_name{
    font-size:28rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
    margin-bottom: 28rpx;
 }
 .list_left .created_time{
    font-size:24rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
 }
 .in_balance{
    color:#FF4347;
    font-size:32rpx;
    font-weight:400;
 }
 .out_balance{
    font-size:32rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
 }
</style>
