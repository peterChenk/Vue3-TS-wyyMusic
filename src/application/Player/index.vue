<template>
  <div>
    <NormalPlayer :song="currentSong"
                  :full="fullScreen"
                  :playing="playing"
                  :speed="speed"
                  :percent="percent"
                  :duration="duration"
                  :currentTime="currentTime"
                  :mode="mode"
                  :modeText="modeText"
                  :currentPlayingLyric="currentPlayingLyric"
                  :currentLineNum="currentLineNum"
                  :currentLyric="currentLyric1"
                  @onProgressChange="onProgressChange"
                  @clickSpeed="clickSpeed"
                  @changeMode="changeMode"
                  @handlePrev="handlePrev"
                  @handleNext="handleNext"
                  @clickPlaying="clickPlaying"
                  @toggleplaylist="togglePlayListDispatch"
                  v-if="fullScreen"
                  ></NormalPlayer>
    <MiniPlayer v-if="showMiniPlayer"
                :playing="playing"
                :full="fullScreen"
                :song="currentSong"
                :percent="percent"
                @clickPlaying="clickPlaying"
                @setFullscreen="toggleFullScreenDispatch"
                @toggleplaylist="togglePlayListDispatch"></MiniPlayer>
    <PlayList @clearPreSong="setPreSong"></PlayList>
    <audio ref="audioRef"
           id="h5audio_media"
           @ended="handleEnd"
           @error="handleError"></audio>
    <Toast :text="modeText" ref="toastRef"></Toast>
  </div>
