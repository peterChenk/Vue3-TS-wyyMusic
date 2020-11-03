export interface Album {
  name: string,
  coverImgUrl: string,
  creator: object,
  tracks: Array<any>
}
export interface AlbumObj{
  playlist: Album
}
export interface IAlbumState{
  currentAlbum: AlbumObj,
  pullUpLoading: boolean,
  enterLoading: boolean,
  startIndex: number,
  totalCount: number
}