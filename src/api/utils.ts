//处理歌手列表拼接歌手名字
export function getName(list: any) {
  let str = "";
  list.map((item: any, index: number) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
}