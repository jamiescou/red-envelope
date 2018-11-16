<template>
  <div class="material_box">
    <div class="material_left">
      <div class="left_item" :class="item.active ? 'active_class' : ''" v-for="item in fristItem" :key="item.id" @click="chooseItem(item.id)">
        {{item.categoryName}}
      </div>
    </div>
    <div class="material_right">
      <div v-if="type !== 'pic'" class="right_title" @click="getMaterialData(el.contentText, el.id)" :class="index === 0 ? '_margin_top' : ''" v-for="(el, index) in secondItem" :key="el._id">{{el.contentText}}</div>
      <div v-if="type === 'pic'" class="right_picture">
        <div class="pic_list"  @click="getMaterialData(info.contentImg, info.id)"  v-for="info in secondItem" :key="info._id">
          <img :src="info.contentImg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {getCurrentPageUrlWithArgs} from '../../utils/index'
export default {
  components: {
  },
  data () {
    return {
      itemId: '', // 区分语音的 普通话 英语 粤语
      contentId: '', // 用户选择的素材id
      type: '',
      typeMap: { // 区分是什么素材  图片 文字  语音
        vioce: 3,
        pic: 1,
        text: 2
      },
      materialData: '', // 用户选择的素材
      secondItem: [],
      fristItem: []
    }
  },
  methods: {
    getRightData (categoryId) {
      // 获取素材
      let that = this
      let postParams = {
        limit: 10,
        page: 1,
        categoryId
      }
      // 调用应用实例的方法获取全局数据
      this.request.post('/api/content/contentList', postParams).then(res => {
        that.secondItem = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    chooseItem (id) {
      let tempData = []
      this.fristItem.forEach(item => {
        if (item.id === id) {
          item.active = true
        } else {
          item.active = false
        }
        tempData.push(item)
      })
      this.fristItem = tempData
      this.getRightData(id)
    },
    getMaterialData (text, id) {
      // 回调给父页面数据
      wx.navigateBack({
        delta: 1
      })
      this.materialData = text
      this.contentId = id
    }
  },
  created () {
  },
  onShow () {
    this.itemId = this.$root.$mp.query.id
    this.type = this.$root.$mp.query.type
    let that = this
    let packType = this.type // 通过上页发来的字符串类型（vioce，text，pic）
    let postParams = {
      limit: 10,
      page: 1,
      type: this.typeMap[packType],
      language: this.itemId
    }
    // 调用应用实例的方法获取全局数据
    this.request.post('/api/content/categoryList', postParams).then(res => {
      let fristLeftData = res.data.data // 左侧数据
      fristLeftData.forEach((item, index) => {
        index === 0 ? item.active = true : item.active = false
      })
      that.fristItem = fristLeftData
      that.getRightData(fristLeftData[0].id)
    }).catch(err => {
      console.log(err)
    })
  },
  onUnload () {
    // eslint-disable-next-line
    let pages = getCurrentPages()
    let prePage = pages[pages.length - 2]
    prePage.setData({
      data: this.materialData,
      contentId: this.contentId
    })
  }
}
</script>

<style>
.material_box{
  width: 100%;
  height: 100%;
  position: fixed;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  padding-right: 2%;
}
.material_left{
  width: 21.3%;
  height: 100%;
  margin-right: 2%;
  overflow: scroll;
}
.material_right{
  height: 100%;
  width: 76.7%;
  overflow: scroll;
}
.left_item{
  background: #fff;
  line-height: 124rpx;
  height:124rpx;
  border-bottom: 2rpx solid #f4f4f4;
  text-align: center;
  font-size:28rpx;
  font-weight:400;
  color:rgba(0,0,0,1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.active_class{
  background: #f4f4f4;
}
._margin_top{
  margin-top: 16rpx;
}
.right_title{
  height:88rpx;
  background:rgba(255,255,255,1);
  margin-right: 15rpx;
  border-bottom: 34rpx solid #f4f4f4;
  font-size:28rpx;
  text-align: center;
  line-height: 88rpx;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.right_picture {
  margin-top: 39rpx;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.pic_list {
  box-sizing: border-box;
  margin-bottom: 40rpx;
  flex: 33%;
}
.pic_list img{
  box-sizing: border-box;
  width: 180rpx;
  height: 180rpx;
}
</style>
