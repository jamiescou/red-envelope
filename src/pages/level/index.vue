<template>
  <div class="level_range_box">
    <div class="contain_box">
      <div class="two_btn_level">
        <div class="level_btn_common level_border_left" :class="levelType === 1 ? 'challenge_level' : 'money_level'" @click="changeLevelType(2)">挑战榜</div>
        <div class="level_btn_common level_border_right" :class="levelType === 2 ? 'challenge_level' : 'money_level'" @click="changeLevelType(1)">金额榜</div>
      </div>
      <div class="level_stage">
        <div class="second_level">
          <div class="second_icon"><img :src="topThree[1] && topThree[1].headImg" alt=""></div>
          <div class="second_name three_level_common"><span>{{topThree[1] && topThree[1].nickname}}</span></div>
          <div v-if="levelType === 1" class="second_money three_level_common">¥{{topThree[1] && topThree[1].sumMoney}}</div>
          <div v-if="levelType === 2" class="second_money three_level_common">{{topThree[1] && topThree[1].count}}次</div>
        </div>
        <div class="frist_level">
          <div class="frist_icon"><img :src="topThree[0] && topThree[0].headImg" alt=""></div>
          <div class="frist_name three_level_common"><span>{{topThree[0] && topThree[0].nickname}}</span></div>
          <div v-if="levelType === 1" class="frist_money three_level_common">¥{{topThree[0] && topThree[0].sumMoney}}</div>
          <div v-if="levelType === 2" class="frist_money three_level_common">{{topThree[0] && topThree[0].count}}次</div>
        </div>
        <div class="thrid_level">
          <div class="thrid_icon"><img :src="topThree[2] && topThree[2].headImg" alt=""></div>
          <div class="thrid_name three_level_common"><span>{{topThree[2] && topThree[2].nickname}}</span></div>
          <div v-if="levelType === 1" class="thrid_money three_level_common">¥{{topThree[2] && topThree[2].sumMoney}}</div>
          <div v-if="levelType === 2" class="thrid_money three_level_common">{{topThree[2] && topThree[2].count}}次</div>
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
            {{item.nickname}}
          </div>
          <div v-if="levelType === 1" class="item_balance">
            ￥ {{item.sumMoney}}
          </div>
          <div v-if="levelType === 2" class="item_balance">
            {{item.count}}次
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
      headImg: '../../static/images/test_img.png',
      topThree: [],
      levelType: 2,
      levelList: []
    }
  },
  methods: {
    changeLevelType (type) {
      this.levelType = type
      this.getRangeData(type)
    },
    getRangeData (type) {
      let postParams = {
        page: 1,
        limit: 4,
        memberId: this.memberId,
        type: type
      }
      // 调用应用实例的方法获取全局数据
      this.request.post('/api/receiveRecord/rankingList', postParams).then(res => {
        if (res.data.length <= 2) {
          this.topThree = res.data
        } else {
          this.topThree = res.data.splice(0, 3)
          this.levelList = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  onShow () {
    this.headImg = ''
    this.topThree = []
    this.levelType = 2
    this.levelList = []
    this.initType = 2
    this.memberId = wx.getStorageSync('memberId')
    this.getRangeData(this.initType)
  },
  onUnload () {
    this.headImg = ''
    this.topThree = []
    this.levelType = 2
    this.levelList = []
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
.contain_box{
  width: 100%;
  height: 100%;
  position: fixed;
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
.three_level_common span{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width:160rpx;
  display:inline-block;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 4%;
  width: 30%;
  margin-right: 18%;
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
