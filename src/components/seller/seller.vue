<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价格</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click.prevent.stop="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="item in seller.supports">
            <type-icon :size=4 :type="item.type"></type-icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="info-list">
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../../components/star/star';
  import Split from '../../components/split/split';
  import TypeIcon from '../../components/typeIcon/typeIcon.vue';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';

  export default {
    name: 'seller',
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      toggleFavorite () {
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    data () {
      return {
        favorite: (() => loadFromLocal(this.seller.id, 'favorite', false))()
      };
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    watch: {
      seller () {
        this.$nextTick(function () {
          this.scroll.refresh();
          if (this.seller.pics) {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.seller.pics.length - margin;
            this.$refs.picList.style.width = width + 'px';
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {scrollX: true, eventPassthrough: 'vertical'});
            } else {
              this.picScroll.refresh();
            }
          }
        });
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.scroll = new BScroll(this.$refs.seller, {click: true});
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {scrollX: true, eventPassthrough: 'vertical'});
          } else {
            this.picScroll.refresh();
          }
        }
      });
    },
    components: {
      Star,
      Split,
      TypeIcon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 8.7rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 0.9rem
      .title
        margin-bottom: 0.4rem
        line-height: 0.7rem
        color: rgb(7, 17, 27)
        font-size: 0.7rem
      .desc
        padding-bottom: 0.9rem
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .star
          display: inline-block
          margin-right: 0.6rem
          vertical-align: top
        .text
          display: inline-block
          margin-right: 0.6rem
          line-height: 0.9rem
          vertical-align: top
          font-size: 0.5rem
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 0.9rem
        .block
          flex: 1
          text-align: center
          border-right: 0.05rem solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 0.2rem
            line-height: 0.5rem
            font-size: 0.5rem
            color: rgb(147, 153, 159)
          .content
            line-height: 1.2rem
            font-size: 0.5rem
            color: rgb(7, 17, 27)
            .stress
              font-size: 1.2rem

      .favorite
        position: absolute
        width: 2.5rem
        right: 0.2rem
        top: 0.3rem
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 0.2rem
          line-height: 1.2rem
          font-size: 1.2rem
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 0.5rem
          font-size: 0.5rem
          color: rgb(77, 85, 93)
    .bulletin
      padding: 0.9rem 0.9rem 0 0.9rem
      .title
        margin-bottom: 0.4rem
        line-height: 0.7rem
        color: rgb(7, 17, 27)
        font-size: 0.7rem
      .content-wrapper
        padding: 0 0.6rem 0.8rem 0.6rem
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 1.2rem
          font-size: 0.6rem
          color: rgb(240, 20, 20)
    .supports
      .support-item
        padding: 0.8rem 0.6rem
        border-1px(rgba(7, 17, 27, .1))
        font-size: 0
        &:last-child
          border-none()
        .text
          margin-left: 0.3rem
          line-height: 0.8rem
          font-size: 0.6rem
          font-weight: 200
          color: rgb(7, 12, 27)

    .pics
      margin: 0.9rem
      .title
        margin-bottom: 0.4rem
        line-height: 0.7rem
        color: rgb(7, 17, 27)
        font-size: 0.7rem
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 0.3rem
            width: 6rem
            height: 4.5rem
            &:last-child
              margin: 0

    .info
      padding: 0.9rem 0.9rem 0 0.9rem
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 0.6rem
        line-height: 0.7rem
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0.7rem
      .info-item
        padding: 0.8rem 0.6rem
        line-height: 0.8rem
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0.6rem
        &:last-child
          border-none()

  /*.type-icon*/
</style>
