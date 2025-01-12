<script setup>
import { ref, watch } from 'vue'

const selectSortData = ref('')

const props = defineProps({
  currentData: Object
})

const localData = ref([...props.currentData])

const sortList = () => {
  if (selectSortData.value === 'price-asc') {
    localData.value.sort((a, b) => a.price - b.price)
  } else if (selectSortData.value === 'price-desc') {
    localData.value.sort((a, b) => b.price - a.price)
  } else if (selectSortData.value === 'name-alphabet') {
    localData.value.sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model))
  }
}

watch(
  () => props.currentData,
  (newData) => {
    localData.value = [...newData]
  },
  { immediate: true }
)
</script>

<template>
  <div class="sort-data">
    <select
      class="sort-data-select my-input"
      v-model="selectSortData"
      @change="sortList"
      @change.prevent="$emit('sortedData', localData)"
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
