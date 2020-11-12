import axios from '.';

export function getHotKeyWordsRequest<T> () {
  return axios.get<T, T>(`/search/hot`);
}

export function getSuggestListRequest<T> (query: string) {
  return axios.get<T, T>(`/search/suggest?keywords=${query}`);
}

export function getResultSongsListRequest<T> (query: string) {
  return axios.get<T, T>(`/search?keywords=${query}`);
}