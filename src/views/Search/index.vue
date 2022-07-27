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
          >{{ $store.state.HKZFcityInfo.label }}<van-icon name="arrow-down"
        /></span>
      </template>
      <template #action>
        <van-icon name="map-marked" />
      </template>
    </van-search>

    <!-- 筛选条-->
    <van-dropdown-menu active-color="#21b97a" style="width: 75%">
      <van-dropdown-item ref="item">
        <template #title>
          <span :class="{ isHaveSel: areaId !== 'null' && areaId !== '' }">区域</span>
        </template>
        <van-picker
          ref="area"
          show-toolbar
          toolbar-position="bottom"
          title=""
          value-key="label"
          :columns="selarea"
          @confirm="onConfirmSubway"
          @cancel="cancelSubway"
        />
      </van-dropdown-item>
      <van-dropdown-item ref="way">
        <template #title>
          <span :class="{ isHaveSel: wayId !== 'null' && wayId !== '' }">方式</span>
        </template>
        <van-picker
          toolbar-position="bottom"
          show-toolbar
          title=""
          :columns="selway"
          value-key="label"
          @confirm="onConfirmWay"
          @cancel="cancelWay"
        />
      </van-dropdown-item>
      <van-dropdown-item ref="money" class="isHaveSel">
        <template #title>
          <span :class="{ isHaveSel: moneyId !== 'null' && moneyId !== ''}">租金</span>
        </template>
        <van-picker
          toolbar-position="bottom"
          show-toolbar
          title=""
          :columns="selmoney"
          value-key="label"
          @confirm="onConfirmZujin"
          @cancel="cancelZujin"
        />
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 列表渲染 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <HouseList :houseList="list"></HouseList>
    </van-list>
    <!-- 弹出层 -->
    <div class="shaixuan" @click="showPopup">
      <span :class="{ isHaveSel: more }">筛选</span>
    </div>
    <van-popup
      v-model="isShow"
      position="right"
      :style="{ width: '80%', height: '100%' }"
    >
      <!-- 户型选项卡 -->
      <van-cell title="户型">
        <template #label>
          <div class="box">
            <Spans
              ref="span"
              v-for="item in allHouseInfo.roomType"
              :key="item.label"
              :value="item"
            ></Spans>
          </div>
        </template>
      </van-cell>
      <!-- 朝向选项卡 -->
      <van-cell title="朝向">
        <template #label>
          <div class="box">
            <Spans
              ref="span"
              v-for="item in allHouseInfo.oriented"
              :key="item.label"
              :value="item"
            ></Spans>
          </div>
        </template>
      </van-cell>
      <!-- 楼层选项卡 -->
      <van-cell title="楼层">
        <template #label>
          <div class="box">
            <Spans
              ref="span"
              v-for="item in allHouseInfo.floor"
              :key="item.label"
              :value="item"
            ></Spans>
          </div>
        </template>
      </van-cell>
      <!-- 房屋亮点选项卡 -->
      <van-cell title="房屋亮点">
        <template #label>
          <div class="box">
            <Spans
              ref="span"
              v-for="item in allHouseInfo.characteristic"
              :key="item.label"
              :value="item"
            ></Spans>
          </div>
        </template>
      </van-cell>

      <!-- 底部按钮 -->
      <div class="popup-btn">
        <span class="clear" @click="clear">清除</span>
        <span class="queding" @click="startSel">确定</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import HouseList from '@/components/HouseList.vue'
