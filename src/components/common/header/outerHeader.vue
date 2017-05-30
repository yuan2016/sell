<template>
  <div class="outer-header">
    <slot name="position"></slot>
    <slot name="weather"></slot>
    <slot name="icon-weather"></slot>
    <slot name="title"></slot>
    <slot name="bell"></slot>
    <slot name="my-title"></slot>
    <slot name="settings"></slot>
    <slot name="search-box"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .outer-header
    position :fixed
    left:0
    right:0
    top:0
    z-index: 100
    box-sizing :border-box
    height: 1.95rem
    background :#3190e8
    padding: 0.35rem
    font-size :0
</style>
