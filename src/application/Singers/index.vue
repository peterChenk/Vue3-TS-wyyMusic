<template>
  <div>
    <div class="NavContainer">
      <!-- 对于better-scroll来讲，其作用的元素外面必须要有一个尺寸确定的容器包裹-->
      <horizenItem title='分类(默认热门):' :list="categoryList" @handleClick="handleClick"></horizenItem>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import horizenItem from '@/baseUI/horizen-item/index.vue'
import { categoryTypes, alphaTypes } from '@/api/config';
export default defineComponent({
  components: {
    horizenItem
  },
  setup() {
    const categoryList: any = categoryTypes

    function handleClick(key: string) {
      console.log('key', key)
    }

    return {
      categoryList,
      handleClick
    }
  }
})
</script>
<style lang="scss" scoped>
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
</style>