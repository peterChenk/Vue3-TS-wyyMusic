<template>
  <div class="content" :style="{bottom: play > 0 ? '60px' : '0'}">
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
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex';
import { GlobalState } from '@/store';
export default defineComponent({
  components: {
    Scroll,
    Slider,
    RecommendList
  },
  setup () {
    const store = useStore<GlobalState>()
    const play = computed(() => store.state.player.playList.length)

    return {
      play
    }
  }
})
</script>
<style lang="scss" scoped>
  .content{
    position: fixed;
    top: 94px;
    left: 0;
    /* bottom: ${props => props.play > 0?"60px": 0}; */
    width: 100%;
  }
  .ccrollContainer{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>