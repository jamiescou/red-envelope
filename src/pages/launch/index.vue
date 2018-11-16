<template>
  <div class="play_style_box">
    <div class="play_style_list" v-for="item in playStyleData" :key="item.id" @click="bindViewTap(item.name)">
      <div class="play_icon">
        <img :src="item.icon" alt="">
      </div>
      <div class="play_title">
        <div class="title_name">
          {{item.title}}
        </div>
        <div class="dark_line"></div>
        <div class="title_desc">
          {{item.desc}}
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
      playStyleData: [
        {
          id: 1,
          type: 2,
          name: 'text',
          title: '包你拼·拼字',
          desc: '手速大比拼，谁赢拿奖金',
          icon: '../../static/images/test_play.png'
        },
        {
          id: 2,
          type: 1,
          name: 'picture',
          title: '包你拼·拼图',
          desc: '手速大比拼，谁赢拿奖金',
          icon: '../../static/images/test_play.png'
        },
        {
          id: 3,
          type: 3,
          name: 'vioce',
          title: '开口红·语音口令',
          desc: '给个红包，我就开口',
          icon: '../../static/images/test_play.png'
        }
      ]
    }
  },
  methods: {
    bindViewTap (name) {
      const url = `../play-types/${name}/main`
      wx.navigateTo({url})
    }
  },
  created () {
  }
}
</script>

<style>
  .play_style_box{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #f4f4f4;
  }
  .play_style_list{
    display: flex;
    margin: 30rpx 36rpx;
    height: 220rpx;
    background: white;
    padding-left: 28rpx;
    background:rgba(255,255,255,1);
    border-radius:10rpx;
    align-items: center;
  }
  .play_icon{
    width: 29%;
    height: 97rpx;
  }
  .play_icon img{
    width: 76rpx;
    height: 97rpx;
  }
  .play_title{
    width: 70%
  }
  .play_title .title_name {
    font-size:48rpx;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .play_title .dark_line {
    height: 2rpx;
    margin: 21rpx 0 28rpx 0;
    background: #f4f4f4;
  }
  .play_title .title_desc {
    font-size:24rpx;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
</style>
