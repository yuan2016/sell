<template>
<div class="outer-footer">
  <router-link to="/home" tag="div" class="foot-item">
    <i class="icon-order_food"></i>
    <span class="text">外卖</span>
  </router-link>
  <router-link to="/search" tag="div" class="foot-item">
    <i class="icon-search"></i>
    <span class="text">搜索</span>
  </router-link>
  <router-link to="/shopping" tag="div" class="foot-item">
    <i class="icon-shopping_cart"></i>
    <span class="text">购物车</span>
  </router-link>
  <router-link to="/my" tag="div" class="foot-item">
    <i class="icon-my"></i>
    <span class="text">我的</span>
  </router-link>
</div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .outer-footer
    position :fixed
    left:0
    right:0
    bottom:0
    height: 2rem
    display :flex
    text-align :center
    border-top:1px solid #ccc;
    box-shadow :0 -0.02667rem 0.05333rem rgba(0,0,0,.1)
    z-index: 100
    background-color :#ffffff
    .foot-item
      flex:1
      padding: 0.2rem
      .icon-order_food,.icon-search,.icon-shopping_cart,.icon-my
        display :block
        margin-bottom: -0.1rem
        font-size :0.8rem
        color: #ccc
      .text
        font-size :0.45rem
        color: #666
      &.active
        color :#3190e8
        .icon-order_food,.icon-search,.icon-shopping_cart,.icon-my,.text
          color :#3190e8
</style>
