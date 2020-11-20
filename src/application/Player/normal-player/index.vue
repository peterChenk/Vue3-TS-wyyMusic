<template>
  <div class="NormalPlayerContainer"
       v-if="full">
    <div class="background">
      <img :src="song.al.picUrl + '?param=300x300'"
           width="100%"
           height="100%"
           alt="歌曲图片" />
    </div>
    <div class="background layer"></div>
    <!-- Top -->
    <div class="Top top">
      <div class="back"
           @click="toggleFullScreenDispatch(false)">
        <i class="iconfont icon-back">&#xe662;</i>
      </div>
      <div class="text">
        <h1 class="title">{{song.name}}</h1>
        <h1 class="subtitle">{{getName(song.ar)}}</h1>
      </div>
    </div>
    <!-- Middle -->
    <div class="Middle">
      <div class="CDWrapper">
        <div class="needle"
             :class="playing ? '' : 'pause'"></div>
        <div class="cd">
          <img class="image play"
               :class="playing ? '' : 'pause'"
               :src="song.al.picUrl + '?param=400x400'"
               alt="" />
        </div>
        <p class="playing_lyric">{{currentPlayingLyric}}</p>
      </div>
      <!-- <div class="LyricContainer">
        <Scroll>
          <div class="LyricWrapper" class="lyric_wrapper">
            
          </div>
        </Scroll>
      </div> -->
    </div>
    <div class="Bottom">
      <div class="List">
        <span>倍速听歌</span>
        <span v-for="(item) in list"
              @click="clickSpeed(item.key)"
              :key="item.key"
              class="ListItem"
              :class="{'selected': speed === item.key}">{{item.name}}</span>
      </div>
      <div class="ProgressWrapper">
        <span class="time time-l">{{formatPlayTime(currentTime)}}</span>
        <div class="progress-bar-wrapper">
          <ProgressBar
            :percentChange="onProgressChange"
          ></ProgressBar>
          <!-- <ProgressBar
            :percent="percent"
            :percentChange="onProgressChange"
          ></ProgressBar> -->
        </div>
        <div class="time time-r">{{formatPlayTime(duration)}}</div>
      </div>
      <div class="Operators">
        <div class="icon i-left" @click="changeMode">
          <i
            class="iconfont"
            v-html="getPlayMode()"
          ></i>
        </div>
        <div class="icon i-left" @click="handlePrev">
          <i class="iconfont">&#xe6e1;</i>
        </div>
        <div class="icon i-center">
          <i
            class="iconfont"
            @click="clickPlayingCB($event)"
            v-html="playing ? '&#xe723;' : '&#xe731;'"
          ></i>
        </div>
        <div class="icon i-right" @click="handleNext">
          <i class="iconfont">&#xe718;</i>
        </div>
        <div
          class="icon i-right"
          @click="togglePlayListDispatch(true)"
        >
          <i class="iconfont">&#xe640;</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import { getName, formatPlayTime } from "@/api/utils";
