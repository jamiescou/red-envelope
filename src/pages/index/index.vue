<template>
  <div class="container">
    <div class="ground_outer" @click="showModal()">
      <div class="ground_inner">
        <div @click="redPackageDetail(item)" class="package_list" v-for="item in packageData" :key="item.createtime">
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
              <img :src="item.sex === '1' ? '../../static/images/male.png' : '../../static/images/female.png'" alt="">
            </div>
          </div>
          <!-- 红包个数金额 -->
          <div class="package_info">
            <div class="package_money">
              ￥{{item.price}}
            </div>
            <div class="package_num">
              {{item.getNum}}/{{item.countNum}}
            </div>
          </div>
          <!-- 红包类型 -->
          <div class="package_type">
            <div class="type_name">
              {{item.pricetype}}
            </div>
            <div class="creat_time">
              {{item.createtime}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      packageData: [
        {
          headImg: '../../static/images/test_img.png',
          nickname: '小黑',
          price: 888,
          pricetype: '语音口令红包',
          createtime: '10-18 10:22',
          sex: '1',
          countNum: 10,
          getNum: 5,
          type: 1
        },
        {
          headImg: '../../static/images/test_img.png',
          nickname: '小明',
          price: 1000,
          pricetype: '拼字红包',
          createtime: '10-17 12:22',
          sex: '1',
          countNum: 8,
          getNum: 3,
          type: 2
        },
        {
          headImg: '../../static/images/test_img.png',
          nickname: '小红',
          price: 666,
          pricetype: '拼图红包',
          createtime: '10-15 10:22',
          sex: '2',
          countNum: 5,
          getNum: 2,
          type: 3
        },
        {
          headImg: '../../static/images/test_img.png',
          nickname: '小黑',
          price: 888,
          pricetype: '拼图红包',
          createtime: '10-18 10:22',
          sex: '2',
          countNum: 10,
          getNum: 5,
          type: 3
        },
        {
          headImg: '../../static/images/test_img.png',
          nickname: '小明',
          price: 1000,
          pricetype: '语音口令红包',
          createtime: '10-17 12:22',
          sex: '2',
          countNum: 8,
          getNum: 3,
          type: 1
        }
      ]
    }
  },

  components: {
  },

  methods: {
    redPackageDetail (detailInfo) {
      let type = detailInfo.type
      wx.navigateTo({
        url: `/pages/red-package/detail/main?type=${type}`
      })
    },
    showModal () {
      this.isShowModal = true
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
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
