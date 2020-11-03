import { getAlbumDetailRequest } from '@/api/recommend';
import { AlbumObj, IAlbumState } from "@/typings/Album";
import { Module } from 'vuex';
import { GlobalState } from '..';
import * as Types from '../action-types'


const state: IAlbumState = {
  currentAlbum: {
    playlist: {
      name: '',
      coverImgUrl: '',
      creator: {},
      tracks: []
    }
  },
  pullUpLoading: false,
  enterLoading: false,
  startIndex: 0,
  totalCount: 0
}

const Album: Module<IAlbumState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.CHANGE_CURRENT_ALBUM](state, payload: AlbumObj) {
      state.currentAlbum = payload
    },
    [Types.CHANGE_START_INDEX](state, payload: number) {
      state.startIndex = payload
    },
    [Types.CHANGE_TOTAL_COUNT](state, payload: number) {
      state.totalCount = payload
    },
  },
  actions: {
    async [Types.CHANGE_CURRENT_ALBUM]({commit}, id) {
      const currentAlbum = await getAlbumDetailRequest<AlbumObj>(id)
      commit(Types.CHANGE_CURRENT_ALBUM, currentAlbum)
      commit(Types.CHANGE_TOTAL_COUNT, currentAlbum.playlist.tracks.length)
      commit(Types.CHANGE_START_INDEX, 0)
    }
  }
}

export default Album