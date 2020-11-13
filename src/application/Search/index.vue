<template>
  <div class="Container">
    <div className="search_box_wrapper">
      <SearchBox @back="searchBack" v-model:newQuery="query" @handleQuery="handleQuery"></SearchBox>
    </div>
    <div class="ShortcutWrapper" v-show="!query">
      <Scroll>
        <div>
          <div class="HotKey">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="(item) in hotList" :key="item.first">
                <span @click="setQuery(item.first)">{{item.first}}</span>
              </li>
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
    <!-- 搜索结果 -->
    <div class="ShortcutWrapper" v-show="query">
      <Scroll>
        <div>
          <!-- 歌手 -->
          <div class="List" v-if="suggestList.artists && suggestList.artists.length">
            <h1 class="title">相关歌手</h1>
            <div class="ListItem" v-for="(item, index) in suggestList.artists" :key="item.id + '' +index" @click="gotoSingers(item.id)">
              <div class="img_wrapper">
                <img :src="item.picUrl" width="100%" height="100%" alt="music"/>
              </div>
              <span class="name">歌手: {{item.name}}</span>
            </div>
          </div>
          <!-- 歌单 -->
          <div class="List" v-if="suggestList.playlists && suggestList.playlists.length">
            <h1 class="title">相关歌单</h1>
            <div class="ListItem" v-for="(item, index) in suggestList.playlists" :key="item.id + '' + index" @click="gotoAlbum(item.id)">
              <div class="img_wrapper">
                <img :src="item.coverImgUrl" width="100%" height="100%" alt="music"/>
              </div>
              <span class="name">歌单: {{item.name}}</span>
            </div>
          </div>
          <!-- 歌曲 -->
          <ul style="padding-left: 20px" class="SongItem" v-if="songsList && songsList.length">
            <li v-for="(item) in songsList" :key="item.id" @click="selectItem($event, item.id)">
              <div class="info">
                <span>{{item.name}}</span>
                <span>
                  {{ getNames(item.artists) }} - {{ item.album.name }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
    <MusicalNote ref="musicNoteRef"></MusicalNote>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import SearchBox from '@/baseUI/search-box/index.vue'
import Scroll from '@/baseUI/scroll/index.vue'
import router from '@/router'
import { useStore } from 'vuex'
import { GlobalState } from '@/store'
import * as Types from '@/store/action-types'
import { getName } from '@/api/utils';
import MusicalNote from '@/baseUI/music-note/index.vue';
export default defineComponent({
  components: {
    SearchBox,
    Scroll,
    MusicalNote
  },
  setup() {
    const store = useStore<GlobalState>()
    // 热搜关键词
    const hotList = computed(() => store.state.search.hotList)
    if (!hotList.value.length) {
      store.dispatch(`search/${Types.SET_HOT_KEYWRODS}`)
    }

    // 搜索结果
    const suggestList = computed(() => store.state.search.suggestList)
    function getSuggestListDispatch (q: string) {
      store.dispatch(`search/${Types.SET_SUGGEST_LIST}`, q)
      store.dispatch(`search/${Types.SET_RESULT_SONGS_LIST}`, q)
    }
    function gotoSingers (id: number) {
      router.push(`/singers/${id}`)
    }
    function gotoAlbum (id: number) {
      router.push(`/album/${id}`)
    }

    // 歌曲
    const songsList = computed(() => store.state.search.songsList)

    const musicNoteRef = ref()
    function selectItem (e: any, id: number) {
      // getSongDetailDispatch(id);
      musicNoteRef.value.startAnimation({x: e.clientX, y: e.clientY})
    }

    const query = ref('')
    const testModel = ref('')
    watchEffect(() => {
      if (!query.value) return
      getSuggestListDispatch(query.value)
    })

    function searchBack() {
      router.back()
    }

    function setQuery(q: string) {
      query.value = q
    }

    function handleQuery(q: string) {
      query.value = q
      if(!q) return;
      // changeEnterLoadingDispatch(true);
      getSuggestListDispatch(q);
    }

    function getNames(list: any) {
      return getName(list)
    }
    

    return {
      searchBack,
      query,
      handleQuery,
      setQuery,
      hotList,
      suggestList,
      songsList,
      selectItem,
      gotoSingers,
      gotoAlbum,
      getNames,
      musicNoteRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .Container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* bottom: ${props => props.play > 0 ? "60px": 0}; */
    bottom: 0;
    width: 100%;
    z-index: 100;
    overflow: hidden;
    background: #f2f3f4;
    transform-origin: right bottom;
    &.fly-enter, &.fly-appear{
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    &.fly-enter-active, &.fly-appear-active{
      opacity: 1;
      transition: all .3s;
      transform: translate3d(0, 0, 0);
    }
    &.fly-exit{
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    &.fly-exit-active{
      opacity: 0;
      transition: all .3s;
      transform: translate3d(100%, 0, 0);
    }
  }
  .ShortcutWrapper{
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    /* display: ${props => props.show ? "": "none"}; */
    /* display: none; */
  }
  .HotKey{
    margin: 0 20px 20px 20px;
    .title{
      padding-top: 35px;
      margin-bottom: 20px;
      font-size: $font-size-m;
      color: $font-color-desc-v2;
    }
    .item{
      display: inline-block;
      padding: 5px 10px;
      margin: 0 20px 10px 0;
      border-radius: 6px;
      background: $highlight-background-color;
      font-size: $font-size-m;
      color: $font-color-desc;
    }
  }
  .SearchHistory{
    position: relative;
    margin: 0 20px;
    .title{
      display: flex;
      align-items: center;
      height: 40px;
      font-size: $font-size-m;
      color: $font-color-desc-v2;
      .text{
        flex: 1;
      }
      .clear{
        /* ${style.extendClick()} */
        @include extendClick;
        .icon-clear{
          font-size: $font-size-m;
          color: $font-color-desc;
        }
      }
    }
    .history_item{
      display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;
      color: $font-color-desc-v2;
      border-bottom: 1px solid $border-color;
      .text{
        flex: 1;
        font-size: $font-size-s;
        color: $font-color-desc;
      }
      .icon{
        /* ${style.extendClick()} */
        @include extendClick;
        font-size: $font-size-s;
        .icon_delete{
          color: $font-color-desc;
        }
      }
    }
  }
  .List{
    display: flex;
    margin: auto;
    flex-direction: column;
    overflow: hidden;
    .title {
      margin:10px 0 10px 10px;
      color: $font-color-desc;
      font-size: $font-size-s;
    }
  }
  .ListItem{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    margin: 0 5px;
    padding: 5px 0;
    align-items: center;
    border-bottom: 1px solid $border-color;
    .img_wrapper {
      margin-right: 20px;
      img{
        border-radius: 3px;
        width: 50px;
        height: 50px;
      }
    }
    .name{
      font-size: $font-size-m;
      color: $font-color-desc;
      font-weight: 500;
    }
  }
  .SongItem{
    >li{
      display: flex;
      height: 60px;
      align-items: center;  
      .index{
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