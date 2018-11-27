<template>
  <div class="container">
    <div class="ground_outer" @click="showModal()">
      <div class="ground_inner">
        <scroll-view scroll-y
          :style='scrollStyles'
          upper-threshold='50'
          lower-threshold='50'
          @scrolltoupper="upper"
          @scrolltolower="lower"
          @scroll="scroll"
          scroll-top="scrollTop">
          <div @click="redPackageDetail(item)" class="package_list" v-for="item in packageData" :key="item.id">
            <!-- 头像 -->
            <div class="head_img">
              <img class="_img" :src="item.headImg" alt="">
            </div>
            <!-- 昵称 -->
            <div class="nick_name">
              <div class="_name">
                {{item.nickname}}
              </div>
              <div class="sex_type">
                <img :src="item.sex === 1 ? '../../static/images/male.png' : '../../static/images/female.png'" alt="">
              </div>
            </div>
            <!-- 红包个数金额 -->
            <div class="package_info">
              <div class="package_money">
                ￥{{item.money}}
              </div>
              <div class="package_num">
                {{item.giveOffNum}}/{{item.num}}
              </div>
            </div>
            <!-- 红包类型 -->
            <div class="package_type">
              <div class="type_name">
                {{typeMap[item.type]}}
              </div>
              <div class="creat_time">
                {{item.createTimeShow}}
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <!-- <authorize @getAuthOk='getAuthOk' ref="checkUserAuth"></authorize> -->
  </div>
</template>
<script>
// import authorize from '../../components/modal/authorize/index'
import { getSetting, loginWeChat, setStorage, getStorage } from '../../utils/index'
export default {
  data () {
    return {
      packageData: [],
      scrollTop: 100,
      scrollStyles: '',
      typeMap: {
        1: '拼图红包',
        2: '拼字红包',
        3: '语音口令红包'
      },
      currentPage: 1,
      totalPage: 1
    }
  },
  components: {
    // authorize
  },
  methods: {
    initData () {
      let this_ = this
      let postParams = {
        page: this.currentPage
      }
      // 调用应用实例的方法获取全局数据
      this.request.post('/api/sendOutRecord/list', postParams).then(res => {
        this_.totalPage = Math.ceil(res.data.total / res.data.limit)
        if (this_.totalPage > 1) {
          this_.currentPage = parseInt(res.data.page)
        }
        if (res.data.page > 1) {
          this_.packageData = this_.packageData.concat(res.data.data)
          return
        }
        this_.packageData = res.data.data
      }).catch(err => {
        console.log(err)
      })
      this.addFriendRelationSave()
    },
    async addFriendRelationSave () {
      console.log('this==>>', this)
      let shareNo = this.$root.$mp.query.shareNo
      const memberId = await getStorage('memberId')
      let postData = {
        memberId: memberId.data,
        shareNo
      }
      console.log('postData', postData)
      if (shareNo) {
        let saveFriendRelationInfo = await this.request.post('/api/friendRelation/save', postData)
        console.log('saveFriendRelationInfo', saveFriendRelationInfo)
      }
    },
    async checkUserAuth () {
      console.log('检查是否有授权')
      let this_ = this
      // 判断是否获取授权
      let getSettingInfo = await getSetting()
      // 有授权就登录
      if (getSettingInfo.authSetting['scope.userInfo']) {
        console.log('有授权', getSettingInfo)
        let loginInfo = await loginWeChat()
        console.log('首页获取登录code', loginInfo)
        if (loginInfo.errMsg === 'login:ok') {
          let loginMemberId = await this.request.post('/api/wechat/login', {jscode: loginInfo.code})
          console.log('获取loginMemberId', loginMemberId)
          const memberId = wx.getStorageSync('memberId') || ''
          const token = wx.getStorageSync('memberId') || ''
          if (memberId === loginMemberId.data.memberId && token === loginMemberId.data.token) {
            console.log('已登录')
            let memberInfo = await this.request.get('/api/sys/config/memberInfo', {memberId: loginMemberId.data.memberId})
            await setStorage('shareNo', memberInfo.data.shareNo)
            this_.initData()
          } else {
            // let token = '123456789'
            console.log('鉴定有无数据', loginMemberId && loginMemberId.data && loginMemberId.data.token)
            console.log('未登录loginMemberId', loginMemberId.data.token)
            try { await setStorage('token', loginMemberId.data.token) } catch (err) {
              console.log('errrr', err)
            }
            // try { wx.setStorageSync('token', loginMemberId.data.token) } catch (err) {
            //   console.log('errrr', err)
            // }
            await setStorage('memberId', loginMemberId.data.memberId)
            let memberInfo = await this.request.get('/api/sys/config/memberInfo', {memberId: loginMemberId.data.memberId})
            console.log('未登录memberInfo', memberInfo)
            await setStorage('shareNo', memberInfo.data.shareNo)
            // try {
            //   await setStorage('shareNo', memberInfo.data.shareNo)
            //   await setStorage('memberId', loginMemberId.data.memberId)
            //   await setStorage('token', loginMemberId.data.token)
            // } catch (err) {
            //   wx.showToast(err)
            // }
            this_.initData()
          }
        }
      } else {
        console.log('无授权')
        wx.navigateTo({
          url: '../authorize/main'
        })
      }
    },
    redPackageDetail (detailInfo) {
      let type = detailInfo.type
      wx.navigateTo({
        url: `/pages/red-package/detail/main?type=${type}&id=${detailInfo.id}`
      })
    },
    showModal () {
      this.isShowModal = true
    },
    lower (e) {
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
    }
  },
  onShow () {
    this.packageData = []
    this.currentPage = 1
    this.totalPage = 1
    this.checkUserAuth()
  },
  onLoad () {
    let this_ = this
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        this_.scrollStyles = `height: ${res.windowHeight * 0.94}px`
        // 计算主体部分高度,单位为px
      }
    })
    console.log('我是首页加载测试')
  },
  onUnload () {
    this.packageData = []
    this.currentPage = 1
    this.totalPage = 1
  }
}
</script>

<style scoped>
  .container {
  }
  .ground_outer{
    width: 100%;
    height: 100%;
    background: #FF4347;
    position: fixed;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
  }
  .ground_inner{
    width: 92%;
    height: 94%;
    background: white;
    background:rgba(255,255,255,1);
    border-radius:10rpx;
  }
  .package_list{
    height: 148rpx;
    margin: 24rpx 10rpx;
    background:rgba(244,244,244,1);
    display: flex;
    align-items: center;
  }
  .head_img{
    width: 88rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    margin-left: 16rpx;
  }
  .head_img img{
    width: 88rpx;
    height: 88rpx;
    border-radius: 4rpx;
  }
  .nick_name{
    margin-left: 3.6%;
    width: 15%;
  }
  .nick_name ._name{
    width:160rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:14px;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .nick_name .sex_type{
    font-size: 20rpx;
  }
   .nick_name .sex_type img{
     width: 19rpx;
     height: 19rpx;
   }
  .package_info{
    margin-left: 10%;
    width: 20%;
    text-align: center;
  }
  .package_info .package_money{
    font-size:28rpx;
    font-weight:400;
    color:rgba(255,67,71,1);
  }
  .package_info .package_num{
    font-size:24rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .package_type{
    margin-left: 10%;
    width: 30%;
  }
  .package_type .type_name{
    font-size:28rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .package_type .creat_time{
    font-size:24rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
</style>
