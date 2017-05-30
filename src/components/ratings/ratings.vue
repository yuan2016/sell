<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">食物评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @ratingtype-select="ratingTypeChange" @content-toggle="onlyContentChange"
                    :select-type="selectType" :only-content="onlyContent" :desc="desc"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in ratings">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></span>
                <span class="recommend-item" v-for="item in rating.recommend"
                      v-show="rating.recommend && rating.recommend.length">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../../components/star/star';
  import Ratingselect from '../../components/ratingselect/ratingselect';
  import Split from '../../components/split/split';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';

  const ERR_OK = 0;
  const ALL = 2;
  export default {
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    name: 'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      ratingTypeChange (type) {
        this.selectType = type;
        this._initScroll();
      },
      onlyContentChange (isOnlyContent) {
        this.onlyContent = isOnlyContent;
        this._initScroll();
      },
      _initScroll () {
        this.$nextTick(() => {
          if (!this.$refs.ratings) return;
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    created () {
      this.axios.get('/api/ratings').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
        }
      });
    },
    data () {
      return {
        ratings: [],
        selectType: 0,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    components: {
      Star,
      Ratingselect,
      Split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position: absolute
    top: 8.7rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 0.9rem 0
      .overview-left
        flex: 0 0 6.05rem
        width: 6.05rem
        border-right: 0.05rem solid rgba(7, 17, 27, .1)
        text-align: center
        .score
          margin-bottom: 0.3rem
          line-height: 1.4rem
          font-size: 1.2rem
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 0.4rem
          line-height: 0.6rem
          font-size: 0.6rem
          color: rgb(7, 17, 27)
        .rank
          padding-bottom: 0.3rem 0 0.3rem 1.2rem
          line-height: 0.5rem
          font-size: 0.5rem
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding-left: 0.1rem
        .delivery-wrapper, .score-wrapper
          font-size: 0
          .title
            display: inline-block
            line-height: 0.9rem
            vertical-align: top
            font-size: 0.6rem
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 0.5rem
            vertical-align: top
          .score
            display: inline-block
            line-height: 0.9rem
            vertical-align: top
            font-size: 0.6rem
            color: rgb(255, 153, 0)
        .score-wrapper
          margin-bottom: 0.4rem
        .delivery-wrapper
          .delivery
            margin-left: 0.6rem
            line-height: 0.9rem
            vertical-align: top
            font-size: 0.6rem
            color: rgb(147, 153, 159)

    .rating-wrapper
      padding: 0 0.9rem
      .rating-item
        display: flex
        padding: 0.9rem 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar
          flex: 0 0 1.4rem
          width: 1.4rem
          margin-right: 0.6rem
          img
            width: 1.4rem
            height: 1.4rem
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 0.2rem
            line-height: 0.6rem
            font-size: 0.5rem
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 0.3rem
            font-size: 0
            .star
              display: inline-block
              margin-right: 0.3rem
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 0.6rem
              font-size: 0.5rem
              color: rgb(147, 153, 159)

          .text
            margin-bottom: 0.9rem
            line-height: 0.9rem
            color: rgb(7, 17, 27)
            font-size: 0.6rem
          .recommend
            font-size: 0
            .icon-thumb_up, .recommend-item, .icon-thumb_down
              margin: 0 0.4rem 0.2rem 0
              line-height: 0.8rem
              vertical-align: top
              font-size: 0.45rem
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(183, 187, 191)
            .recommend-item
              display: inline-block
              padding: 0 0.3rem
              max-width: 6rem
              color: rgb(147, 153, 159)
              border: 0.05rem solid rgba(7, 17, 27, .1)
              border-radius: 0.1rem
              background-color: rgb(255, 255, 255);
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis

          .time
            position: absolute
            top: 0
            right: 0
            line-height: 0.6rem
            font-size: 0.5rem
            color: rgb(147, 153, 159)

    .no-rating
      padding: 0.8rem 0
      font-size: 0.6rem
      color: rgb(147, 153, 159)


  /*.delivery-wrapper */


</style>