import { findHouse, houseQueryCondition, selHouse } from '@/api/house'
import Spans from './component/Spans.vue'
export default {
  data() {
    return {
      switch1: false,
      switch2: false,
      selarea: [],
      selway: [],
      selmoney: [],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      isShow: false,
      allHouseInfo: {},
      moneyId: '',
      wayId: '',
      areaId: '',
      more: ''
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
    },
    showPopup() {
      this.isShow = true
    },
    // 获取筛选所需的条件
    async houseQueryCondition() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await houseQueryCondition()
      this.allHouseInfo = data.body
      this.selmoney = data.body.price
      this.selway = data.body.rentType
      data.body.area.children[0].children = [
        {
          label: '',
          value: ''
        }
      ]
      this.selarea.push(data.body.area)
      data.body.subway.children[0].children = [
        {
          label: '',
          value: ''
        }
      ]
      this.selarea.push(data.body.subway)
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 1
      })
      console.log(this.allHouseInfo)
    },
    clear() {
      // console.log(this.$refs.span)
      this.$refs.span.forEach((ele) => {
        ele.isActive = false
      })
    },
    async startSel() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const more = []
      // more.push(this.$store.state.HKZFcityInfo.value)
      this.$refs.span.forEach((ele) => {
        if (ele.isActive) {
          more.push(ele.value.value)
        }
      })
      // console.log(more)
      this.more = more.join(',')
      // const { data } = await selHouse({ more: this.more })
      // this.list = data.body.list
      this.isShow = false
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   duration: 1
      // })
      this.moreSelectFuhe()
    },
    // 租金筛选
    async onConfirmZujin(value) {
      try {
        console.log(value)
        this.$refs.money.toggle(false)
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        this.moneyId = value.value
        // const { data } = await selHouse({ more: this.moneyId })
        // console.log(data)
        // this.list = data.body.list
        // this.$toast.loading({
        //   message: '加载中...',
        //   forbidClick: true,
        //   duration: 1
        // })
        this.moreSelectFuhe()
      } catch (error) {
        console.log(error)
      }
    },
    cancelZujin() {
      this.$refs.money.toggle(false)
    },
    // 方式筛选
    async onConfirmWay(value) {
      try {
        // console.log(value)
        this.$refs.way.toggle(false)
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        this.wayId = value.value
        // const { data } = await selHouse({ more: this.wayId })
        // console.log(data)
        // this.list = data.body.list
        // this.$toast.loading({
        //   message: '加载中...',
        //   forbidClick: true,
        //   duration: 1
        // })
        this.moreSelectFuhe()
      } catch (error) {
        console.log(error)
      }
    },
    cancelWay() {
      this.$refs.way.toggle(false)
    },
    // 区域筛选
    async onConfirmSubway() {
      try {
        const arr = this.$refs.area.getValues()
        console.log(arr[arr.length - 1].value)
        this.$refs.item.toggle(false)
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        this.areaId = arr[arr.length - 1].value
        // const { data } = await selHouse({ more: this.areaId })
        // console.log(data)
        // this.list = data.body.list
        // this.$toast.loading({
        //   message: '加载中...',
        //   forbidClick: true,
        //   duration: 1
        // })
        this.moreSelectFuhe()
      } catch (error) {
        console.log(error)
      }
    },
    cancelSubway() {
      this.$refs.item.toggle(false)
    },

    async moreSelectFuhe() {
      let Arr = [this.moneyId, this.wayId, this.areaId, this.more]
      // console.log(Arr)
      Arr = Arr.filter((item) => item)
      // console.log(Arr)
      console.log(Arr.join(','))
      const { data } = await selHouse({ more: Arr.join(',') })
      console.log(data)
      this.list = data.body.list
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 1
      })
    }
  },
  components: {
    HouseList,
    Spans
  },
  created() {
    this.findHouse()
    this.houseQueryCondition()
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

/deep/.van-dropdown-menu__item {
  border: 1px solid #eee;
}

.shaixuan {
  position: absolute;
  z-index: 999;
  top: 54px;
  right: 0px;
  width: 92px;
  height: 46px;
  font-size: 0.4rem;
  background-color: #fdfdfd;
  line-height: 48px;
  text-align: center;
  border: 1px solid #eee;
  box-shadow: 0 0.05333rem 0.32rem rgb(100 101 102 / 12%);
  span {
    &::after {
      position: absolute;
      top: 50%;
      right: 19px;
      margin-top: -0.13333rem;
      border: 0.08rem solid;
      border-color: transparent transparent #dcdee0 #dcdee0;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 0.8;
      content: '';
    }
  }
}

/deep/.van-cell__title {
  border-bottom: 1px solid #eee;
}
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 72px 0 28px;
}

.popup-btn {
  align-items: center;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  // z-index: 3;
  margin-top: 20px;
  border-top: 1px solid #e9e9e9;
  text-align: left;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  .clear {
    flex: 1 1;
    border-radius: 0;
    color: #21b97a;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }
  .queding {
    border-radius: 0;
    flex: 2 1;
    color: #fff;
    background-color: #21b97a;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }
}

/deep/.van-picker__toolbar {
  display: flex;
  .van-picker__cancel {
    flex: 1;
    color: #21b97a;
  }
  .van-picker__confirm {
    flex: 2;
    background-color: #21b97a;
    color: #fff;
  }
}

/deep/.isHaveSel {
  color: #4dc795;
}
</style>
