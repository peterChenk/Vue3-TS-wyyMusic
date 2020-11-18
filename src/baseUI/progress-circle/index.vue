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
import { defineComponent, inject, ref, toRefs, watch } from 'vue'
export default defineComponent({
  props: {
    radius: Number
    // percent: Number
  },
  setup (props) {
    // const { percent } = toRefs(props)
    //整个背景的周长
    const dashArray = Math.PI * 100;
    //没有高亮的部分，剩下高亮的就是进度
    const dashOffset = ref(0)
    
    // 观察props的属性变化，改变圆圈的进度 (TS报错，暂时无法解决，用provide和inject代替)
    // watch(percent, (newVal, oldVal) => {
    //   console.log('props.percent22', newVal)
        // if (percent) {
        //   dashOffset.value = (1 - percent) * dashArray;
        // }
    // })

    const percent: any = inject('percent11')
    watch(percent, (newVal, oldVal) => {
      dashOffset.value = (1 - percent.value) * dashArray;
    })

    return {
      dashArray,
      dashOffset,
      percent
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