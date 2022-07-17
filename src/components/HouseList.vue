<template>
  <div>
    <van-card
      v-for="(item, index) in houseList"
      :key="index"
      currency=""
      :desc="item.desc"
      :title="item.title"
      :thumb="`http://liufusong.top:8080${item.houseImg}`"
    >
      <template #tags>
        <van-tag
          plain
          type="danger"
          v-for="(titem, tindex) in item.tags"
          :key="tindex"
          >{{ titem }}</van-tag
        >
      </template>
      <template #price>
        <span>{{ item.price }}</span
        ><i>元/月</i>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  props: {
    houseList: {
      type: Array,
      default: () => []
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
