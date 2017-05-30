<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = [];
        let integer = Math.floor(this.score) / 1;
        let decimal = this.score % 1;

        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (decimal >= 0.5) {
          result.push(CLS_HALF)
        } else if (decimal > 0) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
            result.push(CLS_OFF)
        }
        return result;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 1rem
        height: 1rem
        margin-right: 1.1rem
        background-size: 1rem 1rem
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 0.75rem
        height: 0.75rem
        margin-right: 0.4rem
        background-size: 0.75rem 0.75rem
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 0.5rem
        height: 0.5rem
        margin-right: 0.15rem
        background-size: 0.5rem 0.5rem
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
