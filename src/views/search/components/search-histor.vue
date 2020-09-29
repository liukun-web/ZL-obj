<template>
  <div class="search-histor">
     <van-cell title="搜索历史">
         <div v-if="isShow">
           <span @click="$emit('clear-search-histories')">删除全部</span>&nbsp;&nbsp;
           <span @click="isShow=false">完成</span>
         </div>
         <van-icon v-else name="delete" @click="isShow = true"/>
     </van-cell>
     <van-cell @click="onSearchItem(item, i)" v-for="(item, i) in SearchHistorList" :key="i" :title="item">
        <van-icon v-if="isShow" name="close"></van-icon>
     </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchListsink: [],
      isShow: false
    }
  },
  created () {},
  props: {
    SearchHistorList: {
      type: Array
    }
  },
  methods: {
    onSearchItem (item, i) {
      if (this.isShow) {
        this.SearchHistorList.splice(i, 1)
      } else {
        this.$emit('search', item)
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style>

</style>
