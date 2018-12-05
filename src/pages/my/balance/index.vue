<template>
  <div class="balance_cash_box">
    <div class="my_count">
      <div class="count_balance_detail" @click="balanceDetail()">收支明细</div>
      <div class="my_balance">
        <img src="../../../../static/images/balance.png" alt="">我的余额
      </div>
      <div class="_money_">
        ￥ {{balance}}
      </div>
      <div class="checkout_cash">
        <span class="icon_money">￥</span>
        <input type="digit" placeholder="请输入要提现的金额" v-model="money" @change="changeCash" placeholder-class="money_placehold"/>
        <span class="all_checkout" @click="allCheckOut()">全部提现</span>
      </div>
      <div class="cash_checking">
        <div class="checking_">
          提现中金额
        </div>
        <div class="cash_">
          {{allreadyMoney}}
        </div>
      </div>
    </div>
    <div class='checkout_real_btn' @click="rewithdraw()">
      提现
    </div>
    <div class="checkout_tips">
      提现金额将在1-5个工作日打到微信零钱提现不收取手续费
    </div>
    <div class="more_info" @click="moreInfoClick">
      常见问题
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      money: '',
      balance: '',
      allreadyMoney: '',
      allchecked: false
    }
  },
  methods: {
    allreadyChecked () {
      // 提现中
      let that = this
      let postParams = {
        memberId: this.memberId
      }
      this.request.get('/api/drawCaseRecord/inApplyByMember', postParams).then(res => {
        that.allreadyMoney = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    moreInfoClick () {
      wx.navigateTo({
        url: '../more-info/main'
      })
    },
    allCheckOut () {
      this.allchecked = true
      this.money = this.balance
    },
    balanceDetail () {
      wx.navigateTo({
        url: '../balance-detail/main'
      })
    },
    changeCash (e) {
      this.money = e.target.value
      if (this.allchecked) {
        this.money = this.balance
        this.allchecked = false
      }
    },
    rewithdraw () {
      // 提现
      if (this.money === '') {
        return
      }
      let that = this
      let postParams = {
        money: this.money,
        memberId: this.memberId
      }
      // 调用应用实例的方法获取全局数据
      this.request.post('/api/drawCaseRecord/apply', postParams).then(res => {
        if (res.code === '12007') {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          return
        }
        that.recordList = res.data.data
        wx.showToast({
          title: '已申请',
          icon: 'none'
        })
        that.initData()
        that.allreadyChecked()
      })
    },
    initData () {
      let that = this
      this.memberId = wx.getStorageSync('memberId')
      let postParams = {
        memberId: this.memberId
      }
      // 调用应用实例的方法获取全局数据
      this.request.get('/api/sys/config/memberInfo', postParams).then(res => {
        that.balance = res.data.money
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
  },
  onShow () {
    this.initData()
    this.allreadyChecked()
  },
  onLoad () {
    // let that = this
    this.memberId = wx.getStorageSync('memberId')
  },
  onUnload () {
    this.money = ''
    this.balance = ''
    this.allreadyMoney = ''
    this.allchecked = false
  }
}
</script>
<style>
 .balance_cash_box{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #f4f4f4;
 }
 .money_placehold{
    text-align: left;
    font-size:28rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
 }
 .checkout_cash{
   border-bottom: 2rpx solid #f4f4f4;
   border-top: 2rpx solid #f4f4f4;
   padding: 0 37rpx;
   height: 86rpx;
   display: flex;
   align-items: center;
   justify-content: space-between;
 }
 .checkout_cash .icon_money{
    font-size:36rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
 }
 .checkout_cash input{
   text-align: left;
 }
 .checkout_cash .all_checkout{
    font-size:28rpx;
    font-weight:400;
    color:rgba(3,135,195,1);
 }
 .cash_checking{
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 37rpx;
   height: 88rpx;
 }
 .cash_checking .checking_{
    font-size:28rpx;
    font-weight:400;
    color:rgba(102,102,102,1);
 }
 .cash_checking .cash_{
    font-size:28rpx;
    font-weight:400;
    color:rgba(255,67,71,1);
 }
 .my_count{
    position: relative;
    margin: 0 auto;
    text-align: center;
    background: #fff;
 }
 .count_balance_detail{
    right:36rpx;
    top:20rpx;
    width:128rpx;
    height:36rpx;
    position: absolute;
    font-size:24rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
    background:rgba(255,255,255,1);
    border:1rpx solid rgba(207,207,207,1);
    border-radius:18rpx;
 }
 .my_count ._money_{
    margin-top: 53rpx;
    margin-bottom: 56rpx;
    font-size:48rpx;
    font-weight:bold;
    color:rgba(1,0,0,1);
 }
 .my_balance{
    padding-top: 110rpx;
    font-size:28rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
 }
 .my_balance img{
    margin-right: 10rpx;
    vertical-align: middle;
    width:24rpx;
    height:28rpx;
 }
 .checkout_real_btn{
    text-align: center;
    width: 80%;
    margin: 160rpx auto 42rpx;
    height: 88rpx;
    font-size:28rpx;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 88rpx;
    background:rgba(10,184,9,1);
    border-radius:4rpx;
 }
 .checkout_tips{
    text-align: center;
    font-size:24rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
 }
 .more_info{
    position: absolute;
    bottom: 30rpx;
    left:44%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    font-size:24rpx;
    font-weight:400;
    color:rgba(3,135,195,1);
 }
</style>
