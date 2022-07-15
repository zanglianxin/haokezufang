<template>
  <div>
    <!-- 登录状态 -->
    <div class="My_title" v-if="tokenTimer">
      <img
        src="http://liufusong.top:8080/img/avatar.png"
        alt="背景图"
        class="My_bg"
      />
      <div class="My_info">
        <div class="My_myIcon">
          <div class="My_avatar">
            <img :src="`http://liufusong.top:8080${data.avatar}`" alt="icon" />
          </div>
        </div>
        <div class="My_user">
          <div class="My_name">{{ data.nickname }}</div>
          <div class="My_edit">
            <van-button type="primary" size="small" @click="loginOut"
              >退出</van-button
            >
          </div>
          <p>编辑个人资料</p>
        </div>
      </div>
    </div>

    <!-- 未登录状态 -->
    <div class="My_title" v-else>
      <img
        src="http://liufusong.top:8080/img/profile/bg.png"
        alt="背景图"
        class="My_bg"
      />
      <div class="My_info">
        <div class="My_myIcon">
          <div class="My_avatar">
            <img
              src="http://liufusong.top:8080/img/profile/avatar.png"
              alt="icon"
            />
          </div>
        </div>
        <div class="My_user">
          <div class="My_name">游客</div>
          <div class="My_edit">
            <van-button type="primary" size="small" @click="login"
              >去登录</van-button
            >
          </div>
        </div>
      </div>
    </div>

    <van-grid :column-num="3" :border="false" :icon-size="22">
      <van-grid-item icon="star-o" text="我的收藏" @click="myFavorite" />
      <van-grid-item icon="wap-home-o" text="我的出租" />
      <van-grid-item icon="underway-o" text="看房记录" />
      <van-grid-item icon="credit-pay" text="成为房主" />
      <van-grid-item icon="user-circle-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <div class="My_ad">
      <img
        src="http://liufusong.top:8080/img/profile/join.png"
        alt=""
        style="width: 92%"
      />
    </div>
  </div>
</template>

<script>
import { userDataGet } from '@/api/user'
import { Dialog } from 'vant'
import { removeToken } from '@/utils'
export default {
  data() {
    return {
      token: '',
      tokenTimer: false,
      data: {},
      removeToken
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    loginOut() {
      Dialog.confirm({
        title: '提示',
        message: '是否确定退出'
      })
        .then(() => {
          this.removeToken()
          this.tokenTimer = false
        })
        .catch(() => {})
    },
    myFavorite() {
      if (!this.tokenTimer) {
        this.$router.push('/login')
      } else {
        this.$router.push('/collection')
      }
    }
  },
  async created() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    this.token = this.$store.state.user.token
    const res = await userDataGet(this.token)
    console.log(res)
    if (res.data.status === 200) {
      this.tokenTimer = true
    } else {
      this.tokenTimer = false
    }
    this.data = res.data.body
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 1
    })
  }
}
</script>

<style scoped lang="less">
.My_title {
  position: relative;
  width: 100%;
  min-height: 300px;
  position: relative;
  margin-bottom: 15px;
  .My_bg {
    width: 100%;
  }
  .My_info {
    position: absolute;
    background: #fff;
    width: 75%;
    height: 55%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;

    .My_myIcon {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
      .My_avatar {
        width: 100%;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
    }

    .My_user {
      padding-top: 15px;
      .My_name {
        margin-top: -30px;
        margin-bottom: 10px;
      }
      .My_edit {
        color: #999;
        font-size: 12px;
        margin-top: 20px;
        .van-button--small {
          height: 30px;
          width: 70px;
          border-radius: 5px;
        }
      }
    }
  }
}

.My_ad {
  text-align: center;
  margin-top: 15px;
}
</style>
