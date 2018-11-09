<template>
  <div class="material_box">
    <div class="material_left">
      <div class="left_item" :class="item.active ? 'active_class' : ''" v-for="item in fristItem" :key="item.id" @click="chooseItem(item.id)">
        {{item.name}}
      </div>
    </div>
    <div class="material_right">
      <div v-if="type !== 'pic'" class="right_title" @click="getMaterialData(el.title)" :class="index === 0 ? '_margin_top' : ''" v-for="(el, index) in secondItem" :key="el._id">{{el.title}}</div>
      <div v-if="type === 'pic'" class="right_picture">
        <div class="pic_list"  @click="getMaterialData(info.url)"  v-for="info in secondPicItem" :key="info._id">
          <img :src="info.url" alt="">
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
      type: '', // 区分是什么素材  图片 文字  语音
      materialData: '', // 用户选择的素材
      secondItem1: [
        {
          title: '咱大家伙可稀罕你了',
          _id: 1
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 2
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 3
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 4
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 5
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 6
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 7
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 8
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 9
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 10
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 11
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 12
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 13
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 14
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 15
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 16
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 17
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 18
        }
      ],
      secondItem2: [
        {
          title: '好几款交换空间和看',
          _id: 1
        },
        {
          title: '任天野太突然一人一套',
          _id: 2
        },
        {
          title: '吧女更符合规划符合规划规划',
          _id: 3
        },
        {
          title: '鞍山西道所多撒大所',
          _id: 4
        },
        {
          title: '共和国恢复规划规划法规',
          _id: 5
        },
        {
          title: '考虑考虑就看见了',
          _id: 6
        },
        {
          title: '图与体育用途',
          _id: 7
        },
        {
          title: 'UI口以我u 少吃点饭',
          _id: 8
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 9
        }
      ],
      secondItem3: [
        {
          title: '说服力肯定是房间打开了几分',
          _id: 1
        },
        {
          title: '地方和梵蒂冈梵蒂冈',
          _id: 2
        },
        {
          title: '玩儿热若热无若',
          _id: 3
        },
        {
          title: '就没有没机会',
          _id: 4
        },
        {
          title: '妇女节很干净你还拿',
          _id: 5
        },
        {
          title: '全额无群二群翁翁群无',
          _id: 6
        }
      ],
      secondItem: [
        {
          title: '咱大家伙可稀罕你了',
          _id: 1
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 2
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 3
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 4
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 5
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 6
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 7
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 8
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 9
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 10
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 11
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 12
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 13
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 14
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 15
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 16
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 17
        },
        {
          title: '咱大家伙可稀罕你了',
          _id: 18
        }
      ],
      secondPicItem: [
        {
          url: '../../static/images/test_play.png',
          _id: 1
        },
        {
          url: '../../static/images/test_img.png',
          _id: 2
        },
        {
          url: '../../static/images/test_img.png',
          _id: 3
        },
        {
          url: '../../static/images/test_play.png',
          _id: 4
        },
        {
          url: '../../static/images/test_img.png',
          _id: 5
        },
        {
          url: '../../static/images/test_img.png',
          _id: 6
        },
        {
          url: '../../static/images/test_img.png',
          _id: 7
        },
        {
          url: '../../static/images/test_play.png',
          _id: 8
        },
        {
          url: '../../static/images/test_img.png',
          _id: 9
        }
      ],
      secondPicItem1: [
        {
          url: '../../static/images/test_play.png',
          _id: 1
        },
        {
          url: '../../static/images/test_img.png',
          _id: 2
        },
        {
          url: '../../static/images/test_img.png',
          _id: 3
        },
        {
          url: '../../static/images/test_play.png',
          _id: 4
        },
        {
          url: '../../static/images/test_img.png',
          _id: 5
        },
        {
          url: '../../static/images/test_img.png',
          _id: 6
        },
        {
          url: '../../static/images/test_img.png',
          _id: 7
        },
        {
          url: '../../static/images/test_play.png',
          _id: 8
        },
        {
          url: '../../static/images/test_img.png',
          _id: 9
        }
      ],
      secondPicItem2: [
        {
          url: '../../static/images/test_img.png',
          _id: 1
        },
        {
          url: '../../static/images/test_play.png',
          _id: 2
        },
        {
          url: '../../static/images/test_img.png',
          _id: 3
        },
        {
          url: '../../static/images/test_play.png',
          _id: 4
        },
        {
          url: '../../static/images/test_img.png',
          _id: 5
        },
        {
          url: '../../static/images/test_play.png',
          _id: 6
        },
        {
          url: '../../static/images/test_img.png',
          _id: 7
        },
        {
          url: '../../static/images/test_play.png',
          _id: 8
        },
        {
          url: '../../static/images/test_play.png',
          _id: 9
        }
      ],
      secondPicItem3: [
        {
          url: '../../static/images/test_img.png',
          _id: 1
        },
        {
          url: '../../static/images/test_play.png',
          _id: 2
        },
        {
          url: '../../static/images/test_play.png',
          _id: 3
        },
        {
          url: '../../static/images/test_img.png',
          _id: 4
        },
        {
          url: '../../static/images/test_play.png',
          _id: 5
        },
        {
          url: '../../static/images/test_img.png',
          _id: 6
        },
        {
          url: '../../static/images/test_play.png',
          _id: 7
        },
        {
          url: '../../static/images/test_img.png',
          _id: 8
        },
        {
          url: '../../static/images/test_play.png',
          _id: 9
        },
        {
          url: '../../static/images/test_play.png',
          _id: 10
        }
      ],
      fristItem: [
        {
          name: '生僻字',
          id: 1,
          active: true
        },
        {
          name: '恶搞',
          id: 2,
          active: false
        },
        {
          name: '东北话',
          id: 3,
          active: false
        },
        {
          name: '抖音',
          id: 4,
          active: false
        },
        {
          name: '歌词',
          id: 5,
          active: false
        },
        {
          name: '绕口令',
          id: 6,
          active: false
        },
        {
          name: '恶搞',
          id: 7,
          active: false
        },
        {
          name: '东北话',
          id: 8,
          active: false
        },
        {
          name: '抖音',
          id: 9,
          active: false
        },
        {
          name: '歌词',
          id: 10,
          active: false
        },
        {
          name: '绕口令',
          id: 11,
          active: false
        }]
    }
  },
  methods: {
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
      if (this.type !== 'pic') {
        if (id === 1) {
          this.secondItem = this.secondItem1
        } else if (id === 2) {
          this.secondItem = this.secondItem2
        } else if (id === 3) {
          this.secondItem = this.secondItem3
        } else if (id === 4) {
          this.secondItem = this.secondItem1
        } else if (id === 5) {
          this.secondItem = this.secondItem2
        } else if (id === 6) {
          this.secondItem = this.secondItem3
        } else if (id === 7) {
          this.secondItem = this.secondItem1
        } else if (id === 8) {
          this.secondItem = this.secondItem2
        } else if (id === 9) {
          this.secondItem = this.secondItem3
        } else if (id === 10) {
          this.secondItem = this.secondItem1
        } else if (id === 11) {
          this.secondItem = this.secondItem2
        }
      } else {
        if (id === 1) {
          this.secondPicItem = this.secondPicItem1
        } else if (id === 2) {
          this.secondPicItem = this.secondPicItem2
        } else if (id === 3) {
          this.secondPicItem = this.secondPicItem3
        } else if (id === 4) {
          this.secondPicItem = this.secondPicItem1
        } else if (id === 5) {
          this.secondPicItem = this.secondPicItem2
        } else if (id === 6) {
          this.secondPicItem = this.secondPicItem3
        } else if (id === 7) {
          this.secondPicItem = this.secondPicItem1
        } else if (id === 8) {
          this.secondPicItem = this.secondPicItem2
        } else if (id === 9) {
          this.secondPicItem = this.secondPicItem3
        } else if (id === 10) {
          this.secondPicItem = this.secondPicItem1
        } else if (id === 11) {
          this.secondPicItem = this.secondPicItem2
        }
      }
    },
    getMaterialData (text) {
      wx.navigateBack({
        delta: 1
      })
      if (this.type === 'pic') {
        this.materialData = '../' + text
        return
      }
      this.materialData = text
      // wx.navigateBack({
      //   delta: 1
      // })
    }
  },
  created () {
    // console.log(getCurrentPageUrlWithArgs())
  },
  onShow () {
    this.itemId = this.$root.$mp.query.id
    this.type = this.$root.$mp.query.type
  },
  onUnload () {
    // eslint-disable-next-line
    let pages = getCurrentPages()
    let prePage = pages[pages.length - 2]
    prePage.setData({
      data: this.materialData
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
