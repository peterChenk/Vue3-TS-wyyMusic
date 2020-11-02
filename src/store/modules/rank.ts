import { getRankListRequest } from '@/api/recommend'
import { IRankState } from '@/typings/rank'
import { Module } from "vuex"
import { GlobalState } from '..'
import * as Types from '../action-types'

const state: IRankState = {
  rankList: [],
  loading: true
}

const rank: Module<IRankState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.CHANGE_RANK_LIST](state, payload) {
      state.rankList = payload.list
    },
    [Types.CHANGE_LOADING](state, payload: boolean) {
      state.loading = payload
    }
  },
  actions: {
    async [Types.CHANGE_RANK_LIST]({commit}) {
      const rankList = await getRankListRequest()
      commit(Types.CHANGE_RANK_LIST, rankList)
    },
    [Types.CHANGE_LOADING]({commit}, data) {
      commit(Types.CHANGE_LOADING, data)
    }
  }
}

export default rank