<template>
  <div class="ListWrapper">
    <h1 className="title">推荐歌单</h1>
    <div class="list">
      <div class="ListItem" v-for="item in recommodList.result" :key="item.id" @click="enterDetail(item.id)">
        <div class="img_wrapper">
          <div className="decorate"></div>
          <img :src="item.picUrl"
               width="100%"
               height="100%"
               alt="music" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{{Math.floor(item.playCount/10000)}}万</span>
          </div>
        </div>
        <div className="desc">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { GlobalState } from '@/store';
import { computed, defineComponent } from "vue";
import { useStore } from 'vuex';
import * as Types from '@/store/action-types'
import router from '@/router';
export default defineComponent({
  setup() {
    const store = useStore<GlobalState>()
    const recommodList = computed(() => store.state.recommend.recommendList)
    if (recommodList.value.result.length === 0) {
      store.dispatch(`recommend/${Types.CHANGE_RECOMMEND_LIST}`)
    }

    function enterDetail(id: number) {
      router.push(`/recommend/${id}`)
    }

    return {
      recommodList,
      enterDetail
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../../style/global-style";
.ListWrapper {
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    /* color: $font-color-light; */
  }
  .list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    &:after {
      content: "";
      flex: auto;
    }
  }
  .ListItem {
    position: relative;
    width: 32%;
    .decorate {
      z-index: 1;
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
    .img_wrapper {
      position: relative;
      height: 0;
      padding-bottom: 100%;
      .play_count {
        z-index: 1;
        position: absolute;
        right: 2px;
        top: 2px;
        font-size: $font-size-s;
        line-height: 15px;
        color: $font-color-light;
        .play {
          vertical-align: top;
        }
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
    .desc {
      overflow: hidden;
      margin-top: 2px;
      padding: 0 2px;
      height: 50px;
      text-align: left;
      font-size: $font-size-s;
      line-height: 1.4;
      color: $font-color-desc;
    }
  }
}
</style>