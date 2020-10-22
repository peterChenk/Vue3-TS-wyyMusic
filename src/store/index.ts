import { createStore } from 'vuex';
import recommend from './modules/recommend';
import { IRecommendState } from '../typings/recommend';

export interface GlobalState {
  recommend: IRecommendState;
}

export default createStore<GlobalState>({
  // state: {
  // },
  mutations: {},
  actions: {},
  modules: {
    recommend
  }
})
