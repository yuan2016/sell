<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
    },
    methods: {
      addCart (event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
            this.food.count++;
        }
        this.$emit('cart-add', event.target);
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size :0
    .cart-decrease
      display: inline-block
      padding: 0.3rem
      line-height :1.2rem
      font-size: 1.2rem
      color :rgb(0,160,220)
      &.move-enter-active
        transform: translate3d(0, 0, 0) rotate(0)
        opacity: 1
        transition: all .2s ease-out
      &.move-leave-active
        transform: translate3d(1.2rem, 0, 0) rotate(-180deg)
        opacity: 0
        transition: all .2s ease-out
      &.move-enter, &.move-leave
        transform: translate3D(1.2rem, 0, 0) rotate(180deg)
        opacity: 0
    .cart-count
      display: inline-block
      vertical-align :top
      width: 0.6rem
      padding-top: 0.3rem
      line-height :1.2rem
      text-align: center
      font-size :0.5rem
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 0.3rem
      line-height :1.2rem
      font-size: 1.2rem
      color :rgb(0,160,220)
</style>
