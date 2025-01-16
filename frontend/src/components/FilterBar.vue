<script setup>
import { ref } from 'vue'
import { useFetch } from './fetch'

const typeArray = ref(['mountain', 'road', 'gravel', 'city', 'electric', 'kids'])
const checkboxType = ref([])
const filteredData = ref([])
const emit = defineEmits(['filterDataSend'])
const getURL = () => {
  let url = 'http://localhost:3000/filter-params'
  if (checkboxType.value.length > 0) {
    const queryParams = checkboxType.value
      .map((item) => `type=${encodeURIComponent(item)}`)
      .join('&')
    url += `?${queryParams}`
  }
  console.log(url)
  const { data } = useFetch(url)
  filteredData.value = data
  console.log('filter: ', filteredData.value)
  emit('filterDataSend', filteredData.value)
}
</script>

<template>
  <div class="filter-bar">
    <ul class="filter-bar-list">
      <li class="filter-bar-item">
        <div class="filter-bar-item-title">Price</div>
        <div class="filter-bar-item-body">
          <div class="filter-bar-item-body-price-range">Up</div>
          <input class="filter-bar-item-body-price-range-input" type="number" /> <br />
          <div class="filter-bar-item-body-price-range">To</div>
          <input class="filter-bar-item-body-price-range-input" type="number" />
        </div>
      </li>
      <li class="filter-bar-item">
        <div class="filter-bar-item-title">Type</div>
        <ul v-for="(item, index) in typeArray" :key="index" class="filter-bar-item-body-type">
          <li class="type-array-item">{{ item }}</li>
          <input type="checkbox" :value="item" v-model="checkboxType" />
        </ul>
      </li>
    </ul>
    <button @click="getURL()" type="button" class="my-button filter-button">Filter</button>
  </div>
</template>

<style lang="scss" scoped>
.filter-bar {
  margin-inline: 10px;
}
.filter-bar-list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.filter-bar-item {
  display: flex;
  flex-direction: column;
  column-gap: 5px;
  &-title {
    font-size: 18px;
    font-weight: 700;
  }
  &-body {
    &-price-range-input {
      max-width: 150px;
    }
  }
  &-body-type {
    display: flex;
    justify-content: space-between;
  }
}
.filter-button {
  width: 100%;
  margin-top: 10px;
}
</style>
