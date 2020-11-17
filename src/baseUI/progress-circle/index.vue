<template>
  <div class="CircleWrapper">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
              :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
export default defineComponent({
  props: {
    radius: Number,
    percent: Number
  },
  setup (props) {
    console.log('props.percent11', props.percent)
    // const { percent } = toRefs(props)
    //整个背景的周长
    const dashArray = Math.PI * 100;
    //没有高亮的部分，剩下高亮的就是进度
    const dashOffset = ref(0)
    if (props.percent) {
      dashOffset.value = (1 - props.percent) * dashArray;
    }
    // watch(percent, (newVal, oldVal) => {
    //   console.log('props.percent22', newVal)
    // })

    return {
      dashArray,
      dashOffset
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../../style/global-style.scss";
  .CircleWrapper{
    position: relative;
    circle{
      stroke-width: 8px;
      transform-origin: center;
      &.progress-background{
        transform: scale(0.9);
        stroke: $theme-color-shadow;
      }
      &.progress-bar{
        transform: scale(0.9) rotate(-90deg);
        stroke: $theme-color;
      }
    }
  }
</style>