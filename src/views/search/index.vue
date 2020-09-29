<template>
  <div class="search">
    <form class="search-from" action="/">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            background="#3296fa"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow=false"
        />
    </form>
    <SearchResult :search-text='searchText' v-if="isResultShow"></SearchResult>
    <SearchSuggestion @search='onSearch' :search-text='searchText' v-else-if="searchText"></SearchSuggestion>
    <SearchHistor @search='onSearch' @clear-search-histories='SearchHistorList=[]' :SearchHistorList='SearchHistorList' v-else></SearchHistor>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import SearchHistor from './components/search-histor'
import SearchSuggestion from './components/search_suggestion'
import { getItem, setItem } from '../../utils/storage'
export default {
  name: 'SeachIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      SearchHistorList: getItem('TOUTIAO_HISTRI') || []
    }
  },
  methods: {
    onSearch (val) {
      this.$toast(val)
      this.searchText = val
      const index = this.SearchHistorList.indexOf(val)
      if (index !== -1) {
        this.SearchHistorList.splice(index, 1)
      }
      this.SearchHistorList.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: {
    SearchResult,
    SearchHistor,
    SearchSuggestion
  },
  watch: {
    SearchHistorList: {
      handler (val) {
        setItem('TOUTIAO_HISTRI', val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search{
    padding-top: 108px;
    .van-search__action{
        color: #fff;
    }
    .search-from{
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       z-index: 1;
    }
}
</style>
