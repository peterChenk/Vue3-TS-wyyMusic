<template>
  <div class="Container" :style="{bottom: play > 0 ? '60px' : '0'}">
    <Scroll>
      <div>
        <h1 class="offical">官方榜</h1>
        <ul class="List">
          <li class="ListItem" v-for="(item, index) in officialList" :key="item.coverImgId + '' +  index" @click="enterDetail(item.id)">
            <div className="img_wrapper">
              <img :src="item.coverImgUrl" alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{{item.updateFrequency}}</span>
            </div>
            <ul class="SongList">
              <li v-for="(item2, index2) in item.tracks" :key="item2.first">{{index2+1}}. {{item2.first}} - {{item2.second}}</li>
            </ul>
          </li>
        </ul>
        <h1 class="global">全球榜</h1>
        <ul class="List globalList">
          <li class="ListItem" v-for="(item, index) in globalList" :key="item.coverImgId + '' +  index" @click="enterDetail(item.id)">
            <div className="img_wrapper">
              <img :src="item.coverImgUrl" alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{{item.updateFrequency}}</span>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>
<script lang="ts">
import{ computed, defineComponent } from 'vue'
import Scroll from '@/baseUI/scroll/index.vue'
import { useStore } from 'vuex'
import { GlobalState } from '@/store'
import * as Types from '@/store/action-types'
import { filterIndex } from '@/api/utils'
import router from '@/router'
export default defineComponent({
  components: {
    Scroll
  },
  setup() {
    const store = useStore<GlobalState>()
    const play = computed(() => store.state.player.playList.length)
    const List = computed(() => store.state.rank.rankList)
    const rankList = List.value ? List.value : []
    if (!rankList.length) {
      store.dispatch(`rank/${Types.CHANGE_RANK_LIST}`)
    }
    const globalStartIndex = filterIndex(rankList)
    const officialList = rankList.slice(0, globalStartIndex);
    const globalList = rankList.slice(globalStartIndex);

    function enterDetail(id: number) {
      router.push(`/album/${id}`)
    }

    return {
      play,
      officialList,
      globalList,
      enterDetail
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .Container{
    position: fixed;
    top: 90px;
    /* bottom: 0; */
    width: 100%;
    .offical,.global {
      margin: 10px 5px;
      padding-top: 15px;
      font-weight: 700;
      font-size: $font-size-m;
      color: $font-color-desc;
    }
    .List {
      margin-top: 10px;
      padding: 0 5px;
      /* display: ${props => props.globalRank ? "flex": "" }; */
      display: 'flex';
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      background: $background-color;
      &::after{
        content:"";
        display:block;
        width: 32vw;
      }
    }
    .globalList{
      display: flex;
      .img_wrapper{
        width: 27vw;
        height: 27vw;
      }
      .ListItem{
        display: inherit;
      }
    }
    .ListItem{
      /* display: ${props => props.tracks.length ? "flex": ""}; */
      display: flex;
      padding: 3px 0;
      border-bottom: 1px solid $border-color;
      .img_wrapper{
        /* width:  ${props => props.tracks.length ? "27vw": "32vw"}; */
        /* height: ${props => props.tracks.length ? "27vw": "32vw"}; */
        width: 32vw;
        height: 32vw;
        border-radius: 3px;
        position: relative;
        .decorate {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 35px;
          border-radius: 3px;
          background: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,43%,.4));
        }
        img{
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
        .update_frequecy{
          position: absolute;
          left: 7px;
          bottom: 7px;
          font-size: $font-size-ss;
          color: $font-color-light;
        }
      }
    }
    .SongList{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 10px 10px;
      >li{
        font-size: $font-size-s;
        color: grey;
      }
    }
  }
</style>