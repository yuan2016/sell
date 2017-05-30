<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../header/header';
  import {mapMutations} from 'vuex';

  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.axios.get('/api/seller').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
            this.seller = response.data;
        }
        this.RECORD_SELLER(this.seller);
      })
    },
    methods: {
      ...mapMutations([
        'RECORD_SELLER'
      ])
    },
    components: {
      'v-header': Header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 2rem
    line-height: 2rem
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 0.7rem
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