</template>
<script lang="ts">
// @ts-nocheck
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import NormalPlayer from "./normal-player/index.vue";
import MiniPlayer from "./mini-player/index.vue";
import PlayList from "./play-list/index.vue";
import Toast from "@/baseUI/toast/index.vue";
import { useStore } from "vuex";
import { GlobalState } from "@/store";
import * as Types from "@/store/action-types";
import { isEmptyObject, shuffle, findIndex, getSongUrl } from "@/api/utils";
import { getLyricRequest } from "@/api/search";
import Lyric from "@/api/lyric-parser";
import { playMode } from "@/api/config";
export default defineComponent({
  components: {
    NormalPlayer,
    MiniPlayer,
    PlayList,
    Toast
  },
  props: {},
  setup() {
    const currentTime = ref(0);
    const duration = ref(0);
    const percent = ref(0);
    percent.value = isNaN(currentTime.value / duration.value)
      ? 0
      : currentTime.value / duration.value;

    let preSong = reactive({ id: "" });
    const songReady = ref(true);
    const audioRef = ref<null | HTMLAudioElement>(null);
    const currentPlayingLyric = ref("");

    const store = useStore<GlobalState>();

    const playList = computed(() => store.state.player.playList);
    const playing = computed(() => store.state.player.playing);
    const fullScreen = computed(() => store.state.player.fullScreen);
    const currentSong = computed(() => store.state.player.currentSong);
    const currentIndex = computed(() => store.state.player.currentIndex);
    const speed = computed(() => store.state.player.speed);
    const mode = computed(() => store.state.player.mode);
    const sequencePlayList = computed(() => store.state.player.sequencePlayList);

    function togglePlayingDispatch(state) {
      store.dispatch(`player/${Types.SET_PLAYING_STATE}`, state);
    }
    function changeCurrentIndexDispatch (index) {
      store.dispatch(`player/${Types.SET_CURRENT_INDEX}`, index);
    }

    function updateTime(e: any) {
      currentTime.value = e.target.currentTime;
    }

    // 初始化
    const showMiniPlayer = ref(false);
    let audioRefValue;
    onMounted(() => {
      audioRefValue = audioRef.value;
      // 播放器监听
      const Media = document.getElementById("h5audio_media");
      if (Media) {
        Media.addEventListener("timeupdate", function (event) {
          updateTime(event);
        });
      }
    });
    interface MyCurrentLyric {
      seek: Function;
      changeSpeed: Function;
      togglePlay: Function;
      play: Function;
      stop: Function;
      current: string;
    }
    interface LrcIf {
      lyric: any;
    }
    interface MdataIf {
      lrc: LrcIf;
    }
    let currentLyric: MyCurrentLyric
    // let currentLineNum = 0
    const currentLineNum = ref(0)

    const handleLyric = ({ lineNum, txt }) => {
      if(!currentLyric)return;
      currentLineNum.value = lineNum;
      currentPlayingLyric.value = txt
    };
    // function handleLyric ({lineNum, txt}) {
    //   if(!currentLyric)return;
    //   currentLineNum = lineNum;
    //   currentPlayingLyric.value = txt
    // }

    const getLyric = (id) => {
      let lyric = "";
      if (currentLyric) {
        currentLyric.stop();
      }
      // 避免songReady恒为false的情况
      setTimeout(() => {
        songReady.value = true;
      }, 3000);
      getLyricRequest(id)
        .then((data) => {
          lyric = data.lrc && data.lrc.lyric;
          if(!lyric) {
            currentLyric.current = "";
            return;
          }
          currentLyric = new Lyric(lyric, handleLyric, speed.value);
          currentLyric.play();
          currentLineNum.value = 0;
          currentLyric.seek(0);
          console.log('currentLyric', currentLyric)
        })
        .catch(() => {
          currentLyric.current = "";
          songReady.value = true;
          audioRefValue.play();
        });
    };
    // 观察属性变化（类型react的useEffect作用）
    watch(currentIndex, (newVal, oldVal) => {
      debugger
      if (
        !playList.value.length ||
        currentIndex.value === -1 ||
        !playList.value[currentIndex.value] ||
        playList.value[currentIndex.value].id === preSong.id ||
        !songReady.value
      )
        return;
      songReady.value = false;
      const current = playList.value[currentIndex.value];
      store.dispatch(`player/${Types.SET_CURRENT_SONG}`, current);
      preSong = current;
      currentPlayingLyric.value = "";
      if (audioRefValue) {
        audioRefValue.src = getSongUrl(current.id);
        audioRefValue.autoplay = true;
        audioRefValue.playbackRate = speed.value;
      }
      togglePlayingDispatch(true);
      getLyric(current.id);
      currentTime.value = 0;
      duration.value = (current.dt / 1000) | 0;

      if (!isEmptyObject(currentSong.value)) {
        showMiniPlayer.value = true;
      }
    });
    watch(playing, (newVal, oldVal) => {
      if (audioRefValue) {
        newVal ? audioRefValue.play() : audioRefValue.pause();
      }
    });
    watch(currentTime, (newVal, oldVal) => {
      percent.value = isNaN(currentTime.value / duration.value)
        ? 0
        : currentTime.value / duration.value;
      // console.log('percent', percent)
    });
    provide("percent11", percent);

    // let currentLyric1 = reactive({})
    const currentLyric1 = ref(null)
    watch(fullScreen, (newVal, oldVal) => {
      if (!fullScreen.value) return;
      if (currentLyric && currentLyric.lines.length) {
        handleLyric({
          lineNum: currentLineNum.value,
          txt: currentLyric.lines[currentLineNum.value].txt
        });
      }
      currentLyric1.value = currentLyric
      console.log('currentLyric1', currentLyric1)
    })

    // const currentLyric = ref(null)

    function clickPlaying(e: any, state: boolean) {
      e.stopPropagation();
      togglePlayingDispatch(state);
      if(currentLyric) {
        currentLyric.togglePlay(currentTime.value*1000);
      }
    }
    function toggleFullScreenDispatch(data: boolean) {
      store.dispatch(`player/${Types.SET_FULL_SCREEN}`, data);
    }
    function togglePlayListDispatch(data: boolean) {
      store.dispatch(`player/${Types.SET_SHOW_PLAYLIST}`, data);
    }

    function setPreSong() {
      // preSong = {id: ''}
      showMiniPlayer.value = false;
      console.log("setPreSong");
    }

    // NormalPlayer
    function clickSpeed (newSpeed: number) {
      store.dispatch(`player/${Types.CHANGE_SPEED}`, newSpeed);
      audioRefValue.playbackRate = newSpeed;
      currentLyric.changeSpeed(newSpeed);
      currentLyric.seek(currentTime.value*1000);
    }
    function onProgressChange (curPercent: any) {
      const newTime = curPercent * duration.value;
      currentTime.value = newTime
      audioRefValue.currentTime = newTime;
      if (!playing.value) {
        togglePlayingDispatch(true);
      }
      if (currentLyric) {
        currentLyric.seek(newTime * 1000);
      }
    }

    const modeText = ref('')
    const toastRef = ref()
    function changeMode () {
      const newMode = (mode.value + 1) % 3;
      if (newMode === 0) {
        //顺序模式
        // changePlayListDispatch(sequencePlayList);
        store.dispatch(`player/${Types.SET_PLAYLIST}`, sequencePlayList.value);
        const index = findIndex(currentSong, sequencePlayList.value);
        changeCurrentIndexDispatch(index);
        modeText.value = "顺序循环"
      } else if (newMode === 1) {
        //单曲循环
        // changePlayListDispatch(sequencePlayList);
        store.dispatch(`player/${Types.SET_PLAYLIST}`, sequencePlayList.value);
        modeText.value = "单曲循环"
      } else if (newMode === 2) {
        //随机播放
        const newList = shuffle(sequencePlayList.value);
        const index = findIndex(currentSong, newList);
        // changePlayListDispatch(newList);
        store.dispatch(`player/${Types.SET_PLAYLIST}`, newList);
        changeCurrentIndexDispatch(index);
        // store.dispatch(`player/${Types.SET_CURRENT_INDEX}`, index);
        modeText.value = "随机播放"
      }
      // changeModeDispatch(newMode);
      store.dispatch(`player/${Types.SET_PLAY_MODE}`, newMode);
      toastRef.value.showToast();
    }
    function handleLoop () {
      audioRefValue.currentTime = 0;
      togglePlayingDispatch(true);
      audioRefValue.play();
      if (currentLyric) {
        currentLyric?.seek(0);
      }
    }
    function handlePrev () {
      if (playList.value.length === 1) {
        handleLoop();
        return;
      }
      let index = currentIndex.value - 1;
      if (index === 0) index = playList.value.length - 1;
      if (!playing.value) togglePlayingDispatch(true);
      changeCurrentIndexDispatch(index);
    }
    function handleNext () {
      if (playList.value.length === 1) {
        handleLoop();
        return;
      }
      let index = currentIndex.value + 1;
      if (index === playList.value.length) index = 0;
      if (!playing.value) togglePlayingDispatch(true);
      changeCurrentIndexDispatch(index);
    }

    function handleEnd () {
      if (mode.value === playMode.loop) {
        handleLoop();
      } else {
        handleNext();
      }
    }

    function handleError () {
      songReady.value = true;
      handleNext();
      alert("播放出错");
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
      setPreSong,
      speed,
      clickSpeed,
      currentPlayingLyric,
      onProgressChange,
      duration,
      currentTime,
      mode,
      changeMode,
      modeText,
      toastRef,
      handlePrev,
      handleNext,
      currentLineNum,
      currentLyric,
      currentLyric1,
      handleEnd,
      handleError
    };
  },
});
</script>
<style lang="scss" scoped>
</style>