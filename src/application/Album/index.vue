<template>
  <div class="Container">
    <Header></Header>
    <Scroll>
      <AlbumDetail></AlbumDetail>
    </Scroll>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/baseUI/header/index.vue'
import Scroll from '@/baseUI/scroll/index.vue'
export default defineComponent({
  components: {
    Header,
    Scroll
  }
})
</script>
<style lang="scss" scoped>
  .Container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* bottom: ${props => props.play > 0 ? "60px": 0}; */
    bottom: 0;
    width: 100%;
    z-index: 100;
    overflow: hidden;
    background: #f2f3f4;
    transform-origin: right bottom;
    &.fly-enter, &.fly-appear{
      transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }
    &.fly-enter-active, &.fly-appear-active{
      transition: transform .3s;
      transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    &.fly-exit{
      transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    &.fly-exit-active{
      transition: transform .3s;
      transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }
  }
</style>