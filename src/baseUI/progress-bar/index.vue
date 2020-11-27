<template>
  <div class="ProgressBarWrapper">
    <div class="bar-inner" ref="progressBar" @click="progressClick">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" 
          ref="progressBtn"
          @touchstart.stop.prevent="progressTouchStart($event)"
          @touchmove.stop.prevent="progressTouchMove($event)"
          @touchend="progressTouchEnd($event)"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { prefixStyle } from '@/api/utils';
export default defineComponent({
  props: {
    // percent: Number
  },
  emits: ['percent-change'],
  setup (props, {emit}) {
    // const { percent } = toRefs(props)
    const progressBar = ref<null | HTMLElement>(null)
    const progress = ref<null | HTMLElement>(null)
    const progressBtn = ref<null | HTMLElement>(null)

    const transform = prefixStyle('transform');
    const progressBtnWidth = 16;
    interface TouchType {
      left: number;
      startX: number;
      initiated: boolean;
    }
    let touch = {
      left: 0,
      startX: 0,
      initiated: false
    }
    // let touch = reactive({
    //   left: 0,
    //   startX: 0,
    //   initiated: false
    // })

    let progressBarVal
    // if (progressBar.value) {
    //   progressBarVal = progressBar.value
    // }
    let progressVal
    // if (progress.value) {
    //   progressVal = progress.value
    // }
    let progressBtnVal
    // if (progressBtn.value) {
    //   progressBtnVal = progressBtn.value
    // }
    onMounted(() => {
      progressBarVal = progressBar.value
      progressVal = progress.value
      progressBtnVal = progressBtn.value
    })

    // watch(percent, (newVal, oldVal) => {
    //   if(percent && percent.value && percent.value >= 0 && percent.value <= 1 && !touch.initiated) {
    //     const barWidth = progressBarVal.clientWidth - progressBtnWidth;
    //     const offsetWidth = percent.value * barWidth;
    //     progressVal.style.width = `${offsetWidth}px`;
    //     progressBtnVal.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    //   }
    // })

    const percent: any = inject('percent11')
    watch(percent, (newVal, oldVal) => {
      if(percent && percent.value && percent.value >= 0 && percent.value <= 1 && !touch.initiated) {
        const barWidth = progressBarVal.clientWidth - progressBtnWidth;
        const offsetWidth = percent.value * barWidth;
        progressVal.style.width = `${offsetWidth}px`;
        progressBtnVal.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
      }
    })

    function _offset (offsetWidth: number) {
      progressVal.style.width = `${offsetWidth}px`;
      progressBtnVal.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }

    function _changePercent () {
      const barWidth = progressBarVal.clientWidth - progressBtnWidth;
      const curPercent = progressVal.clientWidth / barWidth;
      emit('percent-change', curPercent)
    }

    function progressClick (e: any) {
      const rect = progressBarVal.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      _offset(offsetWidth);
      _changePercent();
    }
    function progressTouchStart (e: any) {
      const startTouch: TouchType = {
        left: 0,
        startX: 0,
        initiated: false
      };
      startTouch.initiated = true;
      startTouch.startX = e.touches[0].pageX;
      startTouch.left = progressVal.clientWidth;
      // setTouch(startTouch);
      touch = startTouch
    }
    function progressTouchMove (e: any) {
      if(!touch.initiated) return;
      const deltaX = e.touches[0].pageX - touch.startX;
      const barWidth = progressBarVal.clientWidth - progressBtnWidth; 
      const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
      _offset(offsetWidth);
    }
    function progressTouchEnd (e: any) {
      const endTouch = JSON.parse(JSON.stringify(touch));
      endTouch.initiated = false;
      // setTouch(endTouch);
      touch = endTouch
      _changePercent();
    }

    return {
      progressBar,
      progress,
      progressBtn,
      progressClick,
      progressTouchStart,
      progressTouchMove,
      progressTouchEnd
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../../style/global-style.scss";
  .ProgressBarWrapper{
    height: 30px;
    .bar-inner{
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, .3);
      .progress{
        position: absolute;
        height: 100%;
        background: $theme-color;
      }
      .progress-btn-wrapper{
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn{
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $border-color;
          border-radius: 50%;
          background: $theme-color;
        }
      }
    }
  }
</style>