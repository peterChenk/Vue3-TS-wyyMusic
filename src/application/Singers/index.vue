<template>
  <div>
    <div class="NavContainer">
      <!-- 对于better-scroll来讲，其作用的元素外面必须要有一个尺寸确定的容器包裹-->
      <horizenItem title='分类(默认热门):' :list="categoryList" @handleClick="handleUpdateCategory" :oldVal="category"></horizenItem>
      <horizenItem title='首字母:' :list="alphaTypesData" @handleClick="handleUpdateAlpha" :oldVal="alpha"></horizenItem>
    </div>
    <div class="ListContainer" :style="{bottom: play > 0 ? '60px' : '0'}">>
      <Scroll ref="scrollRef">
        <div class="List">
          <div class="ListItem" v-for="(item, index) in singerList.artists" :key="index" @click="enterDetail(item.id)">
            <div class="img_wrapper">
              <img :src="item.picUrl + '?param=300x300'" width="100%" height="100%" alt="music"/>
            </div>
            <span class="name">{{item.name}}</span>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import horizenItem from '@/baseUI/horizen-item/index.vue'
import { categoryTypes, alphaTypes } from '@/api/config';
import { useStore } from 'vuex';
import { GlobalState } from '@/store';
import * as Types from "@/store/action-types";
import Scroll from "@/baseUI/scroll/index.vue";
import router from "@/router";
export default defineComponent({
  components: {
    horizenItem,
    Scroll
  },
  setup() {
    const categoryList: any = categoryTypes
    const alphaTypesData: any = alphaTypes

    const store = useStore<GlobalState>()

    const play = computed(() => store.state.player.playList.length)

    const singerList = computed(() => store.state.singers.singerList)
    
    const category = computed(() => store.state.singers.category)
    const alpha = computed(() => store.state.singers.alpha)

    // 获取热门歌手列表
    function getHotSinger() {
      store.dispatch(`singers/${Types.CHANGE_SINGER_LIST_HOT}`, 0)
    }
    onBeforeMount(() => {
      if(!singerList.value.artists.length && !category.value && !alpha.value) {
        getHotSinger()
      }
    })

    const scrollRef = ref()

    function updateCategory(key: string) {
      store.dispatch(`singers/${Types.CHANGE_CATOGORY}`, key)
      store.dispatch(`singers/${Types.CHANGE_SINGER_LIST}`)
    }
    function handleUpdateCategory(key: string) {
      if (category.value === key) return
      updateCategory(key)
      scrollRef.value.refresh()
    }

    function updateAlpha(key: string) {
      store.dispatch(`singers/${Types.CHANGE_ALPHA}`, key)
      store.dispatch(`singers/${Types.CHANGE_SINGER_LIST}`)
    }
    function handleUpdateAlpha(key: string) {
      if (category.value === key) return
      updateAlpha(key)
      scrollRef.value.refresh()
    }
    

    function enterDetail(id: number) {
      router.push(`/singers/${id}`)
    }

    return {
      play,
      categoryList,
      alphaTypesData,
      category,
      alpha,
      handleUpdateCategory,
      handleUpdateAlpha,
      singerList,
      scrollRef,
      enterDetail
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .NavContainer{
    box-sizing: border-box;
    position: fixed;
    top: 95px;
    width: 100%;
    padding: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .ListContainer{
    position: fixed;
    top: 160px;
    left: 0;
    /* bottom: 0; */
    overflow: hidden;
    width: 100%;
  }
  .List {
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
</style>