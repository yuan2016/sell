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
        <div class="desc">配送费￥{{deliveryPrice}}元</div>
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
        type: Array
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
            window.alert(`支付${this.totalPrice + this.deliveryPrice}元`)
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
  height: 2.4rem
  .content
    display: flex
    background :#141d17
    font-size :0
    .content-left
      flex:1
      .logo-wrapper
        display: inline-block
        position: relative
        top: -0.5rem
        margin:0 0.6rem
        padding: 0.3rem
        width: 2.8rem
        height: 2.8rem
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
            font-size: 1.2rem
            color: #80858a
            line-height: 2.2rem
            &.highlight
              color:#fff
        .num
          position: absolute
          top:0
          right:0
          width: 1.2rem
          height: 0.8rem
          line-height: 0.8rem
          text-align :center
          border-radius :0.8rem
          font-size: 0.45rem
          font-weight :700
          color: #fff
          background: rgb(240, 20, 20)
          box-shadow :0 0.2rem 0.4rem 0 rgba(0,0,0,0.4)
      .price
        display: inline-block
        vertical-align :top
        margin-top: 0.6rem
        padding-right: 0.6rem
        line-height: 1.2rem
        box-sizing :border-box
        border-right :0.05rem solid rgba(255,255,255,0.1)
        font-size: 0.8rem
        font-weight:700
        color: rgba(255,255,255,0.4)
        &.highlight
          color:#fff
      .desc
        display: inline-block
        vertical-align :top
        margin : 0.6rem 0 0.6rem
        font-size 0.6rem
        line-height 1.2rem
        color:rgba(255,255,255,0.4)
        font-weight :700
    .content-right
      flex:0 0 5.25rem
      width: 5.25rem
      .pay
        height: 2.4rem
        line-height: 2.4rem
        text-align :center
        font-size :0.6rem
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
      left: 1.6rem
      bottom: 1.1rem
      z-index: 200
      .inner
        width: 0.8rem
        height: 0.8rem
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
      height: 2rem
      line-height :2rem
      padding:0 0.9rem
      background: #f3f5f7
      border-bottom: 0.05rem solid rgba(7,17,27,0.1)
      .title
        float: left
        font-size :0.7rem
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 0.6rem
        color: rgb(0, 160, 220)
    .list-content
      padding:0 0.9rem
      max-height :9.5rem
      background: #fff
      overflow: hidden
      .food
        position: relative
        padding: 0.6rem 0
        box-sizing :border-box
        border-1px(rgba(1,17,27,0.1))
      .name
        line-height :1.2rem
        font-size :0.7rem
        color:rgb(7,17,27)
      .price
        position: absolute
        right: 4.5rem
        bottom: 0.6rem
        line-height :1.2rem
        font-size: 0.7rem
        font-weight :700
        color: rgb(240, 20, 20)
      .cartcontrol-wrapper
        position: absolute
        right:0
        bottom: 0.3rem
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
