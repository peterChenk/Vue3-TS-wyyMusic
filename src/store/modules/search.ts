import { getHotKeyWordsRequest } from '@/api/search';
import { ISearchState } from '@/typings/search';
import { Module } from "vuex";
import { GlobalState } from '..';
import * as Types from '../action-types'

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
    }
  },
  actions: {
    async [Types.SET_HOT_KEYWRODS]({commit}) {
      const hotList = await getHotKeyWordsRequest()
      commit(Types.SET_HOT_KEYWRODS, hotList)
    }
  }
}

export default search