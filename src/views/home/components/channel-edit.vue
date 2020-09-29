<template>
  <div class="channel-edit">
    <van-cell :border='false'>
      <div slot="title" class="title-text">我的频道</div>
      <van-button @click="isEdit=!isEdit" class="edit-btn" type="danger" plain round size="mini">{{!isEdit?'编 辑':'完 成'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="mygrid">
       <van-grid-item @click="onremovChannel(value, i)" class="grid_item" :border='false' v-for="(value, i) in my_channel" :key="value.id" >
         <van-icon name="clear" v-show="isEdit && !noEditArr.includes(value.id)" />
         <span class="van-grid-item__text"
         :class="{ 'active': i === active }"
         >{{ value.name }}</span>
       </van-grid-item>

    </van-grid>

    <van-cell :border='false'>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
       <van-grid-item @click="onAddChannel(value)" class="grid_item" icon="plus" :key="i" v-for="(value, i) in recommChannelList" :text="value.name" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel, addChannels, delmyChannel } from '../../../api/channel'
import { setItem } from '../../../utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allchannel: [],
      isEdit: false,
      noEditArr: [0]
    }
  },
  props: {
    my_channel: {
      type: Array,
      require: true
    },
    active: {
      type: Number
    }
  },
  created () {
    this.getloading()
  },
  methods: {
    async getloading () {
      try {
        const { data: res } = await getAllChannel()
        this.allchannel = res.data.channels
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取失败')
      }
    },
    async onAddChannel (channel) {
      this.my_channel.push(channel)
      if (this.user) {
        console.log(1)
        await addChannels([{ id: channel.id, seq: this.my_channel.length }])
      } else {
        console.log(2)
        setItem('UPDATE_CHANNEL', this.my_channel)
      }
    },
    async onremovChannel (value, index) {
      if (this.user) {
        if (!this.isEdit) {
          this.$emit('updata-active', index, false)
        } else {
          if (index <= this.active) {
            this.$emit('updata-active', this.active - 1, true)
          }
          if (this.noEditArr.includes(value.id)) return
          this.my_channel.splice(index, 1)
          await delmyChannel(value.id)
        }
        await delmyChannel(value.id)
      } else {
        if (!this.isEdit) {
          this.$emit('updata-active', index, false)
        } else {
          if (index <= this.active) {
            this.$emit('updata-active', this.active - 1, true)
          }
          if (this.noEditArr.includes(value.id)) return
          this.my_channel.splice(index, 1)
          setItem('UPDATE_CHANNEL', this.my_channel)
        }
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommChannelList () {
      return this.allchannel.filter(channel => {
        return !this.my_channel.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
      // const channels = []
      // this.allchannel.forEach(channel => {
      //   const ret = this.my_channel.find(mychannel => {
      //     return mychannel.id === channel.id
      //   })
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // return channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit{
    padding: 85px 0;
    .title-text{
       font-size: 32px;
       color: #333;
    }
    .edit-btn{
        width: 140px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/.grid_item{
        width: 160px;
        height: 86px;
        .van-grid-item__content{
            background: #f4f5f6;
            border-radius: 5px;
            .van-grid-item__text{
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }
            .active{
              color: red;
            }
        }
    }
    /deep/.mygrid{
         .grid_item{
             .van-icon-clear{
                 position: absolute;
                 right: -10px;
                 top: -10px;
                 font-size: 30px;
                 color: #cacaca;
                 z-index: 2;
             }
         }
    }
    /deep/.recommend-grid{
        .grid_item{
            .van-grid-item__content{
                padding: 0;
                flex-direction: row;
                .van-icon-plus{
                    font-size: 28px;
                    margin-right: 6px;
                }
                .van-grid-item__text{
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
