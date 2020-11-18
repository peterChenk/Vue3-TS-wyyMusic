<template>
  <div class="PlayListWrapper" v-if="showPlayList" @click="togglePlayListDispatch(false)">
    <div class="list_wrapper">
      <div class="ListHeader">
        <h1 class="title">
          <div>
            <i class="iconfont" @click="changeMode($event)"  v-html="content"></i>
            <span class="text" @click="changeMode($event)">{{text}}</span>
          </div>
          <span class="iconfont clear" @click="handleShowClear">&#xe63d;</span>
        </h1>
      </div>
      <div class="ScrollWrapper">
        <Scroll ref="listContentRef">
          <div class="ListContent">
            <li v-for="(item, index) in playList" :key="item.id" class="item" @click="handleChangeCurrentIndex(index)">
              <i class="current iconfont" :class="currentSong.id === item.id ? 'icon-play' : ''" v-html="currentSong.id === item.id ? '&#xe6e3;' : ''"></i>
              <span class="text">{{item.name}} - {{getNames(item.ar)}}</span>
              <span class="like">
                <i class="iconfont">&#xe601;</i>
              </span>
              <span class="delete" @click="handleDeleteSong($event, item)">
                <i class="iconfont">&#xe63d;</i>
              </span>
            </li>
          </div>
        </Scroll>
      </div>
    </div>
  </div>
  <Confirm ref="confirmRef" text="是否删除全部?" cancelBtnText="取消" confirmBtnText="确定" @handleConfirm="handleConfirmClear"></Confirm>
</template>
<script lang="ts">
import { GlobalState } from '@/store';
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import { playMode } from '@/api/config';
import * as Types from '@/store/action-types'
import { getName, shuffle, findIndex } from '@/api/utils';
import Scroll from '@/baseUI/scroll/index.vue'
import Confirm from '@/baseUI/confirm/index.vue'
export default defineComponent({
  components: {
    Scroll,
    Confirm
  },
  props: {},
  emits: ['clear-pre-song'],
  setup(props, {emit}) {
    const store = useStore<GlobalState>()
    const mode = computed(() => store.state.player.mode)
    const sequencePlayList = computed(() => store.state.player.sequencePlayList)
    const currentSong = computed(() => store.state.player.currentSong)
    const showPlayList = computed(() => store.state.player.showPlayList)
    const currentIndex = computed(() => store.state.player.currentIndex)
    const playList = computed(() => store.state.player.playList)

    // title
    let content, text;
    if(mode.value === playMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if(mode.value === playMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }

    function changeMode (e: any) {
      const newMode = (mode.value + 1)%3;
      if(newMode === 0){
        // changePlayListDispatch(sequencePlayList);
        store.dispatch(`player/${Types.SET_PLAYLIST}`, sequencePlayList.value)
        const index = findIndex(currentSong.value, sequencePlayList.value);
        // changeCurrentIndexDispatch(index);
        store.dispatch(`player/${Types.SET_CURRENT_INDEX}`, index)
      }else if(newMode === 1){
        // changePlayListDispatch(sequencePlayList);
        store.dispatch(`player/${Types.SET_PLAYLIST}`, sequencePlayList.value)
      } else if(newMode === 2) {
        const newList = shuffle(sequencePlayList.value);
        const index = findIndex(currentSong.value, newList);
        // changePlayListDispatch(newList);
        store.dispatch(`player/${Types.SET_PLAYLIST}`, sequencePlayList.value)
        // changeCurrentIndexDispatch(index);
        store.dispatch(`player/${Types.SET_CURRENT_INDEX}`, index)
      }
      store.dispatch(`player/${Types.SET_PLAY_MODE}`, newMode)
    }

    function handleChangeCurrentIndex(index: any) {
      if(currentIndex.value === index) return;
      // changeCurrentIndexDispatch(index);
      store.dispatch(`player/${Types.SET_CURRENT_INDEX}`, index)
    }

    // ListContent

    function getNames (list: any) {
      return getName(list)
    }

    function handleDeleteSong (e: any, song: any) {
      e.stopPropagation()
      store.dispatch(`player/${Types.DELETE_SONG}`, song)
    }

    function clearDispatch () {
     store.dispatch(`player/${Types.SET_PLAYLIST}`, [])
     store.dispatch(`player/${Types.SET_SEQUECE_PLAYLIST}`, [])
     store.dispatch(`player/${Types.SET_CURRENT_INDEX}`, -1)
     store.dispatch(`player/${Types.SET_SHOW_PLAYLIST}`, false)
     store.dispatch(`player/${Types.SET_CURRENT_SONG}`, {})
     store.dispatch(`player/${Types.SET_PLAYING_STATE}`, false)
    }

    function handleConfirmClear () {
      clearDispatch();
      // 修复清空播放列表后点击同样的歌曲，播放器不出现的bug
      // clearPreSong();
      emit('clear-pre-song')
    }

    const confirmRef = ref()
    function handleShowClear () {
      confirmRef.value.setShow(true)
    }

    function togglePlayListDispatch (data) {
      store.dispatch(`player/${Types.SET_SHOW_PLAYLIST}`, data)
    }

    return {
      showPlayList,
      content,
      text,
      changeMode,
      handleChangeCurrentIndex,
      currentSong,
      getNames,
      handleDeleteSong,
      handleConfirmClear,
      confirmRef,
      handleShowClear,
      playList,
      togglePlayListDispatch
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../../../style/global-style.scss";
  .PlayListWrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background-color: $background-color-shadow;
    &.list-fade-enter{
      opacity: 0;
    }
    &.list-fade-enter-active{
      opacity: 1;
      transition: all 0.3s;
    }
    &.list-fade-exit{
      opacity: 1;
    }
    &.list-fade-exit-active{
      opacity: 0;
      transition: all 0.3s;
    }
    .list_wrapper{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      opacity: 1;
      border-radius: 10px 10px 0 0;
      background-color: $highlight-background-color;
      transform: translate3d(0, 0, 0);
      .list_close{
        text-align: center;
        line-height: 50px;
        background: $background-color;
        font-size: $font-size-l;
        color: $font-color-desc;
      }
    }
  }
  .ListHeader{
    position: relative;
    padding: 20px 30px 10px 20px;
    .title{
      display: flex;
      align-items: center;
      >div{
        flex:1;
        .text{
          flex: 1;
          font-size: font-size-m;
          color: font-color-desc;
        }
      }
      .iconfont {
        margin-right: 10px;
        font-size: $font-size-ll;
        color: $theme-color;
      }

      .clear{
        @include extendClick;
        font-size: $font-size-l;
      }
    }
  }
  .ScrollWrapper{
    height: 400px;
    overflow: hidden;
  }
  .ListContent{
    .item{
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 30px 0 20px;
      overflow: hidden;
      &.list-enter, &.list-exit-done{
        height: 0;
      }
      &.list-enter-active, &.list-leave-active{
        transition: all 0.1s;
      }
      .current{
        flex: 0 0 20px;
        width: 20px;
        font-size: $font-size-s;
        color: $theme-color;
      }
      .text{
        flex: 1;
        @include noWrap;
        font-size: $font-size-m;
        color: $font-color-desc-v2;
        .icon-favorite{
          color: $theme-color;
        }
      }
      .like{
        @include extendClick;
        margin-right: 15px;
        font-size: $font-size-m;
        color: $theme-color;
      }
      .delete{
        @include extendClick;
        font-size: $font-size-s;
        color: $theme-color;
      }
    }
  }
</style>