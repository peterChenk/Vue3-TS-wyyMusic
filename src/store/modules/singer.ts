import { getSingerInfoRequest } from '@/api/singers'
import { ISingerState } from '@/typings/singer'
import { Module } from 'vuex'
import { GlobalState } from '..'
import * as Types from '../action-types'


const state: ISingerState = {
  artist: {
    name: '',
    picUrl: ''
  },
  songsOfArtist: [],
  loading: false
}

const singer: Module<ISingerState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.CHANGE_ARTIST](state, payload) {
      state.artist = payload
    },
    [Types.CHANGE_SONGS_OF_ARTIST](state, payload) {
      state.songsOfArtist = payload
    },
    [Types.CHANGE_ENTER_LOADING](state, payload) {
      state.loading = payload
    },
    [Types.SET_SINGER_INFO](state, payload) {
      state.artist = payload.artist
      state.songsOfArtist = payload.hotSongs
      state.loading = payload.loading
    }
  },
  actions: {
    [Types.CHANGE_ARTIST]({commit}, data) {
      commit(Types.CHANGE_ARTIST, data.artist)
    },
    [Types.CHANGE_SONGS_OF_ARTIST]({commit}, data) {
      commit(Types.CHANGE_SONGS_OF_ARTIST, data.hotSongs)
    },
    [Types.CHANGE_ENTER_LOADING]({commit}, data) {
      commit(Types.CHANGE_ENTER_LOADING, data)
    },
    async [Types.SET_SINGER_INFO]({commit}, data) {
      const singerInfo = await getSingerInfoRequest(data)
      commit(Types.SET_SINGER_INFO, singerInfo)
    }
  }
}

export default singer