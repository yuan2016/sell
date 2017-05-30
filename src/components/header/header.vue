<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
          <i class="icon-shopping_card_1" @click.stop.prevent="jumpTo({path:'/shopping'})"></i>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <type-icon :size=1 :type="seller.supports[0].type" ></type-icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click.stop.prevent="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click.stop.prevent="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="isShowDetail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <type-icon :size=1 :type="item.type" ></type-icon>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click.stop.prevent="closeDetial"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../star/star';
  import TypeIcon from '../typeIcon/typeIcon.vue';

export default {
  data () {
    return {
      isShowDetail: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showDetail () {
      this.isShowDetail = true;
    },
    closeDetial () {
      this.isShowDetail = false;
    },
    jumpTo (path) {
      this.$router.push(path);
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    Star: Star,
    TypeIcon: TypeIcon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

.header
  position: relative
  background :rgba(7,17,27,0.5)
  font-size:0
  color: #fff
  overflow:auto
  .content-wrapper
    position :relative
    padding:1.2rem 0.6rem 0.9rem 1.2rem
    .avatar
      display: inline-block
      width: 3.2rem
      height: 3.2rem
      border-radius :0.1rem
      img
        width: 3.2rem
        height: 3.2rem
    .content
      display :inline-block
      padding:0.1rem 0 0.1rem 0.8rem
      vertical-align :top
      .title
        position: relative
        .brand
          display :inline-block
          margin-right: 0.3rem
          vertical-align :top
          bg-image('brand')
          width: 1.5rem
          height: 0.9rem
          background-size: 1.5rem 0.9rem
          background-repeat :no-repeat
        .icon-shopping_card_1
          position: absolute
          top:0
          right: -1rem
          font-size: 1rem
        .name
          vertical-align :top
          line-height:0.9rem
          font-size: 0.8rem
          font-weight :bold
      .description
        padding:0.4rem 0 0.5rem 0
        line-height: 0.6rem
        font-size: 0.6rem
        font-weight :200
      .support
        .text
          margin-left: 0.2rem
          line-height 0.6rem
          font-size: 0.5rem
    .support-count
      position: absolute
      right: 0.6rem
      bottom: 0.7rem
      padding: 0 0.4rem
      height: 1.2rem
      line-height: 1.2rem
      border-radius: 0.7rem
      background: rgba(0, 0, 0, 0.2)
      text-align: center
      .count
        vertical-align: top
        font-size: 0.5rem
      .icon-keyboard_arrow_right
        margin-left: 0.1rem
        line-height: 1.2rem
        font-size: 0.5rem
  .bulletin-wrapper
    padding:0 1.1rem 0 0.6rem
    position:relative
    height:1.4rem
    line-height:1.4rem
    white-space:nowrap
    overflow:hidden
    text-overflow:ellipsis
    background-color:rgba(7,17,27,0.2)
    .bulletin-title
      display:inline-block
      vertical-align:middle
      width:1.1rem
      height:0.6rem
      bg-image('bulletin')
      background-size:1.1rem 0.6rem
      background-repeat:no-repeat
    .bulletin-text
      vertical-align: middle
      margin: 0 0.2rem
      font-size:0.5rem
      font-weight:200
    .icon-keyboard_arrow_right
      position:absolute
      top:0.4rem
      font-size:0.5rem
      right:0.6rem
  .background
    position:absolute
    left:0
    top:0
    width:100%
    height:100%
    z-index:-1
    filter:blur(0.5rem)
  .detail
    position: fixed
    top:0
    left:0
    width: 100%
    height: 100%
    z-index:100
    overflow:auto
    background :rgba(7,17,27,0.8)
    backdrop-filter: blur(0.5rem)
    &.fade-enter-active
      transition: all .4s linear
    &.fade-leave-active
      opacity: 0
      transition: all .4s linear
    &.fade-enter
      opacity: 0
    &.fade-leave
      opacity :1
    .detail-wrapper
      min-height :100%
      width:100%
      color:rgb(255,255,255)
      .detail-main
        margin-top :3.2rem
        padding-bottom 3.2rem
        .name
          font-size: 0.8rem
          font-weight :700
          line-height :0.8rem
          text-align :center
        .star-wrapper
          margin-top: 0.8rem
          height: 2.4rem
          text-align :center
        .title
          display:flex
          width:80%
          margin:1.4rem auto 1.2rem auto
          .line
            flex: 1
            position: relative
            top: -0.3rem
            border-bottom: 0.05rem solid rgba(255, 255, 255, .2)
          .text
            margin: 0 0.6rem
            line-height: 0.7rem
            font-size: 0.7rem
            font-weight: 700
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 0.6rem
            margin-bottom: 0.6rem
            font-size: 0
            &:last-child
              margin-bottom: 0
            .text
              margin-left: 0.3rem
              vertical-align :top
              font-size: 0.6rem
              font-weight: 200
        .bulletin
          width :80%
          margin:0 auto
          .content
            font-size:0.6rem
            font-weight :200
            line-height:1.2rem
    .detail-close
      margin: -3.2rem auto
      padding-top :0.8rem
      width: 1.6rem
      height: 1.6rem
      font-size: 1.6rem
      color:rgba(255,255,255,0.5)
</style>
