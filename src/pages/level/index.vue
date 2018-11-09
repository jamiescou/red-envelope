<template>
  <div class="level_range_box">
    <div class="two_btn_level">
      <div class="level_btn_common level_border_left" :class="levelType === 0 ? 'challenge_level' : 'money_level'" @click="changeLevelType(1)">挑战榜</div>
      <div class="level_btn_common level_border_right" :class="levelType === 1 ? 'challenge_level' : 'money_level'" @click="changeLevelType(0)">金额榜</div>
    </div>
    <div class="level_stage">
      <div class="second_level">
        <div class="second_icon"><img :src="topThree[1] && topThree[1].headImg" alt=""></div>
        <div class="second_name three_level_common">{{topThree[1] && topThree[1].nickName}}</div>
        <div v-if="levelType === 0" class="second_money three_level_common">¥{{topThree[1] && topThree[1].balance}}</div>
        <div v-if="levelType === 1" class="second_money three_level_common">{{topThree[1] && topThree[1].moreTimes}}次</div>
      </div>
      <div class="frist_level">
        <div class="frist_icon"><img :src="topThree[0] && topThree[0].headImg" alt=""></div>
        <div class="frist_name three_level_common">{{topThree[0] && topThree[0].nickName}}</div>
        <div v-if="levelType === 0" class="frist_money three_level_common">¥{{topThree[0] && topThree[0].balance}}</div>
        <div v-if="levelType === 1" class="frist_money three_level_common">{{topThree[0] && topThree[0].moreTimes}}次</div>
      </div>
      <div class="thrid_level">
        <div class="thrid_icon"><img :src="topThree[2] && topThree[2].headImg" alt=""></div>
        <div class="thrid_name three_level_common">{{topThree[2] && topThree[2].nickName}}</div>
        <div v-if="levelType === 0" class="thrid_money three_level_common">¥{{topThree[2] && topThree[2].balance}}</div>
        <div v-if="levelType === 1" class="thrid_money three_level_common">{{topThree[2] && topThree[2].moreTimes}}次</div>
      </div>
    </div>
    <div class="level_list">
      <div class="level_list_item" v-for="(item, index) in levelList" :key="index">
        <div class="item_index">
          {{index + 4}}
        </div>
        <div class="item_head_img">
          <img :src="item.headImg" alt="">
        </div>
        <div class="item_nickname">
          {{item.nickName}}
        </div>
        <div v-if="levelType === 0" class="item_balance">
          ￥ {{item.balance}}
        </div>
        <div v-if="levelType === 1" class="item_balance">
          {{item.moreTimes}}次
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
      headImg: '../../static/images/test_img.png',
      topThree: [],
      levelType: 1,
      levelList: [
        {
          headImg: '../../static/images/test_img.png',
          nickName: '时代大厦',
          balance: 888,
          moreTimes: 100
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '似懂非懂',
          balance: 777,
          moreTimes: 99
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '复古风格',
          balance: 666,
          moreTimes: 88
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '放的地方11111',
          balance: 88,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '电放费',
          balance: 99.88,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '似懂非懂',
          balance: 44,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '复古风格',
          balance: 66,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '放的地方',
          balance: 88,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '电放费',
          balance: 99.88,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '放的地方11111',
          balance: 88,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '电放费',
          balance: 99.88,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '似懂非懂',
          balance: 44,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '复古风格',
          balance: 66,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '放的地方',
          balance: 88,
          moreTimes: 55
        },
        {
          headImg: '../../static/images/test_img.png',
          nickName: '电放费',
          balance: 99.88,
          moreTimes: 55
        }
      ]
    }
  },
  methods: {
    changeLevelType (type) {
      this.levelType = type
    }
  },
  created () {
  },
  mounted () {
    this.topThree = this.levelList.splice(0, 3)
    console.log('mounte', this.topThree)
  }
}
</script>

