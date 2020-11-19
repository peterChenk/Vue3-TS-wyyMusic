<template>
  <div>
    <!-- <NormalPlayer></NormalPlayer> -->
    <MiniPlayer v-if="showMiniPlayer"
                :playing="playing"
                :full="fullScreen"
                :song="currentSong"
                :percent="percent"
                @clickPlaying="clickPlaying"
                @setFullscreen="toggleFullScreenDispatch"
                @toggleplaylist="togglePlayListDispatch"></MiniPlayer>
    <PlayList @clearPreSong="setPreSong"></PlayList>
    <audio
      ref="audioRef"
      id="h5audio_media"
      onended="handleEnd"
      onerror="handleError"
    ></audio>
    <!-- <Toast></Toast> -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, provide, reactive, ref, watch, watchEffect } from "vue";
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
    PlayList,
    // Toast
  },
  props: {
  },
  setup () {
    
    const currentTime = ref(0)
    const duration = ref(0)
    const percent = ref(0)
    percent.value = isNaN(currentTime.value / duration.value) ? 0 : currentTime.value / duration.value;

    let preSong = reactive({id: ''})
    const songReady = ref(true)
    const audioRef = ref<null | HTMLAudioElement>(null)
    const currentPlayingLyric = ref('')

    const store = useStore<GlobalState>()

    const playList = computed(() => store.state.player.playList)
    const playing = computed(() => store.state.player.playing)
    const fullScreen = computed(() => store.state.player.fullScreen)
    const currentSong = computed(() => store.state.player.currentSong)
    const currentIndex = computed(() => store.state.player.currentIndex)
    const speed = computed(() => store.state.player.speed)

    function togglePlayingDispatch (state) {
      store.dispatch(`player/${Types.SET_PLAYING_STATE}`, state)
    }

    const getLyric = id => {
      // let lyric = "";
      // if (currentLyric.current) {
      //   currentLyric.current.stop();
      // }
      // 避免songReady恒为false的情况
      setTimeout(() => {
        songReady.value = true;
      }, 3000);
      // getLyricRequest(id)
      //   .then(data => {
      //     lyric = data.lrc && data.lrc.lyric;
      //     if(!lyric) {
      //       currentLyric.current = null;
      //       return;
      //     }
      //     currentLyric.current = new Lyric(lyric, handleLyric, speed);
      //     currentLyric.current.play();
      //     currentLineNum.current = 0;
      //     currentLyric.current.seek(0);
      //   })
      //   .catch(() => {
      //     currentLyric.current = "";
      //     songReady.current = true;
      //     audioRef.current.play();
      //   });
    };
    function updateTime(e: any) {
      currentTime.value = e.target.currentTime
    }
    // 初始化
    const showMiniPlayer = ref(false)
    let audioRefValue
    onMounted(() => {
      audioRefValue = audioRef.value
      // 播放器监听
      const Media = document.getElementById("h5audio_media")
      if (Media) {
        Media.addEventListener("timeupdate", function (event) {
          updateTime(event)
        })
      }
    })
    // 观察currentIndex变化
    watch(currentIndex, (newVal, oldVal) => {
      if (!playList.value.length || 
        currentIndex.value === -1 ||
        !playList.value[currentIndex.value] ||
        playList.value[currentIndex.value].id === preSong.id ||
        !songReady.value) return
        songReady.value = false
        const current = playList.value[currentIndex.value]
        store.dispatch(`player/${Types.SET_CURRENT_SONG}`, current)
        preSong = current
        currentPlayingLyric.value = ''
        if (audioRefValue) {
          audioRefValue.src = getSongUrl(current.id);
          audioRefValue.autoplay = true;
          audioRefValue.playbackRate = speed.value;
        }
        togglePlayingDispatch(true)
        getLyric(current.id)
        currentTime.value = 0
        duration.value = (current.dt / 1000) | 0

        if (!isEmptyObject(currentSong.value)) {
          showMiniPlayer.value = true
        }
    })
    watch(playing, (newVal, oldVal) => {
      if (audioRefValue) {
        newVal ? audioRefValue.play() : audioRefValue.pause();
      }
    })
    watch(currentTime, (newVal, oldVal) => {
      percent.value = isNaN(currentTime.value / duration.value) ? 0 : currentTime.value / duration.value;
      // console.log('percent', percent)
    })
    provide('percent11', percent)

    // const currentLyric = ref(null)

    function clickPlaying (e: any, state: boolean) {
      e.stopPropagation()
      togglePlayingDispatch(state)
      // if(currentLyric.current) {
      //   currentLyric.current.togglePlay(currentTime*1000);
      // }
    }
    function toggleFullScreenDispatch (data: boolean) {
      store.dispatch(`player/${Types.SET_FULL_SCREEN}`, data)
    }
    function togglePlayListDispatch (data: boolean) {
      store.dispatch(`player/${Types.SET_SHOW_PLAYLIST}`, data)
    }

    function setPreSong () {
      // preSong = {id: ''}
      console.log('setPreSong')
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
      playList,
      audioRef,
      setPreSong
    }
  }
});
</script>
<style lang="scss" scoped>
</style>