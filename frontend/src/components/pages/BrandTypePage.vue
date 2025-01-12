<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '../fetch'
import Header from '@/components/Header.vue'
import BikeCard from '../BikeCard.vue'
import breadCrumbs from '@/components/BreadCrumbs.vue'
import SortItem from '../SortBar.vue'
import SearchBar from '../SearchBar.vue'
import FooterInfo from '@/components/FooterInfo.vue'

const route = useRoute()
const typeBike = route.params.type
const brandBike = route.params.brand

const filteredList = ref([])

const url = `http://localhost:3000/type/${typeBike}/brand/${brandBike}`

const { data } = useFetch(url)
const firstData = ref([])
watch(data, (newData) => {
  if (newData && newData.length > 0) {
    const inStock = newData.filter((elem) => elem.in_stock !== 0)
    const outStock = newData.filter((elem) => elem.in_stock === 0)
    firstData.value = [...inStock, ...outStock]
  }
})

const updateData = (localData) => {
  const bike = [...localData]
  const inStock = bike.filter((elem) => elem.in_stock !== 0)
  const outStock = bike.filter((elem) => elem.in_stock === 0)

  const newBikeData = ref([...inStock, ...outStock])
  return (filteredList.value = newBikeData.value)
}

watch(firstData, (newList) => {
  filteredList.value = newList
})
</script>

<template>
  <div class="container-all">
    <div class="container">
      <Header />
      <breadCrumbs :bread-crumbs-type="typeBike" :bread-crumbs-brand="brandBike" />
      <div class="header-info">
        {{ brandBike.charAt(0).toUpperCase() + brandBike.slice(1) }}
        {{ typeBike.charAt(0).toUpperCase() + typeBike.slice(1) }}
      </div>
      <div class="section-search-sort">
        <SearchBar :bike-data="firstData" @search-data="updateData" />
        <SortItem :current-data="firstData" @sorted-data="updateData" />
      </div>
      <BikeCard :bike-data="filteredList" />
    </div>
    <FooterInfo />
  </div>
</template>
