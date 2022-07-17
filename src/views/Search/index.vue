<template>
  <div>
    <!-- 头部搜索框 -->
    <van-search
      show-action
      placeholder="请输入搜索关键词"
      background="#21b97a"
      class="searh-box"
    >
      <template #left>
        <van-icon
          name="arrow-left"
          class="left-icon"
          @click="$router.push('/layout/home')"
        />
        <span class="area-name" @click="goCity"
          >{{$store.state.HKZFcityInfo.label}}<van-icon name="arrow-down"
        /></span>
      </template>
      <template #action>
        <van-icon name="map-marked" />
      </template>
    </van-search>

    <!-- 筛选条 未完成卡住-->
    <van-dropdown-menu>
      <van-dropdown-item title="区域" ref="item">
        <van-picker show-toolbar title="" :columns="selarea" />
      </van-dropdown-item>
      <van-dropdown-item title="方式" ref="way">
        <van-picker show-toolbar title="" :columns="selway" />
      </van-dropdown-item>
      <van-dropdown-item title="租金" ref="money">
        <van-picker show-toolbar title="" :columns="selmoney" />
      </van-dropdown-item>
    </van-dropdown-menu>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <HouseList :houseList="list"></HouseList>
    </van-list>
  </div>
</template>

<script>
import HouseList from '@/components/HouseList.vue'
import { findHouse } from '@/api/house'
export default {
  data() {
    return {
      switch1: false,
      switch2: false,
      selarea: [
        // 第一列
        {
          values: ['周一', '周二', '周三', '周四', '周五'],
          defaultIndex: 0
        },
        // 第二列
        {
          values: ['上午', '下午', '晚上'],
          defaultIndex: 0
        },
        // 第三列
        {
          values: ['上午', '下午', '晚上'],
          defaultIndex: 0
        }
      ],
      selway: [
        // 第一列
        {
          values: ['不限', '整租', '合租'],
          defaultIndex: 0
        }
      ],
      selmoney: [
        // 第一列
        {
          values: [
            '不限',
            '1000及以下',
            '1000-2000',
            '2000-3000',
            '3000-4000',
            '4000-5000',
            '5000-7000',
            '7000以上'
          ],
          defaultIndex: 0
        }
      ],
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    goCity() {
      this.$router.push('/city')
    },
    async findHouse() {
      try {
        const res = await findHouse()
        console.log(res)
        this.list = res.data.body.list
      } catch (error) {
        console.log(error)
      }
    },
    async onLoad() {
      this.page++
      const res = await findHouse((this.page - 1) * 20)
      if (res.data.body.list.length === 0) {
        this.finished = true
        this.loading = false
        return false
      }
      this.list = [...this.list, ...res.data.body.list]
      this.loading = false
    }
  },
  components: {
    HouseList
  },
  created() {
    this.findHouse()
  }
}
</script>

<style scoped lang="less">
.left-icon {
  color: #fff;
  margin-right: 10px;
}
.searh-box {
  padding-right: 10px;
  padding-left: 10px;
}
.area-name {
  color: black;
  font-size: 14px;
  padding-left: 5px;
  background-color: #f7f8fa;
  height: 34px;
  line-height: 34px;
  border-right: 1px solid #f7f8fa;
}
</style>
