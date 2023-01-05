<template>
  <div class="wrapper" :class="theme">

    <div class="state-wrapper">
      <div class="state-user">
        <p>用户信息：user.js</p>
        <p>curUser.id: {{curUserId}}</p>
        <p>curUser.name: {{curUser.name}}</p>
        <p>curUser.age: {{curUser.age}}</p>
        <p>当前用户是张三吗？ {{curUserIsZhangSan}}</p>
        ----------------------------------------------
        <p>房间信息：room.js</p>
        <p>count: {{count}}</p>
        ----------------------------------------------
        <div v-if="photoObj != null">
          右侧图片信息
          <p>标题：{{photoObj.title}}</p>
          <p>宽高：{{photoObj.width}} X {{photoObj.height}}</p>
          <p>作者：{{photoObj.author}}({{photoObj.author_uid}})</p>
          <p>标签：<el-tag size="mini"
                        v-for="(item, index) in photoObj.tags"
                        :key="`test${index}`"
                        style="margin-right: .05rem;">{{item}}</el-tag></p>
          <p>图片网址：<el-link :href="photoObj.page">{{photoObj.page}}</el-link></p>
          <p>图片地址：<el-link :href="photoObj.url">{{photoObj.url}}</el-link></p>
        </div>
      </div>
      <div class="state-room">
        <img :src="curPhotoSrc">
      </div>
    </div>
    <div class="button-wrapper">
      <el-button type="success" @click="TOGGLE_THEME">更改主题</el-button>
      <el-button type="primary" @click="ADD_SEAT_COUNT">座位+1</el-button>
      <el-button type="primary" @click="DEL_SEAT_COUNT">座位-1</el-button>
      <el-button type="danger" @click="randomPhotoObj">随机图片</el-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  mounted() {
    this.randomPhotoObj();
  },
  computed: {
    ...mapState('user', ['curUser', 'theme']),
    ...mapState('room', ['count', 'photoObj']),
    ...mapGetters('user', ['curUserId', 'isCurUserId', 'getCurThemeByUserId']),
    ...mapGetters('room', ['curPhotoSrc']),
    curUserIsZhangSan() {
      return this.isCurUserId('123456') ? '是' : '否'
    }
  },
  methods: {
    ...mapMutations('user', ['TOGGLE_THEME']),
    ...mapMutations('room', ['ADD_SEAT_COUNT', 'DEL_SEAT_COUNT']),
    ...mapActions('room', ['randomPhotoObj']),
  }
}
</script>


<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  &.dark {
    background: #5c6b75;
  }

  .state-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: .1rem;
    & > div {
      width: 5rem;
      max-width: 5rem;
      margin-left: .1rem;
      padding: .1rem;
      border: 1px solid grey;
    }
  }

  .state-room {
    max-height: 80vh;
    overflow: auto;
    & > img {
      width: 100%;
    }
  }
  .button-wrapper {
    text-align: center;
  }

}
</style>
