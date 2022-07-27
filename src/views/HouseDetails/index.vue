<template>
  <div class="bg">
    <!-- 头部 -->
    <Header :title="houseDetails.community"></Header>
    <!-- 房屋图片 -->
    <div class="house-img">
      <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in houseDetails.houseImg"
          :key="index"
        >
          <van-image
            width="375"
            height="252"
            :src="`http://liufusong.top:8080${item}`"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 房屋信息 -->
    <div class="house-info">
      <!-- 房屋标题 -->
      <h3 class="house-title">{{ houseDetails.title }}</h3>
      <!-- 房屋标签tags -->
      <span
        class="house-tags"
        v-for="(item, index) in houseDetails.tags"
        :key="index"
        >{{ item }}</span
      >
      <van-divider :hairline="false" style="backgroundcolor: #cecece" />
      <!-- 面积、租金、房型 -->
      <van-row>
        <van-col span="8">
          <van-row type="flex" class="house-row">
            <van-col>
              <span>{{ houseDetails.price }}<em>/月</em></span>
            </van-col>
            <van-col>
              <i>租金</i>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="8">
          <van-row type="flex" class="house-row">
            <van-col>
              <span>{{ houseDetails.roomType }}</span>
            </van-col>
            <van-col>
              <i>房型</i>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="8">
          <van-row type="flex" class="house-row">
            <van-col>
              <span>{{ houseDetails.size }}平米</span>
            </van-col>
            <van-col>
              <i>面积</i>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-divider :hairline="false" style="backgroundcolor: #cecece" />
      <!-- 装修、朝向、楼层、类型 -->
      <van-row>
        <van-col span="12">
          <van-row class="house-row2" type="flex">
            <van-col>装修：<span>精装</span></van-col>
            <van-col
              >楼层：<span>{{ houseDetails.floor }}</span></van-col
            >
          </van-row>
        </van-col>
        <van-col span="12">
          <van-row class="house-row2" type="flex">
            <van-col
              >朝向：<span v-for="item in houseDetails.oriented" :key="item"
                >{{ item }}&nbsp;</span
              ></van-col
            >
            <van-col>类型：<span>普通住宅</span></van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>

    <!-- 小区 -->
    <div class="house-community">
      <div class="title">小区：<span>天山星城</span></div>
      <div class="map">地图模块</div>
      <h6>房屋配套</h6>
      <van-divider :hairline="false" style="backgroundcolor: #cecece" />
      <div class="supporting">
        <ul>
          <li v-for="item in houseDetails.supporting" :key="item">
            <i class="iconfont" :class="item | forDataIcon"></i>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 房源概况 -->
    <div class="house-overview">
      <h6>房源概况</h6>
      <van-divider :hairline="false" style="backgroundcolor: #cecece" />
      <div class="user">
        <div class="touxiang">
          <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
          <div>
            <span>王女士</span>
            <p>已认证房主</p>
          </div>
        </div>
        <div class="sendmsg">发消息</div>
      </div>
      <p>
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </p>
    </div>

    <!-- 底部固定按钮 -->
    <div class="floor-btn">
      <div @click="setFavFn">
        <img :src="imgSrc" alt="" />
        收藏
      </div>
      <div>在线咨询</div>
      <div class="green">电话预约</div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import {
  getHouseDetails,
  isFavorites,
  setFavorites,
  delFavorites
} from '@/api/house.js'
export default {
  data() {
    return {
      houseDetails: {},
      isFav: false
    }
  },
  computed: {
    imgSrc() {
      if (this.isFav) {
        return 'data:image/png;base64,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'
      } else {
        return 'data:image/png;base64,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'
      }
    }
  },
  components: { Header },
  created() {
    this.getHouseDetails()
    this.isFavorites()
  },
  methods: {
    async getHouseDetails() {
      this.$toast.loading({
        message: '获取页面中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await getHouseDetails(this.$store.state.houseCode)
      //   console.log(data)
      this.houseDetails = data.body
    },
    async isFavorites() {
      const res = await isFavorites(this.$store.state.houseCode)
      console.log(res)
      this.isFav = res.data.body.isFavorite
      this.$toast.loading({
        message: '获取页面中...',
        forbidClick: true,
        duration: 1
      })
    },
    async setFavorites() {
      try {
        const res = await setFavorites(this.$store.state.houseCode)
        console.log(res)
        this.$toast('添加收藏成功')
        this.isFav = true
      } catch (error) {
        console.log(error)
      }
    },
    async delFavorites() {
      try {
        const res = await delFavorites(this.$store.state.houseCode)
        console.log(res)
        this.$toast('删除收藏成功')
        this.isFav = false
      } catch (error) {
        console.log(error)
      }
    },
    setFavFn() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      if (this.isFav) {
        this.delFavorites()
      } else {
        this.setFavorites()
      }
    }
  },
  filters: {
    forDataIcon: (str) => {
      const supportingNameArr = [
        { name: '衣柜', icon: 'icon-yigui' },
        { name: '洗衣机', icon: 'icon-xiyiji' },
        { name: '空调', icon: 'icon-kongtiao' },
        { name: '天然气', icon: 'icon-tianranqi' },
        { name: '冰箱', icon: 'icon-bingxiang' },
        { name: '暖气', icon: 'icon-nuanqi-' },
        { name: '电视', icon: 'icon-dianshiji' },
        { name: '热水器', icon: 'icon-reshuiqi' },
        { name: '宽带', icon: 'icon-kuandai' },
        { name: '沙发', icon: 'icon-shafa' }
      ]
      const className = supportingNameArr.filter((item) => {
        return item.name === str
      })
      //   console.log(className)
      return className[0].icon
    }
  }
}
</script>

<style scoped lang="less">
.bg {
  padding-bottom: 50px;
  background-color: #f6f5f6;
}
.house-img {
  .van-swipe {
    height: 252px;
  }
}

.house-info {
  padding: 15px;
  background: #fff;
  .house-title {
    margin: 10px 0;
    font-weight: 400;
    font-size: 16px;
    color: #333;
  }
  .house-tags {
    color: #39becd;
    background: #e1f5f8;
    display: inline-block;
    font-size: 12px;
    border-radius: 3px;
    padding: 4px 5px;
    margin-right: 5px;
    line-height: 12px;
  }

  .house-row {
    flex-direction: column;
    align-items: center;
    span {
      color: #fa5741;
      font-size: 18px;
      font-weight: bolder;
      em {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
      }
    }
    i {
      font-size: 14px;
      font-style: normal;
      color: #999;
    }
  }

  .house-row2 {
    flex-direction: column;
    align-items: left;
    font-size: 13px;
    color: #999;
    span {
      color: #000;
    }
  }
}

.house-community {
  padding: 15px;
  margin-top: 10px;
  background-color: #fff;
  .title {
    font-size: 14px;
    color: #333;
  }
  h6 {
    margin: 10px 0;
  }
  .supporting {
    overflow: hidden;
    ul {
      width: 110%;
      display: flex;
      flex-flow: wrap;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // background-color: springgreen;
        width: 71px;
        height: 51px;
        margin: 10px 0;
        i {
          font-size: 25px;
        }
        span {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
  }
}

.house-overview {
  padding: 15px;
  margin-top: 10px;
  background-color: #fff;
  h6 {
    margin: 5px 0;
  }
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .touxiang {
      display: flex;
      img {
        width: 52px;
        height: 52px;
        margin: 0 10px 0 0;
      }
      > div {
        padding-top: 10px;
        font-size: 14px;
        color: #333;
        p {
          margin: 0;
          font-size: 12px;
          color: #fa5741;
        }
      }
    }
    .sendmsg {
      width: 70px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #33be85;
      border: 1px solid #33be85;
      border-radius: 3px;
      padding: 3px 3px;
      font-size: 14px;
    }
  }
  p {
    font-size: 14px;
  }
}

.floor-btn {
  display: flex;
  width: 100%;
  height: 50px;
  position: fixed;
  z-index: 99999;
  bottom: 0;
  line-height: 50px;
  left: 0;
  color: #999;
  font-size: 17px;
  background-color: #fff;
  border-top: 1px solid #cecece;
  > div {
    flex: 1;
    text-align: center;
    border-right: 1px solid #e8e8e9;
    img {
      width: 16px;
      height: 16px;
    }
  }
  .green {
    background-color: #21b97a;
    color: #fff;
  }
}
</style>
