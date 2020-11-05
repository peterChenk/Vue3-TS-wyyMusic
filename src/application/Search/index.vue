<template>
  <div class="Container">
    <div className="search_box_wrapper">
      <SearchBox @back="searchBack" :newQuery="query" @handleQuery="handleQuery"></SearchBox>
    </div>
    <div class="ShortcutWrapper">
      <Scroll>
        <div>
          <div class="HotKey">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" key="item.first" @click="setQuery('item.first')">
                <span>{item.first}</span>
              </li>
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import SearchBox from '@/baseUI/search-box/index.vue'
import Scroll from '@/baseUI/scroll/index.vue'
import router from '@/router'
export default defineComponent({
  components: {
    SearchBox,
    Scroll
  },
  setup() {
    const query = ref('')

    function searchBack() {
      router.back()
    }

    function setQuery() {
      console.log('setQuery')
    }

    function handleQuery(q: string) {
      // setQuery(q);
      // if(!q) return;
      // changeEnterLoadingDispatch(true);
      // getSuggestListDispatch(q);
    }

    return {
      searchBack,
      query,
      handleQuery,
      setQuery
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
    display: none;
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
</style>