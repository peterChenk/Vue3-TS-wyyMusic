import { createStore } from 'vuex';
import recommend from './modules/recommend';
import singers from './modules/singers';
import singer from './modules/singer';
import rank from './modules/rank';
import album from './modules/album';
import { IRecommendState } from '../typings/recommend';
import { ISingersState } from '@/typings/singers';
import { ISingerState } from '@/typings/singer';
import { IRankState } from '@/typings/rank';
import { IAlbumState } from '@/typings/Album';

export interface GlobalState {
  recommend: IRecommendState;
  singers: ISingersState;
  singer: ISingerState;
  rank: IRankState;
  album: IAlbumState;
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
    rank,
    album
  }
})
