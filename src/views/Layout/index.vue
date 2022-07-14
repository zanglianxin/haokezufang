<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route active-color="#81c9b6" inactive-color="#333">
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/layout/search">找房</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" to="/layout/consult">咨询</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/layout/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
