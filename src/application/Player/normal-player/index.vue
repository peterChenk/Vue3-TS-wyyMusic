<template>
  <div class="NormalPlayerContainer">
    <div class="background">
      <img
        :src="song.al.picUrl + '?param=300x300'"
        width="100%"
        height="100%"
        alt="歌曲图片"
      />
    </div>
    <div class="background layer"></div>
    <!-- Top -->
    <div class="Top top">
      <div class="back" @click="toggleFullScreenDispatch(false)">
        <i class="iconfont icon-back">&#xe662;</i>
      </div>
      <div class="text">
        <h1 class="title">{{song.name}}</h1>
        <h1 class="subtitle">{{getNames(song.ar)}}</h1>
      </div>
    </div>
    <!-- Middle -->
    <div class="Middle">
      <div class="CDWrapper">
        <div class="needle" :class="playing ? '' : 'pause'"></div>
          <div class="cd">
            <img
              class="image play"
              :class="playing ? '' : 'pause'"
              :src="song.al.picUrl + '?param=400x400'"
              alt=""
            />
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
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { getName } from '@/api/utils'
export default defineComponent({
  props: {
    song: Object
  },
  setup() {
    function toggleFullScreenDispatch () {
      console.log('toggleFullScreenDispatch')
    }

    function getNames (list) {
      return getName(list)
    }

    return {
      toggleFullScreenDispatch,
      getNames
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../../style/global-style.scss';
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
  .Top{
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
    .text{
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    .title {
      line-height: 25px;
      font-size: $font-size-l;
      color: $font-color-desc;
      @include noWrap
    }
    .subtitle {
      line-height: 20px;
      font-size: $font-size-m;
      color: $font-color-desc-v2;
      @include noWrap;
    }
  }
  .Middle{
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
  .CDWrapper{
    margin: auto;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    .needle{
      position: absolute;
      top: -6.67vw;
      left: 48vw;
      width: 25vw;
      height: 40vw;
      z-index: 100;
      /* background-image: url(${needle}); */
      @include bgFull;
      transform-origin: 4.5vw 4.5vw;
      transition: all 0.3s;
      transform: rotate(0);
      &.pause{
        transform: rotate(-30deg);
      }
    }
    @keyframes rotateAm {
      0%{
        transform: rotate(0);
      }
      100%{
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
        left: 0;right: 0;
        top: 0;bottom: 0;
        width: 68%;
        height: 68%;
        margin: auto;
        border-radius: 50%;
      }
      .play {
        animation: rotateAm 20s linear infinite;
        &.pause{
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
  .LyricWrapper{
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
      &.pure{
        position: relative;
        top: 30vh;
      }
    }
  }
</style>