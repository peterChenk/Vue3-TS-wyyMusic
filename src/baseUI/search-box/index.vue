<template>
  <div class="SearchBoxWrapper">
    <i class="iconfont icon-back" @click="back">&#xe655;</i>
    <input ref="queryRef" class="box" placeholder="搜索歌曲、歌手、专辑" onChange="handleChange"/>
    <i class="iconfont icon-delete" @click="clearQuery">&#xe600;</i>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  emits: ['back'],
  setup(props, context) {

    const queryRef = ref(null)

    function clearQuery() {
      console.log('clearQuery')
    }

    function handleChange() {
      console.log('handleChange')
    }
    
    function back() {
      context.emit('back')
    }
    return {
      queryRef,
      back,
      handleChange,
      clearQuery
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .SearchBoxWrapper{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    padding-right: 20px;
    height: 40px;
    background: $theme-color;
    .icon-back{
      font-size: 24px;
      color: $font-color-light;
    }
    .box{
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $theme-color;
      color: $highlight-background-color;
      font-size: $font-size-m;
      outline: none;
      border: none;
      border-bottom: 1px solid $border-color;
      &::placeholder{
        color: $font-color-light;
      }
    }
    .icon-delete{
      font-size: 16px;
      color: $background-color;
    }
  }
</style>