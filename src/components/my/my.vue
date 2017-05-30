<template>
<div class="my">
  <outerHeader>
    <i slot="bell" class="icon-bell"></i>
    <div slot="my-title" class="my-title">我的</div>
    <i slot="settings" class="icon-setting"></i>
  </outerHeader>
  <div class="my-content">
    <a class="person-info">
      <i class="icon-my"></i>
      <div class="info">
        <p class="number">3109169b6</p>
        <p class="phone">
          <i class="icon-phone"></i><span class="telephone">131****7126</span>
        </p>
      </div>
      <i class="icon-keyboard_arrow_right"></i>
    </a>
    <div class="welfare">
      <div class="wel-item">
        <p class="money">100.20<span class="small">元</span></p>
        <p class="text">钱包</p>
      </div>
      <div class="wel-item">
        <p class="discount">20<span class="small">个</span></p>
        <p class="text">优惠</p>
      </div>
      <div class="wel-item">
        <p class="integral">5000<span class="small">分</span></p>
        <p class="text">积分</p>
      </div>
    </div>
    <split></split>
    <div class="top">
      <a class="address"><i class="icon-position"></i><div class="text border-1px">收货地址</div><i class="icon-keyboard_arrow_right"></i></a>
      <a class="collection"><i class="icon-favorite"></i><div class="text">我的收藏</div><i class="icon-keyboard_arrow_right"></i></a>
    </div>
    <split></split>
    <div class="middle">
      <a class="gift"><i class="icon-gift"></i><div class="text">推荐有奖</div><i class="icon-keyboard_arrow_right"></i></a>
      <a class="score"><i class="icon-score"></i><div class="text">积分商城</div><i class="icon-keyboard_arrow_right"></i></a>
      <a class="crown"><i class="icon-crown"></i><div class="text">饿了么会员</div><i class="icon-keyboard_arrow_right"></i></a>
      <a class="products"><i class="icon-star"></i><div class="text">每日精选</div><i class="icon-keyboard_arrow_right"></i></a>
      <a class="phone_card"><i class="icon-phone_card"></i><div class="text">免费流量</div><i class="icon-keyboard_arrow_right"></i></a>
    </div>
    <split></split>
    <div class="bottom">
      <a class="flower"><i class="icon-flower"></i><div class="text">服务中心</div><i class="icon-keyboard_arrow_right"></i></a>
      <a class="thumb_up"><i class="icon-thumb_up"></i><div class="text">欢迎评分</div><i class="icon-keyboard_arrow_right"></i></a>
      <a class="seller"><i class="icon-seller"></i><div class="text">加盟合作</div><i class="icon-keyboard_arrow_right"></i></a>
    </div>
  </div>
  <outerFooter></outerFooter>
</div>
</template>

<script type="text/ecmascript-6">
  import outerFooter from '../common/footer/outerFooter';
  import outerHeader from '../common/header/outerHeader';
  import split from '../split/split';
  export default {
    components: {
      outerFooter,
      outerHeader,
      split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .icon-bell
    display :inline-block
    vertical-align:top
    font-size :1rem
    color: #ffffff
  .my-title
    display: inline-block
    margin :0 5.8rem
    font-size :0.8rem
    line-height :1.3rem
    color: #ffffff
  .icon-setting
    display: inline-block
    vertical-align:top
    font-size :1rem
    color: #ffffff

  .my-content
    padding-top: 1.95rem
    .person-info
      position :relative
      display :inline-block
      box-sizing:border-box
      width :100%
      height: 3.5rem
      padding: 0.5rem
      background :#3190e8
      color: #ffffff
      .icon-my
        margin-right :0.3rem
        font-size: 2.3rem
        border: 0.05rem solid #ffffff
        border-radius :50%
        background :#ffffff
        color: rgb(220, 220, 220)
      .info
        display: inline-block
        font-size :0
        .number
          font-size :1rem
          padding-bottom :0.4rem
        .phone .icon-phone
          font-size :0.57333rem
        .phone .telephone
          font-size :0.57333rem
          line-height :0.57333rem
      .icon-keyboard_arrow_right
        position :absolute
        right:0.5rem
        top: 1.2rem
    .welfare
      display: flex
      padding :0.8rem 0
      .wel-item
        flex:1
        border-right :0.05rem solid #f1f1f1
        .money
          text-align :center
          color: #f90
          font-weight :700
          .small
            font-size :0.6rem
            font-weight :400
        .discount
          text-align :center
          color: #ff5f3e
          font-weight :700
          .small
            font-size :0.6rem
            font-weight :400
        .integral
          text-align :center
          color: #6ac20b
          font-weight :700
          .small
            font-size :0.6rem
            font-weight :400
        .text
          padding-top :0.2rem
          text-align :center
          font-size :0.6rem
          font-weight :700
          color: #666
        &:last-child
          border-right :0
    .top .address,.collection
      position: relative
      .icon-position,.icon-favorite
        position: absolute
        left: 0.2rem
        top: 0.4rem
      .icon-position
        color: rgb(74, 165, 240)
      .icon-favorite
        color: rgb(252, 123, 83)
      .text
        padding:0.6rem 0.2rem 0.6rem 0
        margin-left :1.5rem
        font-size: .7rem
        color: #000
        border-1px(#f1f1f1)
      .icon-keyboard_arrow_right
        position :absolute
        right: -15.8rem
        top: -1.25rem
        color: #ccc
    .middle .gift,.score,.crown,.products,.phone_card
      position: relative
      .icon-gift,.icon-score,.icon-crown,.icon-star,.icon-phone_card
        position: absolute
        left: 0.2rem
        top: 0.4rem
      .icon-gift
        color: rgb(74, 165, 240)
      .icon-score
        color: rgb(252, 123, 83)
      .icon-crown
        color: rgb(255, 198, 54)
      .icon-star
        color: rgb(255, 153, 0)
      .icon-phone_card
        color: rgb(74, 165, 240)
      .text
        padding:0.6rem 0.2rem 0.6rem 0
        margin-left :1.5rem
        font-size: .7rem
        color: #000
        border-1px(#f1f1f1)
      .icon-keyboard_arrow_right
        position :absolute
        right: -15.8rem
        top: -1.25rem
        color: #ccc
    .bottom .flower,.thumb_up,.seller
      position: relative
      .icon-flower,.icon-thumb_up,.icon-seller
        position: absolute
        left: 0.2rem
        top: 0.4rem
      .icon-flower
        color: #4aa5f0
      .icon-thumb_up
        color: #4aa5f0
      .icon-seller
        color: #4aa5f0
      .text
        padding:0.6rem 0.2rem 0.6rem 0
        margin-left :1.5rem
        font-size: .7rem
        color: #000
        border-1px(#f1f1f1)
      .icon-keyboard_arrow_right
        position :absolute
        right: -15.8rem
        top: -1.25rem
        color: #ccc
</style>
