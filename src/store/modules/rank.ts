import { IRankState } from '@/typings/rank'
import { Module } from "vuex"
import { GlobalState } from '..'

const state: IRankState = {
  rankList: [],
  loading: true
}

const rank: Module<IRankState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {},
  actions: {}
}

export default rank