<template>
  <div>
    <Header title="城市列表"></Header>
    <van-index-bar>
      <van-index-anchor
        v-for="(item, index) in FirstPin"
        :key="index"
        :index="index"
      >
        <span>{{ item }}</span>
        <van-cell
          v-for="(citem, cindex) in (firstName.A)"
          :key="cindex"
          :title="citem"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { getAllCity } from '@/api/home'
export default {
  data() {
    return {
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
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      firstName: {}
    }
  },
  components: {
    Header
  },
  async created() {
    const res = await getAllCity()
    this.cityList = res.data.body
    this.FirstPin.forEach((item) => {
      this.firstName[item] = []
      this.cityList.forEach((ele) => {
        const first = ele.short.substring(0, 1)
        if (first.toUpperCase() === item) {
          this.firstName[item].push(ele.label)
        }
      })
    })
    console.log(this.firstName)
    console.log(this.firstName.A)
  },
  methods: {}
}
</script>

<style></style>
