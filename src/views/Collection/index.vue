<template>
  <div>
    <Header title="收藏列表"></Header>

    <HouseLise :houseList="houseSrc"></HouseLise>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { getFavorites } from '@/api/user'
import HouseLise from '@/components/HouseList.vue'
export default {
  data() {
    return {
      token: '',
      getFavorites,
      houseSrc: []
    }
  },
  components: {
    Header,
    HouseLise
  },
  async created() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    this.token = this.$store.state.user.token
    try {
      const res = await this.getFavorites(this.token)
      console.log(res)
      this.houseSrc = res.data.body
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 1
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped lang="less">
.van-card {
  background-color: #fff;
  .van-tag--plain {
    color: #39becd;
    background: #e1f5f8;
  }
  .van-card__title {
    font-weight: 700;
    font-size: 15px;
    color: #394043;
  }

  .van-card__desc {
    color: #afb2b3;
    margin-top: 5px;
  }

  .van-card__price {
    span {
      color: #fa5741;
      font-size: 16px;
      font-weight: bolder;
    }
    i {
      font-style: normal;
      color: #fa5741;
    }
  }
}
</style>
