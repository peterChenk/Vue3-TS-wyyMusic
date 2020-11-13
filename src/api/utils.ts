import { computed } from 'vue'

//防抖函数
const debounce = (func: any, delay: number) => {
  let timer: any;
  return function (...args: any) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
}
export { debounce };

// 处理歌手列表拼接歌手名字
export function getName(list: any) {
  let str = "";
  list.map((item: any, index: number) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export function filterIndex(rankList: any) {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
}

export function useModelWrapper(props: any, emit: any, name = 'modelValue') { 
  return computed({ 
    get: () => props[name], 
    set: (value) => emit(`update:${name}`, value) 
  })
}

// 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
const elementStyle = document.createElement("div").style;

const vendor = (() => {
  //首先通过transition属性判断是何种浏览器
  const transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransfrom",
    ms: "msTransform",
    standard: "Transform"
  };
  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === "standard") {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
