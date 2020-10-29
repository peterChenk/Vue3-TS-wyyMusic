<template>
  <div class="SongList">
    <div class="first_line">
      <div class="play_all" @click="selectItem($event, 0)">
        <i class="iconfont">&#xe6e3;</i>
        <span>播放全部 <span class="sum">(共{{totalCount}}首)</span></span>
      </div>
      <div class="add_list" v-if="showCollect">
        <i class="iconfont">&#xe62d;</i>
        <span>收藏({{Math.floor(collectCount/1000)/10}}万)</span>
      </div>
      <div class="SongItem">
        <li v-for="(item, i) in songs" :key="item.id" @click="selectItem($event, i)">
          <span class="index">{{i + 1}}</span>
          <div class="info">
            <span>{{item.name}}</span>
            <span>
              {{ item.ar ? getNames(item.ar) : getNames(item.artists) }} - {{ item.al ? item.al.name : item.album.name }}
            </span>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { ONE_PAGE_COUNT } from "@/api/config";
import { getName } from '@/api/utils';
export default defineComponent({
  props: {
    usePageSplit: String,
    songs: Array,
    showCollect: Boolean,
    collectCount: Number
  },
  setup(props) {
    // let startIndex = ref<number>(0);
    let startIndex = 0;
    startIndex = startIndex + ONE_PAGE_COUNT;
    // 判断页数是否超过总数
    const end = props?.usePageSplit ? startIndex + ONE_PAGE_COUNT : props?.songs?.length;

    function selectItem(e: EventTarget, index: number) {
      console.log('selectItem', e)
    }

    function getNames(list: any) {
      return getName(list)
    }

    return {
      end,
      getNames
    }
  }
});
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .SongList{
    border-radius: 10px;
    opacity: 0.98;
    /* ${props => props.showBackground ? `background: ${style["highlight-background-color"]}`: ""}; */
    .first_line{
      box-sizing: border-box;
      padding: 10px 0;
      margin-left: 10px;
      position: relative;
      justify-content: space-between;
      border-bottom: 1px solid $border-color;
      .play_all{
        display: inline-block;
        line-height: 24px;
        color: $font-color-desc;
        .iconfont {
          font-size: 24px;
          margin-right: 10px;
          vertical-align: top;
        }
        .sum{
          font-size: $font-size-s;
          color: $font-color-desc-v2;
        }
        >span{
          vertical-align: top;
        }
      }
      .add_list,.isCollected {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0; top :0; bottom: 0;
        width: 130px;
        line-height: 34px;
        background: $theme-color;
        color: $font-color-light;
        font-size: 0;
        border-radius: 3px;
        vertical-align: top;
        .iconfont {
          vertical-align: top;
          font-size: 10px;
          margin: 0 5px 0 10px;
        }
        span{
          font-size: 14px;
          line-height: 34px;
        }
      }
      .isCollected{
        display: flex;
        background: $background-color;
        color: $font-color-desc;
      }
    }
  }
  .SongItem{
    >li{
      display: flex;
      height: 60px;
      align-items: center;  
      .index{
        flex-basis: 60px;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
      .info{
        box-sizing: border-box;
        flex: 1;
        display: flex;
        height: 100%;
        padding: 5px 0;
        flex-direction: column;
        justify-content: space-around;
        border-bottom: 1px solid $border-color;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        >span{
          /* ${style.noWrap()} */
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        >span:first-child{
          color: $font-color-desc;
        }
        >span:last-child{
          font-size: $font-size-s;
          color: #bba8a8;
        }
      }
    }
  }
</style>