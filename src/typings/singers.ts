export interface singerListArr{
  id: number
  name: string,
  img1v1Url: string
}
export interface singerListOBj{
  artists: singerListArr[],
  code: number,
  more: boolean
}
export interface ISingersState {
  category: string,
  alpha: string,
  singerList: singerListOBj,
  listOffset: number
}