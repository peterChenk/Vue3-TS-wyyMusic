<template>
  <div class="content">
    <Scroll>
      <div>
        <Slider></Slider>
        <RecommendList></RecommendList>
      </div>
    </Scroll>
  </div>
</template>
<script lang="ts">
import Scroll from '../../baseUI/scroll/index.vue';
import Slider from '../../components/slider/index.vue';
import RecommendList from '../../components/list/index.vue';
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Scroll,
    Slider,
    RecommendList
  }
})
</script>
<style lang="scss" scoped>
  .content{
    position: fixed;
    top: 94px;
    left: 0;
    /* bottom: ${props => props.play > 0?"60px": 0}; */
    bottom: 60px;
    width: 100%;
  }
  .ccrollContainer{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>