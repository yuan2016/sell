<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch":class="{'on':onlyContent===true}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select (type, event) {
        this.$emit('ratingtype-select', type);
      },
      toggleContent (event) {
        this.$emit('content-toggle', !this.onlyContent);
      }
    },
    computed: {
      positives () {
        return this.ratings.filter(rating => rating.rateType === POSITIVE);
      },
      negatives () {
        return this.ratings.filter(rating => rating.rateType === NEGATIVE);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

.ratingselect
  .rating-type
    padding: 0.9rem 0
    margin: 0 0.9rem
    border-1px(rgba(7,17,27,0.1))
    font-size:0
    .block
      display: inline-block
      padding: 0.4rem 0.6rem
      margin-right: 0.4rem
      line-height: 0.8rem
      border-radius :0.05rem
      font-size: 0.6rem
      color: rgb(77, 85, 93)
      &.active
        color: #fff
      .count
        margin-left: 0.1rem
        font-size: 0.4rem
      &.positive
        background: rgba(0, 160, 220, 0.2)
        &.active
          background: rgb(0, 160, 220)
      &.negative
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: rgb(77, 85, 93)
  .switch
    padding: 0.6rem 0.9rem
    font-size:0
    border-bottom :0.05rem solid rgba(7,17,27,0.1)
    &.on
      .icon-check_circle
        color:#00c850
    .icon-check_circle
      display :inline-block
      vertical-align :middle
      margin-right: 0.2rem
      font-size: 1.2rem
      line-height :1.2rem
      color: rgb(147, 153, 159)
    .text
      display :inline-block
      vertical-align :middle
      font-size: 0.6rem
      line-height :1.2rem
      color: rgb(147, 153, 159)
</style>
