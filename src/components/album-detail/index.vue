<template>
  <div>
    <div class="TopDesc">
      <div className="background" :style="{backgroundImage: 'url('+ currentAlbum.coverImgUrl +')'}">
        <div className="filter"></div>
      </div>
      <div className="img_wrapper">
        <div className="decorate"></div>
        <img :src="currentAlbum.coverImgUrl" alt=""/>
        <div className="play_count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">{{Math.floor(currentAlbum.subscribedCount/1000)/10}}万</span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{{currentAlbum.name}}</div>
        <div className="person">
          <div className="avatar">
            <img :src="currentAlbum.creator.avatarUrl" alt=""/>
          </div>
          <div className="name">{{currentAlbum.creator.nickname}}</div>
        </div>
      </div>
    </div>
    <div class="Menu">
      <div>
        <i className="iconfont">&#xe6ad;</i>
        评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i>
        点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i>
        收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i>
        更多
      </div>
    </div>
    <SongsList 
      :songs="currentAlbum.tracks" 
      :collectCount="currentAlbum.subscribedCount"
      :showCollect="true"
      :showBackground="true"
      >
    </SongsList>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SongsList from '@/application/SongsList/index.vue';
import { Album } from '@/typings/Album';
export default defineComponent({
  components: {
    SongsList
  },
  props: {
    currentAlbum: Object as PropType<Album>
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/global-style.scss';
  .TopDesc {
    background-size: 100%;
    padding: 5px 20px;
    padding-bottom: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 275px;
    position: relative;
    .background{
      z-index: -1;
      /* background: url(${props => props.background}) left top no-repeat; */
      background: contain;
      background-position: 0 0;
      background-size: 100% 100%;
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(20px);
      .filter{
        position: absolute;
        z-index: 10;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.2);
      }
    }
    .img_wrapper{
      width: 120px;
      height: 120px;
      position: relative;         
      .decorate {
        position: absolute;
        top: 0;
        width: 100%;
        height: 35px;
        border-radius: 3px;
        background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
      }
      .play_count {
        position: absolute;
        right: 2px;
        top: 2px;
        font-size: $font-size-s;
        line-height: 15px;
        color: $font-color-light;
        .play{
          vertical-align: top;
        }
      }
      img{
        width: 120px;
        height: 120px;
        border-radius:3px;
      }
    }
    .desc_wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 120px;
      padding: 0 10px;
      .title{
        max-height: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: $font-color-light;
        font-weight: 700;
        line-height: 1.5;
        font-size: $font-size-l;
      }
      .person{
        display: flex;
        .avatar{
          width: 20px;
          height: 20px;
          margin-right: 5px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .name {
          line-height: 20px;
          font-size: $font-size-m;
          color: $font-color-desc-v2;
        }
      }
    }
  }
  .Menu{
    position: relative;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 30px 20px 30px;
    margin: -100px 0 0 0;
    >div {
      display: flex;
      flex-direction: column;
      line-height: 20px;
      text-align: center;
      font-size: $font-size-s;
      color: #3b1f1f;
      color: $font-color-light;
      z-index:1000;
      font-weight: 500;
      .iconfont {
        font-size: 20px;
      }
    }
  }
</style>