<template>
  <div class="mnContainer"
       ref="iconsRef">
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { prefixStyle } from "@/api/utils";
import { useExpose } from '@/composition/use-expose';
export default defineComponent({
  setup() {
    const iconsRef = ref<HTMLElement | null>(null);
    const ICON_NUMBER = 10;
    const transform = prefixStyle("transform");
    const createNode = (txt) => {
      const template = `<div class='icon_wrapper'>${txt}</div>`;
      const tempNode = document.createElement("div");
      tempNode.innerHTML = template;
      return tempNode.firstChild;
    };

    //////
    let queryRefVal: any
    onMounted(() => {
      queryRefVal = iconsRef.value;
    })

    onMounted(() => {
      const queryRefVal = iconsRef.value;
      for (let i = 0; i < ICON_NUMBER; i++) {
        const node: HTMLElement = createNode(
          `<div class="iconfont">&#xe642;</div>`
        ) as HTMLElement;
        if (queryRefVal) queryRefVal.appendChild(node);
      }
      const domArray = [].slice.call(queryRefVal?.children);
      domArray.forEach((item: any) => {
        item.running = false;
        item.addEventListener(
          "transitionend",
          function () {
            this.style["display"] = "none";
            this.style[transform] = `translate3d(0, 0, 0)`;
            this.running = false;

            const icon = this.querySelector("div");
            icon.style[transform] = `translate3d(0, 0, 0)`;
          },
          false
        );
      });
    })

    const startAnimation = ({ x, y }) => {
      for (let i = 0; i < ICON_NUMBER; i++) {
        const domArray = [].slice.call(queryRefVal?.children);
        const item: any = domArray[i];
        // 选择一个空闲的元素来开始动画
        if (item.running === false) {
          item.style.left = x + "px";
          item.style.top = y + "px";
          item.style.display = "inline-block";
          setTimeout(() => {
            item.running = true;
            item.style[transform] = `translate3d(0, 750px, 0)`;
            const icon = item.querySelector("div");
            icon.style[transform] = `translate3d(-40px, 0, 0)`;
          }, 20);
          break;
        }
      }
    };

    useExpose({ startAnimation })

    return {
      iconsRef,
    };
  },
});
</script>
<style lang="scss">
@import "../../style/global-style.scss";
.mnContainer {
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: $theme-color;
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(0.62, -0.1, 0.86, 0.57);
    transform: translate3d(0, 0, 0);
    > div {
      transition: transform 1s;
    }
  }
}
</style>