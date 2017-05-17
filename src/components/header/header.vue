<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
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
  import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  mounted () {
    this.getUserInfo();
  },
  computed: {
    ...mapState([
      'test1'
    ])
  },
  data () {
    return {
      isShowDetail: false,
      tt: 3
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    ...mapMutations([
      'TEST1'
    ]),
    ...mapActions([
      'getUserInfo'
    ]),
    showDetail () {
      this.isShowDetail = true;
      this.TEST1(this.tt);
    },
    closeDetial () {
      this.isShowDetail = false;
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
    padding:24px 12px 18px 24px
    .avatar
      display: inline-block
      width: 64px
      height: 64px
      border-radius :2px
    .content
      display :inline-block
      padding:2px 0 2px 16px
      vertical-align :top
      .title
        .brand
          display :inline-block
          margin-right: 6px
          vertical-align :top
          bg-image('brand')
          width: 30px
          height: 18px
          background-size: 30px 18px
          background-repeat :no-repeat
        .name
          vertical-align :top
          line-height:18px
          font-size: 16px
          font-weight :bold
      .description
        padding:8px 0 10px 0
        line-height: 12px
        font-size: 12px
        font-weight :200
      .support
        .text
          margin-left: 4px
          line-height 12px
          font-size: 10px
    .support-count
      position: absolute
      right: 12px
      bottom: 14px
      padding: 0 8px
      height: 24px
      line-height: 24px
      border-radius: 14px
      background: rgba(0, 0, 0, 0.2)
      text-align: center
      .count
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        margin-left: 2px
        line-height: 24px
        font-size: 10px
  .bulletin-wrapper
    padding:0 22px 0 12px
    position:relative
    height:28px
    line-height:28px
    white-space:nowrap
    overflow:hidden
    text-overflow:ellipsis
    background-color:rgba(7,17,27,0.2)
    .bulletin-title
      display:inline-block
      vertical-align:middle
      width:22px
      height:12px
      bg-image('bulletin')
      background-size:22px 12px
      background-repeat:no-repeat
    .bulletin-text
      vertical-align: middle
      margin: 0 4px
      font-size:10px
      font-weight:200
    .icon-keyboard_arrow_right
      position:absolute
      top:8px
      font-size:10px
      right:12px
  .background
    position:absolute
    left:0
    top:0
    width:100%
    height:100%
    z-index:-1
    filter:blur(10px)
  .detail
    position: fixed
    top:0
    left:0
    width: 100%
    height: 100%
    z-index:100
    overflow:auto
    background :rgba(7,17,27,0.8)
    backdrop-filter: blur(10px)
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
        margin-top :64px
        padding-bottom 64px
        .name
          font-size: 16px
          font-weight :700
          line-height :16px
          text-align :center
        .star-wrapper
          margin-top: 16px
          height: 48px
          text-align :center
        .title
          display:flex
          width:80%
          margin:28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, .2)
          .text
            margin: 0 12px
            line-height: 14px
            font-size: 14px
            font-weight: 700
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .text
              margin-left: 6px
              vertical-align :top
              font-size: 12px
              font-weight: 200
        .bulletin
          width :80%
          margin:0 auto
          .content
            font-size:12px
            font-weight :200
            line-height:24px
    .detail-close
      margin: -64px auto
      padding-top :16px
      width: 32px
      height: 32px
      font-size: 32px
      color:rgba(255,255,255,0.5)
</style>
