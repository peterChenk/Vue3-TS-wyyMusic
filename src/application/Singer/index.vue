<template>
  <div class="Container">
    <Header @propsClick="setShowStatusFalse"
            :title="artist.name"
            ref="header"></Header>
    <div class="ImgWrapper" :style="{backgroundImage: 'url('+ artist.picUrl +')'}" ref="imageWrapper">
      <div class="filter"></div>
    </div>
    <div class="CollectButton">
      <i className="iconfont">&#xe62d;</i>
      <span className="text">收藏</span>
    </div>
    <div class="BgLayer className" ref="layer"></div>
    <div class="SongListWrapper" ref="songScrollWrapper">
      <Scroll :listenScroll="true" @scroll="handleScroll" ref="songScroll">
        <SongsList :songs="songs" :showCollect="false" :usePageSplit="false"></SongsList>
      </Scroll>
    </div>
  </div>
</template>
<script lang="ts">
import router from '@/router';
import { ISingerState } from '@/typings/singer';
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex';
import Header from "../../baseUI/header/index.vue";
import * as Types from '@/store/action-types'
import { GlobalState } from '@/store';
import Scroll from "@/baseUI/scroll/index.vue";
import SongsList from '../SongsList/index.vue'
export default defineComponent({
  components: {
    Header,
    Scroll,
    SongsList
  },
  setup() {
    const store = useStore<GlobalState>()

    const singerId = router.currentRoute.value.params.id
    function getSingerDataDispatch(singerId: any) {
      store.dispatch(`singer/${Types.SET_SINGER_INFO}`, singerId)
    }
    getSingerDataDispatch(singerId)
    
    const artist = computed(() => store.state.singer.artist)
    const songs = computed(() => store.state.singer.songsOfArtist)
    const loading = computed(() => store.state.singer.loading)

    function setShowStatusFalse() {
      router.back()
    }

    function handleScroll(pos: any) {
      console.log('handleScroll', pos)
    }

    const OFFSET = 5;
    let initialHeight = 0

    const imageWrapper = ref<null | HTMLElement>(null)
    const songScrollWrapper = ref<null | HTMLElement>(null)
    const layer = ref<null | HTMLElement>(null)
    const songScroll = ref()
    onMounted(() => {
      const h: number = imageWrapper?.value?.offsetHeight as number
      initialHeight = h
      const scrollWrapper = songScrollWrapper?.value?.style
      if (scrollWrapper && h) scrollWrapper.top = `${h - OFFSET}px`;
      //把遮罩先放在下面，以裹住歌曲列表
      const layerStyle = layer?.value?.style
      if (layerStyle && h) layerStyle.top = `${h - OFFSET}px`;
      songScroll.value.refresh()
    })

    return {
      setShowStatusFalse,
      artist,
      songs,
      handleScroll,
      imageWrapper,
      songScrollWrapper,
      layer,
      songScroll
    }
  }
  
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
.Container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
}
.ImgWrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  /* background: url(${props => props.bgUrl}); */
  background-size: cover;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* : blur(20px); */
    background: rgba(7, 17, 27, 0.3);
  }
}
.CollectButton {
  position: fixed;
  left: 0; right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index:50;
  background: $theme-color;
  color: $font-color-light;
  border-radius: 20px;
  text-align: center;
  font-size: 0;
  line-height: 40px;
  .iconfont{
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
}
.BgLayer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
}
.SongListWrapper {
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  >div{
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
}
</style>