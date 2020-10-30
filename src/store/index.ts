import { createStore } from 'vuex';
import recommend from './modules/recommend';
import singers from './modules/singers';
import singer from './modules/singer';
import rank from './modules/rank';
import { IRecommendState } from '../typings/recommend';
import { ISingersState } from '@/typings/singers';
import { ISingerState } from '@/typings/singer';
import { IRankState } from '@/typings/rank';

export interface GlobalState {
  recommend: IRecommendState;
  singers: ISingersState;
  singer: ISingerState;
  rank: IRankState;
}

export default createStore<GlobalState>({
  // state: {
  // },
  mutations: {},
  actions: {},
  modules: {
    recommend,
    singers,
    singer,
    rank
  }
})
