<template>
  <div>
    <Header title="房屋管理"></Header>

    <HouseList :houseList="publishedList"></HouseList>
  </div>
</template>

<script>
import { published } from '@/api/user'
import Header from '@/components/Header.vue'
import HouseList from '@/components/HouseList.vue'
export default {
  data() {
    return {
      publishedList: []
    }
  },
  components: {
    Header,
    HouseList
  },
  async created() {
    const { data } = await published()
    console.log(data)
    this.publishedList = data.body
  }
}
</script>

<style></style>
