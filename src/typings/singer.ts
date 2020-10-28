export interface artistObj {
  name: string,
  picUrl: string
}
export interface songsOfArtistList{
  name: string,
  ar?: Array<any>,
  artists?: Array<any>,
  al?: object,
  album?: object
}
export interface ISingerState{
  artist: artistObj,
  songsOfArtist: songsOfArtistList[],
  loading: boolean
}