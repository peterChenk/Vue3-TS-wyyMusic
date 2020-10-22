<template>
  <div class="sliderContainer">
    <div className="before"></div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="item in silerList.banners"
             :key="item.imageUrl">
          <img :src="item.imageUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { GlobalState } from "@/store";
import Swiper from 'swiper';
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
import { useStore } from "vuex";
import * as Types from "@/store/action-types";
export default defineComponent({
  components: {},
  setup() {
    // 获取banner数据
    const store = useStore<GlobalState>();
    const silerList = computed(() => store.state.recommend.silders);
    if (silerList.value.banners.length === 0) {
      store.dispatch(`recommend/${Types.SET_SLIDER_LIST}`);
    }
    onMounted(async () => {
      await nextTick()
      const mySwiper = new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },
      });
    });

    return {
      silerList,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../style/global-style";
.sliderContainer {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  /* height: 100%; */
  margin: auto;
  background: white;
  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    background: $theme-color;
    z-index: 1;
  }
  .swiper-container {
    position: relative;
    width: 98%;
    height: 160px;
    /* overflow: hidden;
    margin: auto; */
    border-radius: 6px;
    .swiper-slide {
      /* position: absolute;
      display: block;
      width: 100%;
      height: 100%; */
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination-bullet-active {
      background: $theme-color;
    }
    --swiper-theme-color: #ff6600;
    --swiper-pagination-color: #ff6600;
  }
}
.swiper-pagination {
  bottom: 10px;
  left: 0;
  width: 100%;
}
</style>