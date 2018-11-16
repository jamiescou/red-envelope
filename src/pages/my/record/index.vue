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
        <img :src="headImg" alt="">
      </div>
      <div class="name_obtain">
        哈皮哥  共收到<span>(元)</span>
      </div>
      <div class="_money">
        8.88
      </div>
      <div class="all_count">
        数量<span>3</span>个
      </div>
    </div>
    <div class="user_record_list">
      <div class="list_item_box" v-for="item in recordList" :key='item.id' @click="backRedPackage(id)">
        <div class="name_balance">
          <div class="_name">
            {{item.contentText}}
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
      recordList: []
    }
  },
  methods: {
    getRecordData (type) {
      let url = '/api/sendOutRecord/listByMember' // 我发出的红包
      if (type === 2) {
        url = '/api/receiveRecord/list'
      }
      let that = this
      let postParams = {
        page: 1,
        limit: 10,
        memberId: 100132
      }
      // 调用应用实例的方法获取全局数据
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
      this.getRecordData(id)
    },
    backRedPackage (id) {
      wx.navigateTo(
        {
          url: `/pages/red-package/detail/main?type=1`
        }
      )
    }
  },
  created () {
  },
  onLoad () {
    this.getRecordData(1)
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
