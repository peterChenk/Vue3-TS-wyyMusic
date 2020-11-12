import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from '@/api/search';
import { ISearchState } from '@/typings/search';
import { Module } from "vuex";
import { GlobalState } from '..';
import * as Types from '../action-types'

interface ResultIF {
  hots: [];
}
interface KeyWords {
  result: ResultIF;
}

interface FSuggestList {
  result: [];
}

interface FSongs {
  songs: [];
}
interface FSongsList {
  result: FSongs;
}

const state: ISearchState = {
  hotList: [],
  suggestList: [],
  songsList: [],
  enterLoading: false
}

const search: Module<ISearchState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_HOT_KEYWRODS](state, payload) {
      state.hotList = payload
    },
    [Types.SET_SUGGEST_LIST](state, payload) {
      state.suggestList = payload
    },
    [Types.SET_RESULT_SONGS_LIST](state, payload) {
      state.songsList = payload
    }
  },
  actions: {
    async [Types.SET_HOT_KEYWRODS]({commit}) {
      const hotList: KeyWords = await getHotKeyWordsRequest()
      commit(Types.SET_HOT_KEYWRODS, hotList.result.hots)
    },
    async [Types.SET_SUGGEST_LIST]({commit}, q) {
      const suggestList: FSuggestList = await getSuggestListRequest(q)
      commit(Types.SET_SUGGEST_LIST, suggestList.result)
    },
    async [Types.SET_RESULT_SONGS_LIST]({commit}, q) {
      const songsList: FSongsList = await getResultSongsListRequest(q)
      commit(Types.SET_RESULT_SONGS_LIST, songsList.result.songs)
    }
  }
}

export default search