<template>
  <div class="home">
    <outerHeader class="outer-header">
      <div slot='position' class="position">
        <i class="icon-position"></i><span>第一百货商店</span>
      </div>
      <div slot='position' class="weather">
        <span>21°</span>
        <span>晴天</span>
      </div>
      <i slot='icon-weather' class="icon-weather"></i>
    </outerHeader>
    <div class="container" ref="homeWrapper">
      <div class="food-type">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="activity" v-for="foodItem in foodTypes[0]" :key="foodItem.id" @click.stop.prevent="jumpTo({path:'/goods'})">
                <img :src="foodItem.pic">
                <span>{{foodItem.name}}</span>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="activity" v-for="item in foodTypes[1]" :key="item.id">
                <img :src="item.pic">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <split></split>
      <div class="home-title">
        <i class="icon-seller"></i>
        <span>推荐商家</span>
      </div>
      <shopList></shopList>
    </div>
    <outerFooter></outerFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import outerFooter from '../common/footer/outerFooter';
  import outerHeader from '../common/header/outerHeader';
  import split from '../split/split';
  import shopList from '../shopList/shopList';
  import Swiper from '../../../static/swiper-3.4.2.min';
  //  import BScroll from 'better-scroll';

  const ERR_OK = 0;
  let galleryTop;
  export default {
    data () {
      return {
        foodTypes: []
      }
    },
    created () {
      this.axios.get('/api/foodTypes').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.foodTypes = response.data;
          this.$nextTick(() => {
            this._initSwiper();
          })
        }
      });
    },
    mounted () {
      this._initSwiper();
    },
    methods: {
      _initSwiper () {
        let newSwiper = new Swiper('.swiper-container', {
          loop: true
        });
      },
      jumpTo (path) {
        this.$router.push(path);
      }
    },
    components: {
      outerFooter,
      outerHeader,
      split,
      shopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home
    position: relative
    .position
      display: inline-block
      color: #ffffff
      .icon-position
        font-size: 1rem
      span
        margin-left: 0.1rem
        font-size: 0.8rem
        line-height: 1rem
        vertical-align: top
    .weather
      display: inline-block
      margin-left: 7.1rem
      color: #ffffff
      span
        display: block
        text-align: right
        font-size: 0.6rem
    .icon-weather
      position: absolute
      right: 0.35rem
      top: 0.46rem
      display: inline-block
      font-size: 1rem
      color: #ffffff
    .container
      padding-top: 1.95rem
      .swiper-container
        width: 100%;
        height: auto;
        padding-bottom: .6rem;
        .swiper-pagination
          bottom: 0.2rem;
        .swiper-slide
          display: flex
          flex-wrap: wrap
          .activity
            flex: 0 0 25%
            box-sizing: border-box
            padding: 0.25rem
            text-align: center
            img
              display: block
              margin: 0 auto
              width: 1.8rem
              height: 1.8rem
            span
              font-size: 0.55rem
              color: #666
      .home-title
        padding: 0.2rem
        font-size: 0.6rem
        font-weight: 700
</style>
