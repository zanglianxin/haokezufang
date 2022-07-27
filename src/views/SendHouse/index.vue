<template>
  <div>
    <!-- 头部 -->
    <Header title="发布房源"></Header>
    <!-- 表单部分内容 -->
    <van-cell-group inset class="housefrom">
      <van-cell value="房源信息" />
      <!-- 小区 -->
      <van-cell
        title="小区名称"
        is-link
        :value="$store.state.communityObj.communityName || '请输入小区名称'"
        to="/xiaoqu"
      />
      <!-- 租金 -->
      <van-field
        v-model="zujin"
        center
        clearable
        label="租 金"
        placeholder="请输入租金/月"
      >
        <template #button>
          <van-button size="normal">￥/月</van-button>
        </template>
      </van-field>
      <!-- 建筑面积 -->
      <van-field
        v-model="mianji"
        center
        clearable
        label="建筑面积"
        placeholder="请输入建筑面积"
      >
        <template #button>
          <van-button size="normal">m²</van-button>
        </template>
      </van-field>
      <!-- 户型 -->
      <van-field
        readonly
        clickable
        label="户 型"
        :value="hxvalue"
        placeholder="请选择"
        @click="showPicker1 = true"
        right-icon="arrow"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="huxing"
          @cancel="showPicker1 = false"
          @confirm="onConfirm1"
        />
      </van-popup>
      <!-- 所在楼层 -->
      <van-field
        readonly
        clickable
        label="所在楼层"
        :value="lcvalue"
        placeholder="请选择"
        @click="showPicker2 = true"
        right-icon="arrow"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="louceng"
          @cancel="showPicker2 = false"
          @confirm="onConfirm2"
        />
      </van-popup>
      <!-- 朝向 -->
      <van-field
        readonly
        clickable
        label="朝 向"
        :value="cxvalue"
        placeholder="请选择"
        @click="showPicker3 = true"
        right-icon="arrow"
      />
      <van-popup v-model="showPicker3" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="chaoxiang"
          @cancel="showPicker3 = false"
          @confirm="onConfirm3"
        />
      </van-popup>
      <!-- 房屋标题 -->
      <van-cell title="房屋标题" />
      <van-field
        v-model="housetitle"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      />
      <!-- 房屋图像 -->
      <van-cell title="房屋图像" />
    </van-cell-group>
    <van-field name="uploader" class="pic-send">
      <template #input>
        <van-uploader v-model="uploader" :after-read="afterRead" />
      </template>
    </van-field>
    <div class="peizhi">
      <van-cell title="房屋配置" />
      <van-grid :border="false" :column-num="5">
        <van-grid-item
          v-for="item in supporting"
          :key="item.name"
          :class="{ active: item.isSel }"
          @click="clickFn(item)"
        >
          <template>
            <i class="iconfont fs" :class="item.icon"></i>
            <span class="icon-name">{{ item.name }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="house-desc">
      <van-cell title="房屋描述" />
      <van-field
        v-model="houseDesc"
        rows="5"
        autosize
        type="textarea"
        placeholder="请输入房屋描述信息"
      />
    </div>
    <div class="footer">
      <div @click="$router.go(-1)">取消</div>
      <div class="sub" @click="subFn">提交</div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { houseCondition } from '@/api/house'
import { uploadImg, sendHouse } from '@/api/area'
export default {
  data() {
    return {
      zujin: '',
      lcvalue: '',
      cxvalue: '',
      hxvalue: '',
      mianji: '',
      housetitle: '', // 房屋标题
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      huxing: [],
      louceng: [],
      chaoxiang: [],
      uploader: [],
      houseDesc: '', // 描述
      supporting: [
        { name: '衣柜', icon: 'icon-yigui', isSel: false },
        { name: '洗衣机', icon: 'icon-xiyiji', isSel: false },
        { name: '空调', icon: 'icon-kongtiao', isSel: false },
        { name: '天然气', icon: 'icon-tianranqi', isSel: false },
        { name: '冰箱', icon: 'icon-bingxiang', isSel: false },
        { name: '暖气', icon: 'icon-nuanqi-', isSel: false },
        { name: '电视', icon: 'icon-dianshiji', isSel: false },
        { name: '热水器', icon: 'icon-reshuiqi', isSel: false },
        { name: '宽带', icon: 'icon-kuandai', isSel: false },
        { name: '沙发', icon: 'icon-shafa', isSel: false }
      ],
      houseImg: [], // 房屋图片
      supportingNew: [],
      oriented: '',
      roomType: '',
      floor: '',
      community: this.$store.state.communityObj.community
    }
  },
  methods: {
    // 户型选择的方法
    onConfirm1(value) {
      this.hxvalue = value.label
      this.roomType = value.value
      this.showPicker1 = false
    },
    // 楼层选择的方法
    onConfirm2(value) {
      this.lcvalue = value.label
      this.floor = value.value
      this.showPicker2 = false
    },
    // 朝向选择的方法
    onConfirm3(value) {
      this.cxvalue = value.label
      this.oriented = value.value
      this.showPicker3 = false
    },
    // 发布房源所需要的条件获取
    async houseCondition() {
      const { data } = await houseCondition()
      // console.log(data)
      this.huxing = data.body.roomType
      this.louceng = data.body.floor
      this.chaoxiang = data.body.oriented
    },
    clickFn(item) {
      item.isSel = !item.isSel
      this.supportingNew = []
      this.supporting.forEach((ele) => {
        if (ele.isSel) {
          this.supportingNew.push(ele.name)
        }
      })
      console.log(this.supportingNew.join('|'))
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      const imgfile = file.file
      const fr = new FormData()
      fr.append('file', imgfile)
      const { data } = await uploadImg(fr)
      this.houseImg.push(data.body[0])
      console.log(this.houseImg)
    },
    async subFn() {
      if (this.houseImg.length === 0) {
        return this.$toast('请选择房屋图片')
      }
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await sendHouse(this.subObj)
        console.log(res)
        this.$router.go(-1)
        this.$toast.success('发布成功')
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    Header
  },
  created() {
    this.houseCondition()
  },
  computed: {
    subObj() {
      return {
        title: this.housetitle,
        description: this.houseDesc,
        houseImg: this.houseImg.join('|'),
        oriented: this.oriented,
        supporting: this.supportingNew.join('|'),
        price: this.zujin,
        roomType: this.roomType,
        size: this.mianji,
        floor: this.floor,
        community: this.community
      }
    }
  }
}
</script>

<style scoped lang="less">
.housefrom {
  /deep/.van-field {
    height: 44px;
  }
  /deep/.van-button {
    border: transparent;
    color: #888888;
  }
  /deep/.van-picker__toolbar {
    border-bottom: 1px solid #ccc;
  }
  /deep/.van-picker__cancel {
    color: #108ee9;
  }
  /deep/.van-picker__confirm {
    color: #108ee9;
  }
}

.pic-send {
  padding: 0 16px;
}

.peizhi {
  .fs {
    font-size: 23px !important;
  }
  .icon-name {
    font-size: 14px;
  }
  .active {
    color: #21b97a;
  }
}

.footer {
  display: flex;
  > div {
    height: 45px;
    line-height: 45px;
    text-align: center;
    flex: 1;
    font-size: 15px;
    color: #21b97a;
    background-color: rgb(240, 240, 240);
  }

  .sub {
    color: #fff;
    background-color: #21b97a;
  }
}
</style>
