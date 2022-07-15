<template>
  <div>
    <Header title="城市列表"></Header>
    <van-index-bar>
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
    console.log(this.firstName)
  },
  methods: {}
}
</script>

<style></style>
