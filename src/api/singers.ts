import axios from './index'

// 获取热门歌手列表
export function getHotSingerListRequest<T>(count: number){
  return axios.get<T, T>(`/top/artists?offset=${count}`);
}
// 获取歌手列表
export function getSingerListRequest<T>(category: string, alpha: string, count: number) {
  return axios.get<T, T>(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`)
}

// 获取歌手详情
export function getSingerInfoRequest<T>(id: number) {
  return axios.get<T, T>(`/artists?id=${id}`)
}