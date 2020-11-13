<template>
  <div>
    <NormalPlayer></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <PlayList></PlayList>
    <Toast></Toast>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NormalPlayer from "./normal-player/index.vue";
import MiniPlayer from "./mini-player/index.vue";
import PlayList from "./play-list/index.vue";
import Toast from "@/baseUI/toast/index.vue";
export default defineComponent({
  components: {
    NormalPlayer,
    MiniPlayer,
    PlayList,
    Toast
  }
})
</script>
<style lang="scss" scoped>

</style>