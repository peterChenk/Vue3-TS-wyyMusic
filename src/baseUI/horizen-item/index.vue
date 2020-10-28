<template>
  <Scroll scrollX=ture>
    <div ref="Category">
      <div class="List">
        <span>{{title}}</span>
        <span class="ListItem"
              :class="{'selected': item.key === oldVal}"
              v-for="item in list"
              :key="item.key"
              @click="clickHandle(item.key)">
          {{item.name}}
        </span>
      </div>
    </div>
  </Scroll>
</template>
<script lang="ts">
import Scroll from "../../baseUI/scroll/index.vue";
import { defineComponent, nextTick, onMounted, ref } from "vue";
export default defineComponent({
  components: {
    Scroll,
  },
  props: {
    title: String,
    list: Array,
    oldVal: String
  },
  setup(props, { emit }) {
    const Category = ref<null | HTMLElement>(null);
    function setCategoryDOMWidth() {
      const categoryDOM = Category.value as HTMLElement;
      const tagElems = categoryDOM.querySelectorAll("span");
      let totalWidth = 0;
      Array.from(tagElems).forEach((ele) => {
        totalWidth += ele.offsetWidth;
      });
      totalWidth += 2;
      categoryDOM.style.width = `${totalWidth}px`;
    }
    onMounted(async () => {
      await nextTick();
      setCategoryDOMWidth();
    });

    function clickHandle(key: string) {
      emit('handle-click', key)
    }

    return {
      Category,
      clickHandle
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../style/global-style.scss";
.List {
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: center;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    color: grey;
    font-size: $font-size-m;
    vertical-align: middle;
  }
}
.ListItem {
  flex: 0 0 auto;
  font-size: $font-size-m;
  padding: 5px 5px;
  border-radius: 10px;
  &.selected {
    color: $theme-color;
    border: 1px solid $theme-color;
    opacity: 0.8;
  }
}
</style>