import { Module } from "vuex"
import { GlobalState } from '../index'
import { IRecommendState, recommendObj } from '../../typings/recommend'
import * as Types from '../action-types'
import { getBannerRequest, getRecommendListRequest } from '../../api/recommend'
import { SildersObj } from '../../typings/recommend'


// 推荐页存放的数据
const state: IRecommendState = {
  silders: {
    banners: [],
    code: 0
  },
  recommendList: {
    code: 0,
    result: []
  }
}

const recommend: Module<IRecommendState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_SLIDER_LIST](state, payload: SildersObj) {
      state.silders = payload
    },
    [Types.CHANGE_RECOMMEND_LIST](state, payload: recommendObj) {
      state.recommendList = payload
    }
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({commit}) {
      const silders = await getBannerRequest<SildersObj>()
      commit(Types.SET_SLIDER_LIST, silders)
    },
    async [Types.CHANGE_RECOMMEND_LIST]({commit}) {
      const recommendList = await getRecommendListRequest<recommendObj>()
      commit(Types.CHANGE_RECOMMEND_LIST, recommendList)
    }
  }
}

export default recommend