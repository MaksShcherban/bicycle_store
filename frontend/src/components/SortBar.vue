<script setup>
import { ref } from 'vue'

const selectSortData = ref('')
</script>

<template>
  <div class="sort-data">
    <select
      class="sort-data-select my-input"
      v-model="selectSortData"
      @change.prevent="$emit('sortedData', selectSortData)"
    >
      <option class="sort-data-option" disabled value="">Please, choose option</option>
      <option class="sort-data-option" value="name-alphabet">Name in alphabetical order</option>
      <option class="sort-data-option" value="price-asc">Price from less to more</option>
      <option class="sort-data-option" value="price-desc">Price from more to less</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.sort-data {
  &-select {
    padding: 2.5px;
    font-size: 16px;
    height: 40px;
  }
  &-option {
    position: relative;
    padding-inline: 5px;
    font-size: 16px;
    background-color: $bg-color-sort-search;
  }
}
</style>
