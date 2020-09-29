<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" round slot="title" type="info" size="small" icon="search" to="/search"> 搜索 </van-button>
    </van-nav-bar>

    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel="channel"/>
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placehold"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow=true">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="bottom"
      close-icon-position='top-left'
      :style="{ height: '100%' }">
      <channel-edit :my_channel='channels' :active='active' @updata-active='onUpdataActive'></channel-edit>
      </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '../../utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  created () {
    this.loadChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      try {
        this.$toast.loading({ message: '加载中...', duration: 0, forbidClick: true })
        if (this.user) {
          const { data: res } = await getUserChannels()
          this.channels = res.data.channels
        } else {
          if (getItem('UPDATE_CHANNEL')) {
            this.channels = getItem('UPDATE_CHANNEL')
          } else {
            const { data: res } = await getUserChannels()
            this.channels = res.data.channels
          }
        }
        this.$toast.clear()
      } catch (error) {
        this.$toast.fail('获取失败')
      }
    },
    onUpdataActive (index, isChennelEditShow = true) {
      this.active = index
      this.isChennelEditShow = isChennelEditShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding-top: 174px;
  padding-bottom: 100px;
  .page-nav-bar{
    .search-btn{
      width: 555px;
      height: 64px;
      background: #5babfb;
      border: none;
      font-size: 28px;
      .van-button__icon{
        font-size: 32px;
      }
    }
  }
  /deep/.channel-tabs{
    .van-tabs__wrap{
      position: fixed;
      z-index: 1;
      right: 0;
      left: 0;
      top: 92px;
      height: 82px;
    }
    .van-tab{
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav--line{
      padding-bottom: 0;
    }
    .van-tabs__line{
      width: 31px !important;
      height: 6px;
      bottom: 8px;
      background: #3296fa;
    }
    .placehold{
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      opacity: 0.9;
      width: 66px;
      height: 82px;
      i.icongengduo{
        font-size: 33px;
      }
    }
  }
}
</style>
