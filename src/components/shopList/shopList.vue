<template>
<div class="shop-list">
  <div class="list-content">
      <div class="shop-item" v-for="shop in shopLists" @click.stop.prevent="jumpTo({path:'/goods'})">
        <div class="pic">
          <img :src="shop.pic">
        </div>
        <div class="shop-content">
          <div class="top"><span>{{shop.name}}</span></div>
          <div class="middle">
            <star class="star" :size="24" :score="shop.score"></star><span class="score">{{shop.score}} </span><span> 月售{{shop.sales}}单</span>
          </div>
          <div class="bottom">
            <span>￥{{shop.minPrice}}起送 </span><span>配送费￥{{shop.deliverPrice}} </span><span>￥{{shop.consume}}/人</span><div class="distance"><span></span><span>{{shop.deliverTime}}分钟</span></div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
  const ERR_OK = 0;
export default {
  data () {
    return {
      shopLists: []
    }
  },
  created () {
    this.axios.get('/api/shopLists').then((response) => {
      response = response.data;
      if (response.errno === ERR_OK) {
        this.shopLists = response.data;
      }
    })
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path);
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shop-item
  position: relative
  padding:.7rem .4rem
  .pic
    display :inline-block
    margin-right :.4rem
    img
      width: 2.7rem
      height: 2.7rem
  .shop-content
    display :inline-block
    vertical-align :top
    font-size :.4rem
    .middle
      padding :.5rem 0
    .top
      span
        font-size :0.65rem
        font-weight :700
    .middle
      color: #666
      .star
        display: inline-block
      .score
        color: #ff6000
    .bottom
      color: #666
      .distance
        display :inline-block
        position: absolute
        right: .4rem
        bottom: 1.1rem
</style>
