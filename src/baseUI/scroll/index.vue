<template>
  <div class="ScrollContainer" ref="scrollContaninerRef">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import BScroll from 'better-scroll'
import { useExpose } from '@/composition/use-expose';
export default defineComponent({
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  setup(props, {emit}) {
    const scrollContaninerRef = ref<null | HTMLElement>(null)

    let scroll: any
    function _initScroll() {
      if (!scrollContaninerRef.value) {
        return
      }
      // better-scroll的初始化
      scroll = new BScroll(scrollContaninerRef.value, {
        probeType: props.probeType,
        click: props.click,
        scrollX: props.scrollX
      })
      // 是否派发滚动事件
      if (props.listenScroll) {
        scroll.on('scroll', (pos: any) => {
          emit('scroll', pos)
        })
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (props.pullup) {
        scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (scroll.y <= (scroll.maxScrollY + 50)) {
            emit('scrollto-end')
          }
        })
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (props.pulldown) {
        scroll.on('touchend', (pos: any) => {
          // 下拉动作
          if (pos.y > 50) {
            emit('pulldown')
          }
        })
      }
      // 是否派发列表滚动开始的事件
      if (props.beforeScroll) {
        scroll.on('beforeScrollStart', () => {
          emit('beforescroll')
        })
      }

    }
    
    function disable() {
      // 代理better-scroll的disable方法
      scroll && scroll.disable()
    }
    function enable() {
      // 代理better-scroll的enable方法
      scroll && scroll.enable()
    }
    function refresh() {
      // 代理better-scroll的refresh方法
      scroll && scroll.refresh()
    }
    function scrollTo(args: any) {
      // 代理better-scroll的scrollTo方法
      scroll && scroll.scrollTo.apply(scroll, ...args)
    }
    function scrollToElement(args: any) {
      // 代理better-scroll的scrollToElement方法
      scroll && scroll.scrollToElement.apply(scroll, ...args)
    }
    useExpose({ refresh })

    onMounted(() => {
      setTimeout(() => {
        _initScroll()
      }, 20)
    })

    return {
      scrollContaninerRef,
      refresh
    }
  }
})
</script>
<style lang="scss" scoped>
  .ScrollContainer{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>