<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item border-1px" :class="{'current':currentIndex === index}"
            @click.stop.prevent="selectMenu(index)">
          <span class="text border-1px">
            <type-icon :size="3" :type="item.type"></type-icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click.stop.prevnet="selectFood(food)">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @cart-add="_drop" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopCart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
    <food @cart-add="_drop" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import TypeIcon from '../typeIcon/typeIcon.vue'
  import food from '../food/food.vue'

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.axios.get('/api/goods').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || this.scrollY < height2 && this.scrollY > height1) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        });
        this.RECORD_FOODS(foods);
        return foods;
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_FOODS'
      ]),
      _drop (target) {
        this.$nextTick(() => {
          this.$refs.shopCart.drop(target);
        });
      },
      selectMenu (index) {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        this.foodScroll.scrollToElement(foodList[index], 300);
      },
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        });

        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = -100;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectFood (food) {
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      shopcart: shopcart,
      cartcontrol: cartcontrol,
      TypeIcon: TypeIcon,
      food: food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 8.7rem
    bottom: 2.3rem
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 4rem
      width: 4rem
      background: #f3f5f7
      .menu-item
        display: table
        padding: 0 0.6rem;
        width: 2.8rem
        height: 2.7rem
        .text
          display: table-cell
          width: 2.8rem
          height: 2.7rem
          vertical-align: middle
          text-align: center
          border-1px(rgba(7, 17, 27, .1))
          line-height: 0.7rem
          font-size: 0.6rem
          font-weight: 200
        &.current
          position: relative
          z-index: 10
          margin-top: -0.05rem
          background-color: #fff
          .text
            border-none()
            font-weight: 400
    .foods-wrapper
      flex: 1
      .title
        padding-left: 0.7rem
        height: 1.3rem
        line-height: 1.3rem
        border-left: 0.1rem solid #d9dde1
        font-size: 0.6rem
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 0.7rem 0 0.7rem 0.7rem
        padding-bottom: 0.7rem
        border-1px: (rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 4.4rem
          margin-right: 0.5rem
          img
            width:4.4rem
            height: 4.4rem
        .content
          flex: 1
          .name
            margin: 0.077rem 0 0.308rem 0
            line-height: 0.539rem
            font-size: 0.539rem
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 0.385rem
            font-size: 0.385rem
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 0.308rem
            line-height: 0.739rem
          .extra
            .count
              margin-right: 0.162rem
          .price
            font-weight 700
            line-height 0.924rem
            .now
              margin-right: 0.308rem
              font-size: 0.539rem
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 0.385rem
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 0.462rem
</style>
