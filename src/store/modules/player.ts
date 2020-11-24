import { Module } from 'vuex'
import { GlobalState } from '..'
import { IplayerState, SongDetail } from '@/typings/player'
import * as Types from '../action-types'
import { playMode } from '@/api/config';
import { findIndex } from '@/api/utils';
import { getSongDetailRequest } from '@/api/search';

const state: IplayerState = {
  currentSong: {},
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  speed: 1,
  currentIndex: -1,
  showPlayList: false
}

const handleInsertSong = (state, song) => {
  const playList = JSON.parse(JSON.stringify(state.playList));
  const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList));
  let currentIndex = state.currentIndex;
  //看看有没有同款
  const fpIndex = findIndex(song, playList);
  // 如果是当前歌曲直接不处理
  if(fpIndex === currentIndex && currentIndex !== -1) return state;
  currentIndex++;
  // 把歌放进去,放到当前播放曲目的下一个位置
  playList.splice(currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌
  if(fpIndex > -1) {
    if(currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playList.splice(fpIndex+1, 1);
    }
  }

  let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
  const fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(sequenceIndex, 0, song);
  if(fsIndex > -1) {
    if(sequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }
  state.playList = playList
  state.sequencePlayList = sequenceList
  state.currentIndex = currentIndex
}

const handleDeleteSong = (state, song) => {
  const playList = JSON.parse(JSON.stringify(state.playList));
  const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList));
  let currentIndex = state.currentIndex;

  const fpIndex = findIndex(song, playList);
  playList.splice(fpIndex, 1);
  if(fpIndex < currentIndex) currentIndex--;
  
  const fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(fsIndex, 1);

  state.playList = playList
  state.sequencePlayList = sequenceList
  state.currentIndex = currentIndex
}

const player: Module<IplayerState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_CURRENT_SONG](state, payload) {
      state.currentSong = payload
    },
    [Types.SET_FULL_SCREEN](state, payload) {
      state.fullScreen = payload
    },
    [Types.SET_PLAYING_STATE](state, payload) {
      state.playing = payload
    },
    [Types.SET_SEQUECE_PLAYLIST](state, payload) {
      state.sequencePlayList = payload
    },
    [Types.SET_PLAYLIST](state, payload) {
      state.playList = payload
    },
    [Types.CHANGE_SPEED](state, payload) {
      state.speed = payload
    },
    [Types.SET_PLAY_MODE](state, payload) {
      state.mode = payload
    },
    [Types.SET_CURRENT_INDEX](state, payload) {
      state.currentIndex = payload
    },
    [Types.SET_SHOW_PLAYLIST](state, payload) {
      state.showPlayList = payload
    },
    [Types.INSERT_SONG](state, payload) {
      handleInsertSong(state, payload)
    },
    [Types.DELETE_SONG](state, payload) {
      handleDeleteSong(state, payload)
    },
  },
  actions: {
    [Types.SET_CURRENT_SONG]({commit}, data) {
      commit(Types.SET_CURRENT_SONG, data)
    },
    [Types.SET_FULL_SCREEN]({commit}, data) {
      commit(Types.SET_FULL_SCREEN, data)
    },
    [Types.SET_PLAYING_STATE]({commit}, data) {
      commit(Types.SET_PLAYING_STATE, data)
    },
    [Types.SET_SEQUECE_PLAYLIST]({commit}, data) {
      commit(Types.SET_SEQUECE_PLAYLIST, data)
    },
    [Types.SET_PLAYLIST]({commit}, data) {
      commit(Types.SET_PLAYLIST, data)
    },
    [Types.CHANGE_SPEED]({commit}, data) {
      commit(Types.CHANGE_SPEED, data)
    },
    [Types.SET_PLAY_MODE]({commit}, data) {
      commit(Types.SET_PLAY_MODE, data)
    },
    [Types.SET_CURRENT_INDEX]({commit}, data) {
      commit(Types.SET_CURRENT_INDEX, data)
    },
    [Types.SET_SHOW_PLAYLIST]({commit}, data) {
      commit(Types.SET_SHOW_PLAYLIST, data)
    },
    // [Types.INSERT_SONG]({commit}, data) {
    //   commit(Types.INSERT_SONG, data)
    // },
    [Types.DELETE_SONG]({commit}, data) {
      commit(Types.DELETE_SONG, data)
    },
    async getSongDetail ({commit}, id) {
      const data = await getSongDetailRequest<SongDetail>(id)
      const song = data.songs[0]
      commit(Types.INSERT_SONG, song)
    }
  }
}

export default player