<style>
.level_range_box{
  width: 100%;
  height: 100%;
  background: #FF4347;
  display:-webkit-box;
	-webkit-box-orient:vertical;
}
.two_btn_level{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20rpx 0 28rpx 0;  
}
.level_btn_common{
  width:27.6%;
  height:68rpx;
  line-height: 68rpx;
  text-align: center;
  border:1rpx solid rgba(255,255,160,1);
  font-size:24rpx;
  font-weight:400;
}
.two_btn_level .challenge_level{
  background:rgba(255,67,71,1);
  color:rgba(255,255,255,1);
}
.level_border_left{
  border-radius:34rpx 0rpx 0rpx 34rpx;
}
.level_border_right{
  border-radius:0rpx 34rpx 34rpx 0rpx;
}
.two_btn_level .money_level{
  background:rgba(255,255,160,1);
  color:rgba(255,67,71,1);
}
.level_stage{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.second_level{
  text-align: center;
  margin: 0 auto;
  width: 33%;
}
.second_level .second_icon{
  background-image: url('../../../static/images/level2.png');
  background-size:134rpx 183rpx;
  background-repeat:no-repeat;
  background-position:center;
  background-origin:content-box;
  width: 120rpx;
  height: 183rpx;
  display: flex;
  align-items: flex-end;
  padding:10% 25%;
}
.second_level .second_icon img{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-bottom:9rpx;
  margin-right:2rpx;
}
.frist_level{
  width: 33%;
  text-align: center;
  margin: 0 auto;
}
.frist_level .frist_icon{
  background-image: url('../../../static/images/level1.png');
  width: 144rpx;
  height: 211rpx;
  background-repeat:no-repeat;
  background-position:center;
  background-origin:content-box;
  display: flex;
  background-size:158rpx 210rpx;
  align-items: flex-end;
  padding:6% 25%;
}
.frist_level .frist_icon img{
  width: 144rpx;
  height: 144rpx;
  border-radius: 50%;
  margin-bottom:7rpx;
  margin-right:2rpx;
}
.thrid_level{
  width: 33%;
  text-align: center;
  margin: 0 auto;
}
.thrid_level .thrid_icon{
  background-image: url('../../../static/images/level3.png');
  width: 120rpx;
  height: 183rpx;
  background-repeat:no-repeat;
  background-position:center;
  background-origin:content-box;
  display: flex;
  align-items: flex-end;
  padding:10% 25%;
  background-size: 132rpx 182rpx;
}
.thrid_level .thrid_icon img{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-bottom:8rpx;
  margin-right:2rpx;
}
.three_level_common{
  font-size:28rpx;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.level_list{
  margin: 0 36rpx;
  padding-left: 30rpx;
  margin-top: 31rpx;
  width:87%;
  background: #fff;
  position: fixed;
  height: 100%;
  overflow-y: scroll;
  border-radius:10rpx 10rpx 0rpx 0rpx;
  position: relative;
	-webkit-box-flex:1;
	-webkit-flex:1;
	flex:1;
	overflow:auto;
	-webkit-overflow-scrolling:touch;

}
.level_list_item{
  display: flex;
  align-items: center;
  margin: 15rpx 0;
}
.level_list_item .item_index{
  margin-right: 6%;
  font-size:24rpx;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.level_list_item .item_head_img{
  /* margin-right: 5%; */
  border-bottom: 2rpx solid #f4f4f4;
}
.level_list_item .item_head_img img{
  width:88rpx;
  height:88rpx;
  border-radius:50%;
}
.level_list_item .item_nickname{
  padding-left: 4%;
  width: 48%;
  font-size:28rpx;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height: 98rpx;
  border-bottom: 2rpx solid #f4f4f4;
}
.level_list_item .item_balance{
  width: 27%;
  text-align: center;
  border-bottom: 2rpx solid #f4f4f4;
  font-size:28rpx;
  font-weight:400;
  line-height: 98rpx;
  color:rgba(255,67,71,1);
}
</style>
