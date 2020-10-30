<template>
  <div class="Container">
    <Scroll>
      <div>
        <h1 class="offical">官方榜</h1>
        <h1 class="global">全球榜</h1>
      </div>
    </Scroll>
  </div>
</template>
<script lang="ts">
import{ defineComponent } from 'vue'
import Scroll from '@/baseUI/scroll/index.vue'
export default defineComponent({
  components: {
    Scroll
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .Container{
    position: fixed;
    top: 90px;
    bottom: 0;
    width: 100%;
    .offical,.global {
      margin: 10px 5px;
      padding-top: 15px;
      font-weight: 700;
      font-size: $font-size-m;
      color: $font-color-desc;
    }
  }
</style>