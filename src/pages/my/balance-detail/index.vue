<template>
  <div class="balance_detail_box">
    <scroll-view
      scroll-y
      :style='scrollStyles'
      upper-threshold='50'
      lower-threshold='100'
      @scrolltoupper="upper"
      @scrolltolower="lower"
      @scroll="scroll"
      scroll-top="scrollTop">
      <div class="balance_detail_list" v-for="item in balanceRecordList" :key='item.id'>
        <div class="list_left">
          <div class="item_name">{{item.type === 2 ? banlaceMap[item.type] + '嗨皮哥红包' : banlaceMap[item.type]}}</div>
          <div class="created_time">{{item.createTimeShow}}</div>
        </div>
        <div :class="item.flag === 1 ? 'in_balance' : 'out_balance'">
          {{item.flag === 1 ? '+' : '-'}}{{item.money}}
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      banlaceMap: {
        1: '发出红包',
        2: '收到',
        3: '提现',
        4: '未领完退回',
        5: '失效',
        6: '系统余额变更'
      },
      currentPage: 1,
      totalPage: 1,
      scrollStyles: '',
      balanceRecordList: []
    }
  },
  methods: {
    lower (e) {
      console.log('lower==>>', e)
      let this_ = this
      if (!this_.currentPage || this_.currentPage === this_.totalPage) {
        return
      }
      if (this_.currentPage < this_.totalPage) {
        this_.currentPage++
        if (this_.currentPage > this_.totalPage) {
          wx.hideToast()
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 2000
          })
          return
        }
      }
      this.initData()
    },
    initData () {
      let this_ = this
      let postParams = {
        page: this.currentPage,
        memberId: this.memberId
      }
      // 调用应用实例的方法获取全局数据
      this.request.post('/api/balanceRecord/list', postParams).then(res => {
        this_.totalPage = Math.ceil(res.data.total / res.data.limit)
        if (this_.totalPage > 1) {
          this_.currentPage = parseInt(res.data.page)
        }
        if (res.data.page > 1) {
          this_.balanceRecordList = this_.balanceRecordList.concat(res.data.data)
          console.log('length=>', this.balanceRecordList.length)
          return
        }
        this_.balanceRecordList = res.data.data
        console.log('length=>', this.balanceRecordList.length)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  // async onPullDownRefresh () {
  //   // to doing..
  //   // 停止下拉刷新
  //   wx.stopPullDownRefresh()
  // },
  created () {
  },
  onShow () {
    this.initData()
  },
  onLoad () {
    let that = this
    this.memberId = wx.getStorageSync('memberId')
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        that.scrollStyles = `height: ${res.windowHeight * 0.98}px`
        console.log('style===>>>>>', that.scrollStyles)
        // 计算主体部分高度,单位为px
      }
    })
  },
  onUnload () {
    this.currentPage = 1
    this.totalPage = 1
    this.balanceRecordList = []
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
