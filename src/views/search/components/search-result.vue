<template>
  <div class="search-result">
      <van-list :error.sync="error" error-text="请求失败，点击重新加载" v-model='loading' :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item, i) in loadinglist" :key="i" :title="item.title"></van-cell>
      </van-list>
  </div>
</template>

<script>
import { getSearchresult } from '../../../api/search'
export default {
  data () {
    return {
      loadinglist: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  props: {
    searchText: {
      type: String
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getSearchresult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        this.loadinglist.push(...res.data.results)
        this.loading = false
        if (res.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
