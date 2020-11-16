<template>
  <div class="home">
    <div class="top">
      <span className="iconfont menu"
            @click="TipsFn"
        >
        &#xe65c;
      </span>
      <span className="title">云音悦</span>
      <span className="iconfont search"
            @click="goToSearch"
        >
        &#xe62b;
      </span>
    </div>
    <div class="tab">
      <router-link to="/recommend" active-class="selected">
        <div class="TabItem">
          <span>推荐</span>
        </div>
      </router-link>
      <router-link to="/singers" active-class="selected">
        <div class="TabItem">
          <span>歌手</span>
        </div>
      </router-link>
      <router-link to="/rank" active-class="selected">
        <div class="TabItem">
          <span>排行榜</span>
        </div>
      </router-link>
    </div>
    <router-view />
    <Player></Player>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from '@/router';
import Player from "@/application/Player/index.vue";
export default defineComponent({
  name: "Home",
  components: {
    Player
  },
  setup() {
    function goToSearch() {
      router.push('/search')
    }
    function TipsFn() {
      alert('用户中心正在开发中，敬请期待')
    }

    return {
      goToSearch,
      TipsFn
    }
  }
});
</script>
<style lang="scss" scoped>
@import '../style/global-style';
  .top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 10px;
    background: $theme-color;
    & > span {
      line-height: 40px;
      color: #f1f1f1;
      font-size: 20px;
      &.iconfont {
        font-size: 25px;
      }
    }
  }
  .tab{
     height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: $theme-color;
    a {
      flex: 1;
      padding: 2px 0;
      font-size: 14px;
      color: #e4e4e4;
      &.selected {
        span {
          padding: 3px 0;
          font-weight: 700;
          color: #f1f1f1;
          border-bottom: 2px solid #f1f1f1;
        }
      }
    }
  }
  .TabItem{
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>