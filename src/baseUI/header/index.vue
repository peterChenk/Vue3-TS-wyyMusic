<template>
  <div class="HeaderContainer">
    <i className="iconfont back"  @click="handleClick">&#xe655;</i>
    <marquee v-if="isMarquee"><h1>{{title}}</h1></marquee>
    <h1 v-else>{{title}}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
export default defineComponent({
  props: {
    isMarquee: Boolean,
    title: String
    // propsClick: {
    //   type: Function as PropType<() => void>
    // }
  },
  emits: ['props-click'],
  setup(props, context) {
    const isMarquee = ref(props.isMarquee)
    watch(isMarquee, (newVal, oldVal)=> {
      console.log('newVal, oldVal', newVal, oldVal)
    })
    function handleClick() {
      // console.log('props.propsClick', props.propsClick)
      context.emit('props-click')
    }

    return {
      handleClick
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .HeaderContainer{
    position: fixed;
    padding: 5px 10px;
    padding-top: 0;
    height: 40px;
    width: 100%;
    z-index: 100;
    display: flex;
    line-height: 40px;
    color: $font-color-light;
    .back{
      margin-right: 5px;
      font-size: 20px;
      width: 20px;
    }
    >h1{
      font-size: $font-size-l;
      font-weight: 700;
    }
  }
</style>