import axios from './index'

// 获取轮播图
export function getBannerRequest<T>() {
  return axios.get<T, T>("/banner")
} 

// 推荐歌单
export function getRecommendListRequest<T>() {
  return axios.get<T, T>("/personalized")
}