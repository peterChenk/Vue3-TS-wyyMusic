export interface ISilders{
  imageUrl: string
}
export interface SildersObj {
  banners: ISilders[],
  code: number
}

export interface recommendList{
  id: number,
  name: string,
  picUrl: string,
  playCount: number
}
export interface recommendObj {
  code: number,
  result: recommendList[]
}

export interface IRecommendState{
  silders: SildersObj,
  recommendList: recommendObj
}