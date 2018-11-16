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
                {{item.createTime}}
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>
<script>
import {checkAuthorize, getCurrentPageUrlWithArgs} from '../../utils/index'
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
          console.log('length=>', this.packageData.length)
          return
        }
        this_.packageData = res.data.data
        console.log('length=>', this.packageData.length)
      }).catch(err => {
        console.log(err)
      })
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
    upper (e) {
    },
    lower (e) {
      let this_ = this
      if (!this_.currentPage || this_.currentPage === this_.totalPage) {
        return
      }
      wx.hideToast()
      if (this_.currentPage < this_.totalPage) {
        this_.currentPage++
        if (this_.currentPage > this_.totalPage) {
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 2000
          })
          return
        }
      }
      console.log('currentPage', this.currentPage)
      this.initData()
      console.log('low', e)
    }
  },
  created () {},
  onLoad () {
    let this_ = this
    let url = getCurrentPageUrlWithArgs()
    checkAuthorize('index', this.initData, url)
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        this_.scrollStyles = `height: ${res.windowHeight * 0.94}px`
        // 计算主体部分高度,单位为px
      }
    })
    console.log('我是首页加载测试')
  }
}
</script>

<style scoped>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
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
    overflow: scroll;
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
    margin-left: 15.1%;
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
