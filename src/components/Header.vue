<template>
  <van-nav-bar :title="title" left-arrow @click-left="goPreBackBtn" />
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    goPreBackBtn() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 18px;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
    font-size: 16px;
  }
}
</style>
