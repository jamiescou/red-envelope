<template>
  <div class="my_record_box">
    <div class="tab_change_record">
      <div
        :class="item.active ? 'tab_active tab_common' : 'tab_common'"
        @click="changeTab(item.type)"
        v-for="item in tabData"
        :key='item.type'>
        {{item.name}}
      </div>
    </div>
    <div class="user_record_info">
      <div class="head_img">
        <img :src="userInfo.avatarUrl" alt="">
      </div>
      <div class="name_obtain">
        {{userInfo.nickName}}  共{{packName}}<span>(元)</span>
      </div>
      <div class="_money">
        {{balance}}
      </div>
      <div class="all_count">
        数量<span>{{num}}</span>个
      </div>
    </div>
    <scroll-view scroll-y
          :style='scrollStyles'
          upper-threshold='50'
          lower-threshold='50'
          @scrolltoupper="upper"
          @scrolltolower="lower"
          @scroll="scroll"
          scroll-top="scrollTop">
      <div class="user_record_list">
        <div class="list_item_box" v-for="item in recordList" :key='item.id' @click="backRedPackage(item)">
          <div class="name_balance">
            <div class="_name">
              {{item.type === 1 ? '拼图红包' : item.contentText}}
            </div>
            <div class="_balance">
              ￥ {{item.money}}
            </div>
          </div>
          <div class="date_number">
            <div class="_date">
              {{item.createTime}}
            </div>
            <div class="_number">
              ({{item.giveOffNum}}/{{item.num}})
            </div>
          </div>
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
      headImg: '../../../static/images/test_img.png',
      tabData: [
        {
          type: 1,
          name: '我发出的',
          active: true
        },
        {
          type: 2,
          name: '我收到的',
          active: false
        }
      ],
      balance: '',
      num: '',
      scrollStyles: '',
      userInfo: {},
      packName: '',
      recordList: []
    }
  },
  methods: {
    getCountData (type) {
      let that = this
      let postParams = {
        memberId: this.memberId
      }
      let url = ''
      if (type === 1) {
        this.packName = '发出'
        url = '/api/sendOutRecord/sumSendOutMoney' // 我发出的红包
        // 发出和收到红包总额
        this.request.get(url, postParams).then(res => {
          that.balance = res.data[0].money
          that.num = res.data[0].count
        }).catch(err => {
          console.log(err)
        })
        return
      }
      if (type === 2) {
        this.packName = '收到'
        url = '/api/receiveRecord/sumMoney' // 我收到的
      }
      // 发出和收到红包总额
      this.request.post(url, postParams).then(res => {
        that.balance = res.data[0].money
        that.num = res.data[0].count
      }).catch(err => {
        console.log(err)
      })
    },
    getRecordData (type) {
      let url = '/api/sendOutRecord/listByMember' // 我发出的红包
      if (type === 2) {
        url = '/api/receiveRecord/list' // 我收到的
      }
      let that = this
      let postParams = {
        page: 1,
        limit: 100,
        memberId: this.memberId
      }
      this.request.post(url, postParams).then(res => {
        that.recordList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    changeTab (id) {
      this.type = id
      let tabData = this.tabData
      let tempArr = []
      tabData.forEach(item => {
        if (item.type === id) {
          item.active = true
        } else {
          item.active = false
        }
        tempArr.push(item)
      })
      this.tabData = tempArr
      this.getCountData(id)
      this.getRecordData(id)
    },
    backRedPackage (item) {
      wx.navigateTo(
        {
          url: `/pages/red-package/detail/main?type=${item.type}&id=${item.id}`
        }
      )
    }
  },
  created () {
  },
  onLoad () {
    let that = this
    this.memberId = wx.getStorageSync('memberId')
    this.userInfo = wx.getStorageSync('userInfo')
    this.getCountData(1)
    this.getRecordData(1)
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        that.scrollStyles = `height: ${res.windowHeight}px`
        // 计算主体部分高度,单位为px
      }
    })
  },
  onUnload () {
    this.headImg = '../../../static/images/test_img.png'
    this.tabData = [
      {
        type: 1,
        name: '我发出的',
        active: true
      },
      {
        type: 2,
        name: '我收到的',
        active: false
      }
    ]
    this.balance = ''
    this.num = ''
    this.userInfo = {}
    this.packName = ''
    this.recordList = []
  }
}
</script>
<style>
 .my_record_box{
    position: relative;
    background: #f4f4f4;
    min-height: 100%;
    width: 100%;
    position: fixed;
 }
 .tab_change_record{
   /* tab切换 */
    height:88rpx;
    background:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: space-around;
 }
 .tab_common{
   padding-bottom: 20rpx;
    font-size:28rpx;
    font-weight:400;
    color:rgba(102,102,102,1);
 }
 .tab_active{
    border-bottom: 2rpx solid rgba(255,67,71,1);
    color:rgba(255,67,71,1);
 }
 
 .user_record_info{
   /* 中间部分 */
   margin: 64rpx auto;
   text-align: center;
 }

 .head_img img{
    width:144rpx;
    height:144rpx;
    border-radius:50%;
 }
 .name_obtain{
    font-size:32rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
 }
 .name_obtain span{
    font-size:24rpx;
 }
 ._money{
    font-size:60rpx;
    font-weight:400;
    color:rgba(255,67,71,1);
 }
 .all_count{
    font-size:28rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
 }
 .all_count span{
   color: #FF4347
 }
 .user_record_list{
   /* 底部记录列表 */
   margin: 0 36rpx;
 }
 .list_item_box{
    margin: 20rpx 0;
    padding: 0 20rpx;
    height: 120rpx;
    background: #fff;
 }
 .name_balance{
    padding: 20rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
 }
 ._name{
    font-size:28rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
 }
 ._balance{
    font-size:28rpx;
    font-weight:400;
    color:rgba(255,67,71,1);
 }
 .date_number{
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 ._date{
    font-size:24rpx;
    font-weight:400;
    color:rgba(102,102,102,1);
 }
 ._number{
    font-size:24rpx;
    font-weight:400;
    color:rgba(102,102,102,1);
 }
</style>