import { useStore } from "vuex";
import { GlobalState } from "@/store";
import * as Types from "@/store/action-types";
import { playMode, list } from "@/api/config";
import ProgressBar from "@/baseUI/progress-bar/index.vue";
export default defineComponent({
  components: {
    ProgressBar
  },
  props: {
    song: Object,
    full: Boolean,
    playing: Boolean,
    speed: Number,
    currentPlayingLyric: String,
    duration: Number,
    currentTime: Number,
    mode: Number
  },
  emits: ['click-speed', 'on-progress-change', 'change-mode', 'handle-prev', 'click-playing', 'handle-next', 'toggleplaylist'],
  setup(props, {emit}) {
    const store = useStore<GlobalState>();
    const { mode } = toRefs(props) 

    function toggleFullScreenDispatch(data: boolean) {
      // console.log('toggleFullScreenDispatch')
      store.dispatch(`player/${Types.SET_FULL_SCREEN}`, data);
    }

    function clickSpeed (newSpeed: number) {
      emit('click-speed', newSpeed)
    }
    function onProgressChange (curPercent) {
      emit('on-progress-change', curPercent)
    }

    function changeMode () {
      emit('change-mode')
    }

    function getPlayMode () {
      let content;
      if (mode?.value === playMode.sequence) {
        content = "&#xe625;";
      } else if (mode?.value === playMode.loop) {
        content = "&#xe653;";
      } else {
        content = "&#xe61b;";
      }
      return content;
    }

    function handlePrev () {
      emit('handle-prev')
    }
    function clickPlayingCB (e: any) {
      emit('click-playing', e, !props.playing)
    }

    function handleNext () {
      emit('handle-next')
    }
    function togglePlayListDispatch (data: boolean) {
      emit('toggleplaylist', data)
    }

    return {
      toggleFullScreenDispatch,
      getName,
      list,
      clickSpeed,
      formatPlayTime,
      onProgressChange,
      changeMode,
      getPlayMode,
      handlePrev,
      clickPlayingCB,
      handleNext,
      togglePlayListDispatch
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../../style/global-style.scss";
.NormalPlayerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: $background-color;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer {
      background: $font-color-desc;
      opacity: 0.3;
      filter: none;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &.normal-enter,
  &.normal-exit-done {
    .top {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }
  &.normal-enter-active,
  &.normal-exit-active {
    .top,
    .bottom {
      transform: translate3d(0, 0, 0);
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
    opacity: 1;
    transition: all 0.4s;
  }
  &.normal-exit-active {
    opacity: 0;
  }
}
.Top {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid $border-color-v2;
  padding-bottom: 5px;
  width: 100%;
  height: 8%;
  .back {
    margin-left: 5px;
    z-index: 50;
    .iconfont {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: $font-color-desc;
      font-weight: bold;
      transform: rotate(90deg);
    }
  }
  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .title {
    line-height: 25px;
    font-size: $font-size-l;
    color: $font-color-desc;
    @include noWrap;
  }
  .subtitle {
    line-height: 20px;
    font-size: $font-size-m;
    color: $font-color-desc-v2;
    @include noWrap;
  }
}
.Middle {
  position: fixed;
  width: 100%;
  top: 8%;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: all 0.4s;
  }
  .fade-enter-done {
    transition: none;
  }
  .fade-exit-active {
    opacity: 0;
  }
  .fade-exit-done {
    opacity: 0;
  }
}
.CDWrapper {
  margin: auto;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  .needle {
    position: absolute;
    top: -6.67vw;
    left: 48vw;
    width: 25vw;
    height: 40vw;
    z-index: 100;
    /* background-image: url(${needle}); */
    background-image: url("./needle.png");
    @include bgFull;
    transform-origin: 4.5vw 4.5vw;
    transition: all 0.3s;
    transform: rotate(0);
    &.pause {
      transform: rotate(-30deg);
    }
  }
  @keyframes rotateAm {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .cd {
    top: 16%;
    position: absolute;
    width: 70%;
    height: 70vw;
    /* background-image: url(${disc}); */
    border: 4px solid $border-color-v2;
    border-radius: 50%;
    @include bgFull;
    .image {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 68%;
      height: 68%;
      margin: auto;
      border-radius: 50%;
    }
    .play {
      animation: rotateAm 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .playing_lyric {
    position: absolute;
    margin: auto;
    width: 80%;
    top: 95vw;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }
}
.LyricContainer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* 遮罩 会有模糊效果，看个人喜欢*/
  /* mask-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,hsla(0,0%,100%,0)),color-stop(10%,hsla(0,0%,100%,.6)),color-stop(25%,#fff),color-stop(75%,#fff),color-stop(85%,hsla(0,0%,100%,.6)),to(hsla(0,0%,100%,0)));
    mask-image: linear-gradient(linear,left top,left bottom,color-stop(0,hsla(0,0%,100%,0)),color-stop(10%,hsla(0,0%,100%,.6)),color-stop(25%,#fff),color-stop(75%,#fff),color-stop(85%,hsla(0,0%,100%,.6)),to(hsla(0,0%,100%,0))); */
}
.LyricWrapper {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  p {
    line-height: 32px;
    color: rgba(255, 255, 255, 0.5);
    white-space: normal;
    font-size: $font-size-l;
    &.current {
      color: #fff;
    }
    &.pure {
      position: relative;
      top: 30vh;
    }
  }
}
.Bottom {
  position: absolute;
  bottom: 50px;
  width: 100%;
}
.List {
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: space-around;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    color: $font-color-desc-v2;
    font-size: $font-size-m;
    vertical-align: middle;
  }
}
.ListItem {
  flex: 0 0 auto;
  font-size: $font-size-m;
  padding: 5px 5px;
  border-radius: 10px;
  color: $font-color-desc-v2;
  &.selected {
    color: $theme-color;
    border: 1px solid $theme-color;
    opacity: 0.8;
  }
}
.ProgressWrapper{
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0px auto;
  padding: 10px 0;
  .time {
    color: $font-color-desc;
    font-size: $font-size-s;
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;
    &.time-l {
      text-align: left;
    }
    &.time-r {
      text-align: right;
    }
  }
  .progress-bar-wrapper {
    flex: 1;
  }
}
.Operators{
  display: flex;
  align-items: center;
  .icon {
    font-weight: 300;
    flex: 1;
    color: $font-color-desc;
    &.disable {
      color: $theme-color-shadow;
    }
    i {
      font-weight: 300;
      font-size: 30px;
    }
  }
  .i-left {
    text-align: right;
  }
  .i-center {
    padding: 0 20px;
    text-align: center;
    i {
      font-size: 40px;
    }
  }
  .i-right {
    text-align: left;
  }
  .icon-favorite {
    color: $theme-color;
  }
}
</style>