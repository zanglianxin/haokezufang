<template>
  <div>
    <Header title="城市列表"></Header>
    <van-index-bar>
      <van-index-anchor
        >当前城市
      </van-index-anchor>
        <van-cell :title="$store.state.HKZFcityInfo.label"/>
      <van-index-anchor
        >热门城市
        <van-cell :title="item.label" @click="selCity(item.label)" v-for="item in hotCity" :key="item.value" />
      </van-index-anchor>

      <van-index-anchor
        v-for="(item, index) in FirstPin"
        :key="index"
        :index="item"
      >
        <span>{{ item }}</span>
        <van-cell
          v-for="(citem, cindex) in firstName[index]"
          :key="cindex"
          :title="citem"
          @click="selCity(citem)"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { getAllCity } from '@/api/home'
import { getCityInfo, getHotCity } from '@/api/area'
export default {
  data() {
    return {
      hotCity: [],
      cityList: [],
      FirstPin: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      firstName: [],
      newArr: []
    }
  },
  components: {
    Header
  },
  async created() {
    this.$toast.loading({
      message: '获取城市列表中...',
      forbidClick: true,
      duration: 0
    })
    const res2 = await getHotCity()
    // console.log(res2)
    this.hotCity = res2.data.body
    const res = await getAllCity()
    this.cityList = res.data.body
    this.FirstPin.forEach((item) => {
      this.newArr = []
      this.cityList.forEach((ele) => {
        const first = ele.short.substring(0, 1)
        if (first.toUpperCase() === item) {
          this.newArr.push(ele.label)
        }
      })
      this.firstName.push(this.newArr)
    })
    // console.log(this.firstName)
    this.$toast.loading({
      message: '获取城市列表中...',
      forbidClick: true,
      duration: 1
    })
  },
  methods: {
    async selCity(cname) {
      console.log(cname)
      const { data } = await getCityInfo(cname)
      console.log(data)
      if (data.body.label !== cname) {
        return this.$toast('暂无房源')
      }
      this.$store.commit('setCityInfo', data.body)
      this.$router.back()
    }
  }
}
</script>

<style></style>
