<template>
  <div class="Container">
    <Header @propsClick="setShowStatusFalse"
            :title="artist.name"
            ref="header"></Header>
    <div class="ImgWrapper" :style="{backgroundImage: 'url('+ artist.picUrl +')'}" ref="imageWrapper">
      <div class="filter"></div>
    </div>
    <div class="CollectButton" ref="collectButton">
      <i className="iconfont">&#xe62d;</i>
      <span className="text">收藏</span>
    </div>
    <div class="BgLayer className" ref="layer"></div>
    <div class="SongListWrapper" ref="songScrollWrapper">
      <Scroll :listenScroll="true" :probeType="3" @scroll="handleScroll" ref="songScroll">
        <SongsList :songs="songs" :showCollect="false" :usePageSplit="false"></SongsList>
      </Scroll>
    </div>
  </div>
</template>
<script lang="ts">
import router from '@/router';
import { ISingerState } from '@/typings/singer';
import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex';
import Header from "../../baseUI/header/index.vue";
import * as Types from '@/store/action-types'
import { GlobalState } from '@/store';
import Scroll from "@/baseUI/scroll/index.vue";
import SongsList from '../SongsList/index.vue'
import { HEADER_HEIGHT } from "@/api/config";
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

    const OFFSET = 5;
    // let initialHeight = 0
    const initialHeight = ref(0)

    const imageWrapper = ref<null | HTMLElement>(null)
    const songScrollWrapper = ref<null | HTMLElement>(null)
    const layer = ref<null | HTMLElement>(null)
    const songScroll = ref()
    onMounted(async () => {
      const h: number = imageWrapper?.value?.offsetHeight as number
      initialHeight.value = h
      const scrollWrapper = songScrollWrapper?.value?.style
      if (scrollWrapper && h) scrollWrapper.top = `${h - OFFSET}px`;
      //把遮罩先放在下面，以裹住歌曲列表
      const layerStyle = layer?.value?.style
      if (layerStyle && h) layerStyle.top = `${h - OFFSET}px`;
      await nextTick()
      songScroll.value.refresh()
    })

    const collectButton = ref<null | HTMLElement>(null)
    const header = ref<null | HTMLElement>(null)

    function handleScroll(pos: any) {
      console.log('handleScroll', pos)
      const height = initialHeight.value
      const newY = pos.y
      const imageDOM = imageWrapper.value
      const buttonDOM = collectButton.value
      const headerDOM = header.value;
      const layerDOM = layer.value;
      const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

      const percent = Math.abs(newY / height);
      //在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM其实是起一个遮罩的作用，给歌单内容提供白色背景
      //因此在处理的过程中，随着内容的滚动，遮罩也跟着移动
      const imageDOMStyle = imageDOM?.style
      const layerDOMStyle = layerDOM?.style
      const buttonDOMStyle = buttonDOM?.style
      const headerDOMStyle = headerDOM?.style
      if (newY > 0) {
        //处理往下拉的情况,效果：图片放大，按钮跟着偏移
        if (imageDOMStyle) imageDOMStyle["transform"] = `scale(${1 + percent})`;
        if (buttonDOMStyle) buttonDOMStyle["transform"] = `translate3d(0, ${newY}px, 0)`;
        if (layerDOMStyle) layerDOMStyle.top = `${height - OFFSET + newY}px`;
      } else if (newY >= minScrollY) {
        //往上滑动，但是还没超过Header部分
        if (layerDOMStyle) {
          layerDOMStyle.top = `${height - OFFSET - Math.abs(newY)}px`;
          layerDOMStyle.zIndex = '1';
        }
        if(imageDOMStyle) {
          imageDOMStyle.paddingTop = "75%";
          imageDOMStyle.height = '0';
          imageDOMStyle.zIndex = '-1';
        }
        if (buttonDOMStyle) {
          buttonDOMStyle["transform"] = `translate3d(0, ${newY}px, 0)`;
          buttonDOMStyle["opacity"] = `${1 - percent * 2}`;
        }
      } else if (newY < minScrollY) {
        //往上滑动，但是超过Header部分
        if(layerDOMStyle) {
          layerDOMStyle.top = `${HEADER_HEIGHT - OFFSET}px`;
          layerDOMStyle.zIndex = '1';
        }
        //防止溢出的歌单内容遮住Header
        if(headerDOMStyle) headerDOMStyle.zIndex = '100';
        //此时图片高度与Header一致
        if (imageDOMStyle){
          imageDOMStyle.height = `${HEADER_HEIGHT}px`;
          imageDOMStyle.paddingTop = '0';
          imageDOMStyle.zIndex = '99';
        }
      }
    }

    return {
      setShowStatusFalse,
      artist,
      songs,
      handleScroll,
      imageWrapper,
      songScrollWrapper,
      layer,
      songScroll,
      collectButton,
      header
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