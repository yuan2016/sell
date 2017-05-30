<template>
  <div class="search">
    <outerHeader>
      <input type="text" v-on:keyup.13="submit" placeholder="输入商家、商品名称" class="search-box" slot="search-box" v-model="searchWord">
    </outerHeader>
    <div class="all-content">
    <div class="search-content" v-show="!isShow">
      <div class="history-word" v-if="historyWord" v-show="isOpen">
        <p class="search-title">历史搜索</p>
        <div class="word">
          <span @click="search" v-for="item in historyWord">{{item}}</span>
        </div>
        <i class="icon-dustbin" @click.stop.prevent="clear"></i>
      </div>
      <div class="hot-word">
        <p class="search-title">热门搜索</p>
        <div class="word">
          <span @click="search" v-for="item in hotWord">{{item.name}}</span>
        </div>
      </div>
    </div>
    <shopList v-show="isShow"></shopList>
    </div>
    <outerFooter></outerFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import outerFooter from '../common/footer/outerFooter';
  import outerHeader from '../common/header/outerHeader';
  import shopList from '../shopList/shopList';
  import {setHistory, getHistory, clearHistory} from '../../common/js/store';

  const ERR_OK = 0;
  let history = '__historyWord__';
  export default {
    data () {
      return {
        searchWord: '',
        hotWord: [],
        historyWord: (() => getHistory(history))(),
        isShow: false,
        isOpen: true
      }
    },
    created () {
      this.axios.get('/api/hotWord').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.hotWord = response.data;
        }
      });
    },
    components: {
      outerFooter,
      outerHeader,
      shopList
    },
    methods: {
      search (el) {
        this.searchWord = el.target.innerText;
      },
      submit (el) {
        let value = el.target.value.trim();
        if (!value) {
          alert('请输入有效信息');
          el.target.value = value;
          return;
        }
        setHistory(value);
        this.isShow = !this.isShow;
      },
      clear () {
        clearHistory();
        this.isOpen = !this.isOpen;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search-box
    width: 15.3rem
    height: 1rem
    margin-top: 0.1rem
    text-align: left
    text-indent: 0.6rem
    font-size: 0.6rem
    color: #666
    border-radius: 0.5rem

  .all-content
    padding-top: 1.95rem
    .history-word
      position: relative
      .icon-dustbin
        position :absolute
        top: 0.4rem;
        right: 0.5rem;
        font-size: 0.6rem;
        color: #666
    .search-title
      padding: 0.5rem
      font-size: 0.6rem
      font-weight: 300
      color: #666
      background-color: rgb(244, 244, 244)
    .word
      padding: 0.5rem
      span
        display :inline-block
        padding: 0.1rem
        margin: 0 0.2rem
        border: 0.05rem solid #ccc
        border-radius :0.1rem
        font-size: 0.6rem
        font-weight: 300
        color: #666
</style>
