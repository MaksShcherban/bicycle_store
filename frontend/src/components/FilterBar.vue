<script setup>
import { ref } from 'vue'
import { useFetch } from './fetch'

const typeArray = ref(['mountain', 'road', 'gravel', 'city', 'electric', 'kids'])
const checkboxType = ref([])
const filteredData = ref([])
const getURL = () => {
  let url = 'http://localhost:3000/filter-params'

  console.log(url)
  const { data } = useFetch(url)
  filteredData.value = data
  console.log('filter: ', filteredData.value)
  // watch(
  //   () => data,
  //   (newData) => {
  //     if (newData) {
  //       filteredData.value = newData // Оновлення даних
  //     }
  //   }
  // )
}
</script>

<template>
  <div class="filter-bar">
    <ul class="filter-bar-list">
      <li class="filter-bar-item">
        <div class="filter-bar-item-title">Price</div>
        <div class="filter-bar-item-body">
          up
          <input type="number" />
          to
          <input type="number" />
        </div>
      </li>
      <li class="filter-bar-item">
        <div class="filter-bar-item-title">Type</div>
        <ul v-for="(item, index) in typeArray" :key="index" class="type-array-list">
          <li class="type-array-item">{{ item }}</li>
          <input type="checkbox" :value="item" v-model="checkboxType" />
        </ul>
      </li>
    </ul>
    <button @click="getURL(), $emit('filter-data', filteredData)" type="button">Filter</button>
  </div>
</template>

<style lang="scss" scoped></style>
