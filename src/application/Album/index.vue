<template>
  <div class="Container" :style="{bottom: play > 0 ? '60px' : '0'}">
    <Header :title="title" @propsClick="handleBack" :isMarquee="isMarquee" :ref="headerEl"></Header>
    <Scroll :listenScroll="true" :probeType="3" @scroll="handleScroll" ref="songScroll">
      <AlbumDetail :currentAlbum="currentAlbum.playlist" @musicAnimation="musicAnimation"></AlbumDetail>
    </Scroll>
    <MusicNote ref="musicNoteRef"></MusicNote>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import Header from '@/baseUI/header/index.vue'
import Scroll from '@/baseUI/scroll/index.vue'
import AlbumDetail from '@/components/album-detail/index.vue';
import { useStore } from 'vuex';
import { GlobalState } from '@/store';
import * as Types from '@/store/action-types'
import router from '@/router';
import { HEADER_HEIGHT } from '@/api/config';
import MusicNote from '@/baseUI/music-note/index.vue';
export default defineComponent({
  components: {
    Header,
    Scroll,
    AlbumDetail,
    MusicNote
  },
  setup() {
    const store = useStore<GlobalState>()
    const play = computed(() => store.state.player.playList.length)

    const id = router.currentRoute.value.params.id
    store.dispatch(`album/${Types.CHANGE_CURRENT_ALBUM}`, id)
    const currentAlbum = computed(() => store.state.album.currentAlbum)

    const title = ref('歌单')
    const isMarquee = ref(false)
    // const headerEl = ref<null | HTMLElement>(null)
    let headerDom: any = null
    let headerEl
    onMounted(() => {
      headerEl = (el: any) => {
        headerDom = el.$el
      }
    })

    function handleScroll(pos: any) {
      const minScrollY = -HEADER_HEIGHT;
      const percent = Math.abs(pos.y/minScrollY);
      // const headerDom = headerEl.value;
      // 获取组件的dom应用
      // console.log('headerDom', headerDom)
      const headerDomStyle = headerDom?.style
      if (pos.y < minScrollY) { 
        if(headerDomStyle) {
          headerDomStyle.backgroundColor = '#d44439';
          headerDomStyle.opacity = Math.min(1, (percent-1)/2) + '';
        }
        title.value = currentAlbum.value&&currentAlbum.value.playlist.name;
        isMarquee.value = true;
      } else {
        if (headerDomStyle) {
          headerDomStyle.backgroundColor = "";
          headerDomStyle.opacity = '1';
        }
        title.value = "歌单";
        isMarquee.value = false;
      }
    }

    const musicNoteRef = ref()
    function musicAnimation (x, y) {
      debugger
      musicNoteRef.value.startAnimation({x, y})
    }

    function handleBack() {
      router.back()
    }

    return {
      play,
      currentAlbum,
      handleBack,
      title,
      isMarquee,
      headerEl,
      handleScroll,
      musicNoteRef,
      musicAnimation
    }
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
    /* bottom: 60px; */
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