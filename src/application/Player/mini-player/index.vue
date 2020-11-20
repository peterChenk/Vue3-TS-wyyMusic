<template>
  <div class="MiniPlayerContainer"
       ref="miniPlayerRef"
       v-if="!full"
       @click="setFullScreen(true)">
    <div class="icon">
      <div class="imgWrapper"
           ref="miniWrapperRef">
        <img class="play"
             :class="playing ? '': 'pause'"
             ref="miniImageRef"
             :src="song.al.picUrl"
             width="40"
             height="40"
             alt="img" />
      </div>
    </div>
    <div class="text">
      <h2 class="name">{{song.name}}</h2>
      <p class="desc">{{getNames(song.ar)}}</p>
    </div>
    <div class="control">
      <ProgressCircle :radius="32" :percent="percent">
        <i class="icon-mini iconfont icon-pause"
          v-if="playing"
          @click="clickPlaying($event, false)"
          >&#xe650;</i>
        <i class="icon-mini iconfont icon-play" 
          v-else
          @click="clickPlaying($event, true)"
          >&#xe61e;</i> 
      </ProgressCircle>
    </div>
    <div class="control"
         @click="handleTogglePlayList($event)">
      <i class="iconfont">&#xe640;</i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { getName } from "@/api/utils";
import ProgressCircle from "@/baseUI/progress-circle/index.vue";
export default defineComponent({
  components: {
    ProgressCircle
  },
  props: {
    full: Boolean,
    song: Object,
    playing: Boolean,
    percent: Number,
  },
  emits: ["set-fullscreen", "toggleplaylist", "click-playing"],
  setup(props, { emit }) {
    const miniPlayerRef = ref<null | HTMLElement>(null);
    const miniWrapperRef = ref<null | HTMLElement>(null);
    const miniImageRef = ref<null | HTMLElement>(null);

    function setFullScreen(state) {
      emit("set-fullscreen", state);
    }

    function clickPlaying(e: any, flag: boolean) {
      emit("click-playing", e, flag)
    }

    function handleTogglePlayList(e: any) {
      emit("toggleplaylist", true);
      e.stopPropagation();
    }

    function getNames(list: any) {
      return getName(list);
    }

    return {
      miniPlayerRef,
      setFullScreen,
      miniWrapperRef,
      miniImageRef,
      getNames,
      handleTogglePlayList,
      clickPlaying
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../../style/global-style.scss";
@keyframes rotateAm {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.MiniPlayerContainer {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background: $highlight-background-color;
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all 0.4s;
  }
  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper {
      width: 100%;
      height: 100%;
      img {
        border-radius: 50%;
        &.play {
          animation: rotateAm 10s infinite;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      margin-bottom: 2px;
      font-size: $font-size-m;
      color: $font-color-desc;
      @include noWrap;
    }
    .desc {
      font-size: $font-size-s;
      color: $font-color-desc-v2;
      @include noWrap;
    }
  }
  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont,
    .icon-playlist {
      font-size: 30px;
      color: $theme-color;
    }
    .icon-mini {
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play {
        left: 9px;
      }
    }
  }
}
</style>