<template>
  <div class="ConfirmWrapper" v-if="show" @click="(e) => e.stopPropagation()">
    <div>
      <div className="confirm_content">
        <p className="text">{{text}}</p>
        <div className="operate" >
          <div className="operate_btn left" @click="setShow(false)">{{cancelBtnText}}</div>
          <div className="operate_btn" @click="handleConfirm">{{confirmBtnText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useExpose } from '@/composition/use-expose';
export default defineComponent({
  props: {
    text: String,
    cancelBtnText: String,
    confirmBtnText: String
  },
  emits: ['handle-confirm'],
  setup(props, {emit}) {

    const show = ref(false)

    function setShow (falg) {
      show.value = falg
    }

    useExpose({ setShow })

    function handleConfirm () {
      setShow(false)
      emit('handle-confirm')
    }

    return {
      show,
      setShow,
      handleConfirm
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../../style/global-style.scss";
  .ConfirmWrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background: $background-color-shadow;
    /* &.confirm-fade-enter-active{
      animation: ${confirmFadeIn} 0.3s;
      .confirm_content{
        animation: ${confirmZoom} 0.3s
      }
    } */
    >div{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      z-index: 100;
      .confirm_content{
        width: 270px;
        border-radius: 13px;
        background: $highlight-background-color;
        .text{
          padding: 19px 15px;
          line-height: 22px;
          text-align: center;
          font-size: $font-size-l;
          color: $font-color-desc-v2;
        }
        .operate{
          display: flex;
          align-items: center;
          text-align: center;
          font-size: $font-size-l;
          .operate_btn{
            flex: 1;
            line-height: 22px;
            padding: 10px 0;
            border-top: 1px solid $border-color;
            color: $font-color-desc;
            &.left{
              border-right: 1px solid $border-color;
            }
          }
        }
      }
    }
  }
</style>