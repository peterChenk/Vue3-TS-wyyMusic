import { getHotSingerListRequest, getSingerListRequest } from '@/api/singers';
import { ISingersState, singerListOBj } from "@/typings/singers";
import { Module } from 'vuex';
import { GlobalState } from '..';
import * as Types from '../action-types'

// 歌手页存放的数据
const state: ISingersState = {
  category: '',
  alpha: '',
  singerList: {
    artists: [],
    code: 0,
    more: false
  },
  listOffset: 0, // 请求列表的偏移不是page，是个数
}

const singers: Module<ISingersState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.CHANGE_CATOGORY](state, payload: string) {
      state.category = payload
    },
    [Types.CHANGE_ALPHA](state, payload: string) {
      state.alpha = payload
    },
    [Types.CHANGE_SINGER_LIST](state, payload: singerListOBj) {
      state.singerList = payload
    }
  },
  actions: {
    [Types.CHANGE_CATOGORY]({commit}, data) {
      commit(Types.CHANGE_CATOGORY, data)
    },
    [Types.CHANGE_ALPHA]({commit}, data) {
      commit(Types.CHANGE_ALPHA, data)
    },
    async [Types.CHANGE_SINGER_LIST]({commit}) {
      const category = state.category
      const alpha = state.alpha
      const offset = state.listOffset
      const singerList = await getSingerListRequest<singerListOBj>(category, alpha, offset)
      commit(Types.CHANGE_SINGER_LIST, singerList)
    },
    async [Types.CHANGE_SINGER_LIST_HOT]({commit}, count) {
      const singerList = await getHotSingerListRequest<singerListOBj>(count)
      commit(Types.CHANGE_SINGER_LIST, singerList)
    }
  }
}

export default singers