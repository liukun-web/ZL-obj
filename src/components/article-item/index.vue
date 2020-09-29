<template>
  <!-- <div class="articel-item">文章列表</div> -->
  <van-cell class="articel-item" :to="`/article/${article.aut_id}`">
    <div slot="title" class="title">{{article.title}}
        <div slot="label">
            <div class="images3" v-if="article.cover.images.length === 3">
                <van-image
                :src='img'
                fit="cover"
                v-for="(img, i) in article.cover.images"
                :key="i"/>
            </div>
            <div class="label-info-wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}</span>
                <span>{{article.pubdate | relatveTime}}</span>
            </div>
        </div>
    </div>
    <div v-if="article.cover.images.length === 1" slot="default">
      <van-image class="right-cover" fit="cover" :src="article.cover.images[0]" />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
  computed: {}
}
</script>

<style lang="less" scoped>
.articel-item{
  .title{
    font-size: 32px;
    color: #3a3a3a;
    .label-info-wrap span{
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
  }
  /deep/.van-cell__value{
      flex: unset;
      right: 0;
      width: 232px;
      height: 146px;
      padding-left: 25px;
  }
  /deep/.right-cover{
      width: 232px;
      height: 146px;
  }
  .images3{
      width: 100%;
      display: flex;
      padding: 30px 0;
      .van-image{
          flex: 1;
          height: 146px;
            &:not(:last-child){
            padding-right: 15px;
        }
      }
  }
}
</style>
