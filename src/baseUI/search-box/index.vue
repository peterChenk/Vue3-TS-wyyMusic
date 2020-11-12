<template>
  <div class="SearchBoxWrapper">
    <i class="iconfont icon-back" @click="back">&#xe655;</i>
    <input ref="queryRef" :value="newQuery" class="box" placeholder="搜索歌曲、歌手、专辑" @input="handleChange"/>
    <!-- <input ref="queryRef" class="box" placeholder="搜索歌曲、歌手、专辑" @input="handleChange($event)"/> -->
    <i class="iconfont icon-delete" @click="clearQuery" v-show="newQuery">&#xe600;</i>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch, watchEffect } from 'vue'
// import { useModelWrapper } from '@/api/utils'
export default defineComponent({
  props: {
    newQuery: String
  },
  emits: ['back', 'update:newQuery'],
  setup(props, context) {
    // 方法一：监听props上的属性变化（配合TS 待解决）

    // 使用 `toRefs` 创建对prop的 `newQuery` property 的响应式引用
    // const { newQuery } = toRefs(props)
    // const curQuery = ref<string>('')
    // const getUserRepositories = () => {
    //   // 更新 `prop.user` 到 `user.value` 访问引用值
    //   curQuery.value = newQuery?.value as string
    // }
    // 在用户 prop 的响应式引用上设置一个侦听器
    // watch(newQuery, getUserRepositories)

    // 方法二 使用v-model改变props的值

    const query = ref('')

    function handleChange (e: any) {
      context.emit('update:newQuery', e.target.value)
    }

    const queryRef = ref<HTMLInputElement | null>(null)
    function clearQuery() {
      context.emit('update:newQuery', '')
      // 让搜索框获取焦点
      const queryRefVal = queryRef.value
      // if(queryRefVal) queryRefVal.value = ''
      queryRefVal?.focus()
    }
    
    function back() {
      context.emit('back')
    }
    return {
      queryRef,
      // curQuery: useModelWrapper(props, context.emit, 'newQuery')
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