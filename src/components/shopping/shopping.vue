<template>
  <div class="shopping">
    <outerHeader>
      <div slot="title" class="shopping-title">购物车</div>
    </outerHeader>
    <div class="shopping-content" v-if="this.foods">
      <div class="shopcart-title">{{this.seller.name}}<i class="icon-dustbin" @click.stop.prevent="clearCart"></i></div>
      <div class="foodcart-item" v-for="foodcart in this.foods">
        <img :src="foodcart.icon" class="foodcart-img">
        <div class="foodcart-right">
          <div class="foodcart-name">{{foodcart.name}}</div>
          <div class="foodcart-info"><span class="foodcart-count">x{{foodcart.count}}</span><span
            class="foodcart-price">￥{{foodcart.price*foodcart.count}}</span></div>
        </div>
      </div>
      <div class="foodcart-deliveryPrice">配送费<span class="deliveryPrice-value">￥{{this.seller.deliveryPrice}}</span>
      </div>
      <div class="count-value-go" v-if="sum>=this.seller.minPrice">
        <span class="value-right">合计<span>￥{{sum}}</span><span class="value-go">去结算</span></span>
      </div>
      <div class="count-value-back" v-else>
        <span class="value-extra">还差<span class="value-special">{{this.seller.minPrice-sum}}</span>元起送</span><span
        class="value-right">合计<span class="value-special">￥{{sum}}</span><span class="value-back">去凑单</span></span>
      </div>
    </div>
    <div v-else class="shopping-balnk">购物车是空的</div>
    <outerFooter></outerFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import outerFooter from '../common/footer/outerFooter';
  import outerHeader from '../common/header/outerHeader';
  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {
      outerFooter,
      outerHeader
    },
    methods: {
      ...mapMutations([
        'RECORD_FOODS', 'RECORD_SELLER'
      ]),
      clearCart () {
        this.RECORD_FOODS(null);
        this.RECORD_SELLER(null);
      }
    },
    computed: {
      ...mapState([
        'foods', 'seller'
      ]),
      sum () {
        let sum = 0;
        this.foods.forEach((food) => {
          sum += food.price * food.count;
        })
        return sum;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopping-title
    text-align: center
    font-size: 0.8rem
    line-height: 1.3rem
    color: #ffffff

  .shopping-content
    padding-top: 1.95rem
    margin-left: 0.3rem
    .shopcart-title
      position: relative
      padding: 0.5rem 0
      font-size: 0.6rem
      border-bottom: 0.05rem solid #f1f1f1
      .icon-dustbin
        position: absolute
        top: 0.3rem
        right: 0.3rem
    .foodcart-item
      position: relative
      padding: 0.7rem 0.2rem 0.7rem 0
      border-bottom: 0.05rem solid #f1f1f1
      .foodcart-img
        position: absolute
        left: 0
        top: 0.7rem
        width: 1.5rem
        height: 1.5rem
      .foodcart-right
        position: relative
        padding-left: 2rem
        .foodcart-name
          font-size: 0.6rem
        .foodcart-info .foodcart-count
          font-size: 0.6rem
          color: #666
        .foodcart-info .foodcart-price
          position: absolute
          bottom: 0.1rem
          right: 0.2rem
          font-size: 0.6rem
          color: #ff0000
    .foodcart-deliveryPrice
      position: relative
      padding: 0.7rem 0
      border-bottom: 0.05rem solid #f1f1f1
      font-size: 0.6rem
      .deliveryPrice-value
        position: absolute
        bottom: 0.7rem
        right: 0.4rem
        font-size: 0.6rem
        color: #ff0000
    .count-value-back
      position: relative
      padding: 0.7rem 0
      font-size: 0.6rem
      .value-extra
        font-size: 0.6rem
        color: #666
        .value-special
          color: #ff0000
      .value-right
        position: absolute
        right: 0.3rem
        top: 0.3rem
        .value-special
          color: #ff0000
        .value-back
          display: inline-block
          margin-left: 0.5rem
          padding: 0.3rem 0.5rem
          border-radius: 0.2rem
          border: 1px solid #3190e8
          color: #3190e8
    .count-value-go
      position: relative
      padding: 1.1rem 0
      font-size: 0.6rem
    .value-right
      position: absolute
      right: 0.3rem
      top: 0.3rem
      .value-go
        display: inline-block
        margin-left: 0.5rem
        padding: 0.3rem 0.5rem
        border-radius: 0.2rem
        border: 1px solid #00b43c
        background: #00b43c
        color: #ffffff
  .shopping-balnk
    position: fixed
    top:50%
    left:50%
    transform: translate(-50%, -50%);
    color: #ccc
</style>
