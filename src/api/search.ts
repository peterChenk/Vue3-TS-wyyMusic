import axios from '.';

export function getHotKeyWordsRequest<T> () {
  return axios.get<T, T>(`/search/hot`);
}