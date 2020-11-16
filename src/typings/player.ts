export interface IplayerState {
  currentSong: {},
  fullScreen: boolean,
  playing: boolean,
  sequencePlayList: any[],
  playList: any[],
  mode: number,
  speed: number,
  currentIndex: number,
  showPlayList: boolean
}
export interface SongDetail {
  songs: any[]
}