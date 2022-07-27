<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入小区或地址"
        @input="inpChange"
        @search="onSearch"
        @cancel="onCancel"
      />
      <div v-if="isShow">
        <van-cell
          :title="item.communityName"
          v-for="(item, index) in communityList"
          :key="index"
          @click="selCommunity(item)"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { communityKeywords } from '@/api/area.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      value: '',
      isShow: false,
      communityList: [],
      timer: null
    }
  },
  methods: {
    onSearch(val) {
      Toast(val)
    },
    onCancel() {
      this.$router.go(-1)
    },
    inpChange() {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        try {
          if (this.value.trim().length !== 0) {
            this.isShow = true
            Toast.loading({
              message: '加载中...',
              forbidClick: true,
              duration: 0
            })
            const { data } = await communityKeywords(
              this.value,
              this.$store.state.HKZFcityInfo.value
            )
            console.log(data)
            this.communityList = data.body
            Toast.loading({
              message: '加载中...',
              forbidClick: true,
              duration: 1
            })
          }
        } catch (error) {
          console.log(error)
        }
      }, 1000)
    },
    selCommunity(obj) {
      this.$store.commit('setCommunity', obj)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less"></style>
