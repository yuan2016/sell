<template>
  <transition name="right">
    <div v-show="showFlag" class="food" ref="foodWrapper">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click.stop.prevent="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div v-show="food.count && food.count>0" class="cartcontrol-wrapper">
            <cartcontrol @cart-add="_drop" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings" @ratingtype-select="ratingTypeChange"
                        @content-toggle="onlyContentChange"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-1px">
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="text">
                  <span :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></span>{{rating.text}}
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import split from '../split/split.vue';
  import Vue from 'vue';
  import {formatDate} from '../../common/js/date';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      ratingTypeChange (type) {
        this.selectType = type;
        this.$nextTick(() => this.scroll.refresh());
      },
      onlyContentChange (isOnlyContent) {
        this.onlyContent = isOnlyContent;
        this.$nextTick(() => this.scroll.refresh());
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodWrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      _drop (el) {
        this.$emit('cart-add', el);
      },
      addFirst (event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('cart-add', event.target);
        this.$set(this.food, 'count', 1);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    width: 100%
    bottom: 2.4rem
    z-index: 30
    background: #fff
    &.right-enter-active, &.right-leave-active
      transform: translate3d(0, 0, 0)
      transition: all .3s
    &.right-enter, &.right-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 0.5rem
        left: 0
        .icon-arrow_lift
          display: block
          padding: 0.5rem
          font-size: 1rem
          color: #fff
    .content
      padding: 0.9rem
      position: relative
      .title
        line-height: 0.7rem
        margin-bottom: 0.4rem
        font-size: 0.5rem
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 0.9rem
        line-height: 0.5rem
        font-size: 0
        height: 0.5rem
        .sell-count, .rating
          font-size: 0.5rem
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 0.6rem
      .price
        font-weight 700
        line-height 1.2rem
        .now
          margin-right: 0.4rem
          font-size: 0.7rem
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 0.5rem
          color: rgb(147, 153, 159)

      .cartcontrol-wrapper
        position: absolute
        bottom: 0.6rem
        right: 0.6rem
      .buy
        position: absolute
        right: 0.9rem
        bottom: 0.9rem
        z-index: 0.5rem
        height: 1.2rem
        line-height: 1.2rem
        padding: 0 0.6rem
        box-sizing: border-box
        border-radius 0.6rem
        font-size: 0.5rem
        color: #fff
        background: rgb(0, 160, 220)
        &.fade-enter-active, &.fade-leave-active
          opacity: 1
          transition: all .5s
        &.fade-enter, &.fade-leave-active
          opacity: 0
    .info
      padding: 0.9rem
      .title
        line-height: 0.7rem
        margin-bottom: 0.3rem
        font-size: 0.7rem
        color: rgb(7, 17, 27)
      .text
        padding: 0 0.4rem
        line-height: 1.2rem
        font-size: 0.6rem
        color: rgb(77, 85, 93)
    .rating
      padding-top: 0.9rem
      .title
        line-height: 0.7rem
        margin-left: 0.9rem
        font-size: 0.7rem
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 0.9rem
        .rating-item
          position: relative
          padding: 0.8rem 0
          border-1px(rgba(7, 17, 27, .1))
          .user
            position: absolute
            right: 0
            top: 0.8rem
            line-height: 0.6rem
            font-size: 0
            .name
              display: inline-block
              margin-right: 0.3rem
              vertical-align: top
              font-size: 0.5rem
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 0.3rem
            line-height: 0.6rem
            font-size: 0.5rem
            color: rgb(147, 153, 159)
          .text
            line-height: 0.8rem
            font-size: 0.6rem
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_dowm
              margin-right: 0.2rem
              line-height: 0.8rem
              font-size: 0.6rem
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 0.8rem 0
          font-size: 0.6rem
          color: rgb(147, 153, 159);
</style>
