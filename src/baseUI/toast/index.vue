<template>
  <!-- <CSSTransition> -->
    <div class="ToastWrapper" v-if="show">
      <div class="text">{{text}}</div>
    </div>
  <!-- </CSSTransition> -->
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useExpose } from '@/composition/use-expose';
export default defineComponent({
  props: {
    text: String
  },
  setup() {
    const show = ref(false)
    let timer

    function showToast() {
      if (timer) clearTimeout(timer)
      show.value = true
      timer = setTimeout(() => {
        show.value = false
      }, 3000)
    }
    useExpose({ showToast })

    return {
      show
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .ToastWrapper{
    position: fixed;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 50px;
    /* background: ${style["highlight-background-color"]}; */
    &.drop-enter{
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    &.drop-enter-active{
      opacity: 1;
      transition: all 0.3s;
      transform: translate3d(0, 0, 0);
    }
    &.drop-exit-active{
      opacity: 0;
      transition: all 0.3s;
      transform: translate3d(0, 100%, 0);
    }
    .text{
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: $font-size-l;
    }
  }
</style>