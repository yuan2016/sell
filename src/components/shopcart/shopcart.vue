<template>
  <div class="shopcart">
    <div class="content" @click.stop.prevent="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" @before-enter="drop_beforeEnter" @leave="drop_leave"
                        @after-enter="drop_afterEnter" @after-leave="drop_afterLeave">
        <div key="{{index}}" :data-index="index" class="ball" v-for="ball,index in balls" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click.stop.prevent="empty">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <transition name="mask">
      <div class="list-mask" v-show="listShow" @click.stop.prevent="hideList"></div>
    </transition>
  </div>

</template>

<script>
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default {
    data () {
      return {
        balls: [{
          show: false,
          isBusy: false
        }, {
          show: false,
          isBusy: false
        }, {
          show: false,
          isBusy: false
        }, {
          show: false,
          isBusy: false
        }],
        dropBall: [],
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 10,
            count: 2
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total
      },
      totalCount () {
          let count = 0;
          this.selectFoods.forEach((food) => {
              count += food.count;
          });
          return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
            return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice;
            return `还差￥${diff}元起送`
        } else {
            return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
            return 'not-enough'
        } else {
            return 'enough'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
                this.scroll.refresh();
            }
          })
        }
        return show;
      }
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.isBusy) {
            ball.show = true;
            ball.isBusy = true;
            ball.el = el;
            return;
          }
        }
      },
      drop_beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      drop_leave (el) {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      },
      drop_afterEnter (el) {
        let ball = this.balls[el.getAttribute('data-index')];
        if (ball) {
          ball.show = false;
        }
      },
      drop_afterLeave (el) {
        let ball = this.balls[el.getAttribute('data-index')];
        if (ball) {
          ball.isBusy = false;
          el.style.display = 'none';
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty () {
        let r = confirm('清空购物车？')
        if (r === true) {
          this.selectFoods.forEach((food) => {
            food.count = 0;
          })
        }
      },
      hideList () {
        this.fold = true;
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        } else {
            window.alert(`支付${this.totalPrice}元`)
        }
      }
    },
    components: {
      cartcontrol: cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

.shopcart
  position: fixed
  left:0
  bottom:0
  z-index: 50
  width:100%
  height: 48px
  .content
    display: flex
    background :#141d17
    font-size :0
    .content-left
      flex:1
      .logo-wrapper
        display: inline-block
        position: relative
        top: -10px
        margin:0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing:border-box
        vertical-align:top
        border-radius :50%
        background :#141d17
        .logo
          width:100%
          height:100%
          border-radius :50%
          background :#2b343c
          text-align: center
          &.highlight
            background :rgb(0,160,220)
          .icon-shopping_cart
            font-size: 24px
            color: #80858a
            line-height: 44px
            &.highlight
              color:#fff
        .num
          position: absolute
          top:0
          right:0
          width: 24px
          height: 16px
          line-height: 16px
          text-align :center
          border-radius :16px
          font-size: 9px
          font-weight :700
          color: #fff
          background: rgb(240, 20, 20)
          box-shadow :0 4px 8px 0 rgba(0,0,0,0.4)
      .price
        display: inline-block
        vertical-align :top
        margin-top:12px
        padding-right:12px
        line-height:24px
        box-sizing :border-box
        border-right :1px solid rgba(255,255,255,0.1)
        font-size: 16px
        font-weight:700
        color: rgba(255,255,255,0.4)
        &.highlight
          color:#fff
      .desc
        display: inline-block
        vertical-align :top
        margin :12px 0 0 12px
        font-size 12px
        line-height 24px
        color:rgba(255,255,255,0.4)
        font-weight :700
    .content-right
      flex:0 0 105px
      width: 105px
      .pay
        height: 48px
        line-height: 48px
        text-align :center
        font-size :12px
        color: rgba(255,255,255,0.4)
        font-weight :700
        background :#2b333b
        &.not-enough
          background: #2b333b
        &.enough
          background-color: #00b43c
          color: #fff
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
      &.drop-leave-active
        transition: all .4s cubic-bezier(.49, -0.29, 0.75, 0.41)
        .inner
          transition: all .4s linear
  .shopcart-list
    position: absolute
    top:0
    left: 0
    z-index: -20
    width:100%
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active
      transform: translate3d(0, -100%, 0);
      transition: all .4s cubic-bezier(0.61, 0.16, 0.54, 1.38)
    &.fold-enter, &.fold-leave-active
      transition: all .4s linear
      transform: translate3d(0, 0, 0);
    .list-header
      height: 40px
      line-height :40px
      padding:0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7,17,27,0.1)
      .title
        float: left
        font-size :14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      padding:0 18px
      max-height :190px
      background: #fff
      overflow: hidden
      .food
        position: relative
        padding:12px 0
        box-sizing :border-box
        border-1px(rgba(1,17,27,0.1))
      .name
        line-height :24px
        font-size :14px
        color:rgb(7,17,27)
      .price
        position: absolute
        right: 90px
        bottom: 12px
        line-height :24px
        font-size: 14px
        font-weight :700
        color: rgb(240, 20, 20)
      .cartcontrol-wrapper
        position: absolute
        right:0
        bottom: 6px
  .list-mask
    position: fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index:-40
    background: rgba(7, 17, 27, 0.4)
    &.mask-enter-active, &.mask-leave-active
      transition: all .5s linear
    &.mask-enter, &.mask-leave-active
      opacity: 0
</style>
