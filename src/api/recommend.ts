import axios from './index'

// 获取轮播图
export function getBannerRequest<T>() {
  return axios.get<T, T>("/banner")
} 

// 推荐歌单
export function getRecommendListRequest<T>() {
  return axios.get<T, T>("/personalized")
}

// 获取排行榜接口
export function getRankListRequest<T>() {
  return axios.get<T, T>(`/toplist/detail`)
}