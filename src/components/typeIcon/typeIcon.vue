<template>
  <span class="type-icon" v-if="isShow" :class="icontypeClass"></span>
</template>

<script type="text/ecmascript-6">
  const CLASS_MAP = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

  export default {
    props: {
      size: {
        type: Number,
        default: 1
      },
      type: {
        type: Number,
        default: -1
      }
    },
    computed: {
      icontypeClass () {
        return ('size-' + this.size + ' ' + (CLASS_MAP[this.type] || 'none')).trim();
      },
      isShow () {
        return this.size >= 1 && this.size <= 4 && this.type >= 0 && this.type <= 4;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">


  type-mix($size)
    &.decrease
      bg-image('decrease_'+$size)
    &.discount
      bg-image('discount_'+$size)
    &.guarantee
      bg-image('guarantee_'+$size)
    &.invoice
      bg-image('invoice_'+$size)
    &.special
      bg-image('special_'+$size)
    &.none
      display: none

  @import "../../common/stylus/mixin.styl"
  .type-icon
    display: inline-block
    vertical-align: top
    background-repeat: no-repeat
    &.size-1
      width: 12px
      height: 12px
      background-size: 12px 12px
      type-mix(1)
    &.size-2
      width: 16px
      height: 16px
      background-size: 16px 16px
      type-mix(2)
    &.size-3
      width: 12px
      height: 12px
      background-size: 12px 12px
      type-mix(3)
    &.size-4
      width: 16px
      height: 16px
      background-size: 16px 16px
      type-mix(4)
</style>
