<template>
  <div>
    <!-- <NormalPlayer></NormalPlayer> -->
    <MiniPlayer v-if="showMiniPlayer"
                :playing="playing"
                :full="fullScreen"
                :song="currentSong"
                :percent="percent"
                @clickPlaying="clickPlaying"
                @setfullscreen="toggleFullScreenDispatch"
                @toggleplaylist="togglePlayListDispatch"></MiniPlayer>
    <!-- <PlayList></PlayList>
    <audio
      ref="audioRef"
      onTimeUpdate={updateTime}
      onEnded={handleEnd}
      onError={handleError}
    ></audio>
    <Toast></Toast> -->
    <p>{{playList}}</p>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import NormalPlayer from "./normal-player/index.vue";
import MiniPlayer from "./mini-player/index.vue";
import PlayList from "./play-list/index.vue";
import Toast from "@/baseUI/toast/index.vue";
import { useStore } from 'vuex';
import { GlobalState } from '@/store';
import * as Types from '@/store/action-types'
import { isEmptyObject, shuffle, findIndex, getSongUrl } from "@/api/utils"
export default defineComponent({
  components: {
    // NormalPlayer,
    MiniPlayer,
    // PlayList,
    // Toast
  },
  props: {
  },
  setup () {
    
    const currentTime = ref(0)
    const duration = ref(0)
    const percent = isNaN(currentTime.value / duration.value) ? 0 : currentTime.value / duration.value;

    let preSong = reactive({id: ''})
    const songReady = ref(false)
    const currentPlayingLyric = ref('')

    const store = useStore<GlobalState>()

    const playList = computed(() => store.state.player.playList)
    const playing = computed(() => store.state.player.playing)
    const fullScreen = computed(() => store.state.player.fullScreen)
    const currentSong = computed(() => store.state.player.currentSong)
    const currentIndex = computed(() => store.state.player.currentIndex)
    console.log('playList', playList.value)

    function togglePlayingDispatch (state) {
      store.dispatch(`player/${Types.SET_PLAYING_STATE}`, state)
    }

    // const getLyric = id => {
    //   let lyric = "";
    //   if (currentLyric.current) {
    //     currentLyric.current.stop();
    //   }
    //   // 避免songReady恒为false的情况
    //   setTimeout(() => {
    //     songReady.current = true;
    //   }, 3000);
    //   getLyricRequest(id)
    //     .then(data => {
    //       lyric = data.lrc && data.lrc.lyric;
    //       if(!lyric) {
    //         currentLyric.current = null;
    //         return;
    //       }
    //       currentLyric.current = new Lyric(lyric, handleLyric, speed);
    //       currentLyric.current.play();
    //       currentLineNum.current = 0;
    //       currentLyric.current.seek(0);
    //     })
    //     .catch(() => {
    //       currentLyric.current = "";
    //       songReady.current = true;
    //       audioRef.current.play();
    //     });
    // };
    // 初始化
    if (!playList.value.length || 
        currentIndex.value === -1 ||
        !playList.value[currentIndex.value] ||
        playList.value[currentIndex.value].id === preSong.id ||
        !songReady.value) return
    songReady.value = false
    const current = playList[currentIndex.value]
    store.dispatch(`player/${Types.SET_CURRENT_SONG}`, current)
    preSong = current
    currentPlayingLyric.value = ''
    // audioRef.value.src = getSongUrl(current.id);
    // audioRef.value.autoplay = true;
    // audioRef.value.playbackRate = speed;
    togglePlayingDispatch(true)
    // getLyric(current.id)
    currentTime.value = 0
    duration.value = (current.dt / 1000) | 0

   

    // const currentLyric = ref(null)

    function clickPlaying (e: any, state: boolean) {
      e.stopPropagation()
      togglePlayingDispatch(state)
      console.log('playing', playing)

    }
    function toggleFullScreenDispatch (data: boolean) {
      store.dispatch(`player/${Types.SET_FULL_SCREEN}`, data)
    }
    function togglePlayListDispatch (data: boolean) {
      store.dispatch(`player/${Types.SET_SHOW_PLAYLIST}`, data)
    }

    const showMiniPlayer = ref(true)
    if (isEmptyObject(currentSong.value)) {
      showMiniPlayer.value = false
    }
    return {
      playing,
      fullScreen,
      currentSong,
      percent,
      clickPlaying,
      toggleFullScreenDispatch,
      togglePlayListDispatch,
      showMiniPlayer,
      playList
    }
  }
});
</script>
<style lang="scss" scoped>
</style>