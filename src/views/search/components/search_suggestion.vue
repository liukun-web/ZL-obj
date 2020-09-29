<template>
  <div class="search_suggestion">
      <van-cell @click="$emit('search', item)" icon="search" :title="item" v-for="(item, i) in searchListsink" :key="i">
          <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSearchSuggestion } from '../../../api/search'
export default {
  data () {
    return {
      searchListsink: []
    }
  },
  props: {
    searchText: {
      type: String
    }
  },
  methods: {
    async loadSearchSuggestion (q) {
      try {
        const { data: res } = await getSearchSuggestion(q)
        this.searchListsink = res.data.options
      } catch (error) {
      }
    },
    highlight (text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  },
  watch: {
    searchText: {
    //   handler (searchText) {
    //     this.loadSearchSuggestion(searchText)
    //   },
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value)
      }, 300),
      immediate: true
    }
  }
}
</script>

<style>

</style>
