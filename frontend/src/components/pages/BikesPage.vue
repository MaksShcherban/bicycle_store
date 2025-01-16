<script setup>
import { ref, watch } from 'vue'
import Header from '@/components/Header.vue'
import { useRoute } from 'vue-router'
import { useFetch } from '../fetch'
import BikeCard from '../BikeCard.vue'
import breadCrumbs from '@/components/BreadCrumbs.vue'
import SortItem from '../SortBar.vue'
import SearchBar from '../SearchBar.vue'
import FooterInfo from '@/components/FooterInfo.vue'
import FilterBar from '../FilterBar.vue'
const route = useRoute()
const data = ref([null])

let currentRoute = ref('')
const dataAfterSold = ref([])
const dataEnd = ref([])

const loadData = () => {
  let url = `http://localhost:3000`
  let typeBike = route.params.type
  let brandBike = route.params.brand
  if (typeBike && brandBike === undefined) {
    url += `/type/${typeBike.toLowerCase()}`
    currentRoute.value = typeBike
  } else if (brandBike && typeBike === undefined) {
    url += `/brand/${brandBike.toLowerCase()}`
    currentRoute.value = brandBike
  } else if (typeBike && brandBike) {
    url += `/type/${typeBike.toLowerCase()}/brand/${brandBike.toLowerCase()}`
    currentRoute.value = `${typeBike} ${brandBike}`
  }
  const { data: fetchedData } = useFetch(url)
  data.value = fetchedData
}

loadData()
const filterDataReceived = (localData) => {
  console.log('dataFilter', localData)
  return (dataAfterSold.value = localData)
}
watch(
  () => route.fullPath,
  () => {
    loadData()
    watch(data.value, (newData) => {
      if (newData && newData.length > 0) {
        const inStock = newData.filter((elem) => elem.in_stock !== 0)
        const outStock = newData.filter((elem) => elem.in_stock === 0)
        dataAfterSold.value = [...inStock, ...outStock]
      }
    })
  }
)

watch(data.value, (newData) => {
  if (newData && newData.length > 0) {
    const inStock = newData.filter((elem) => elem.in_stock !== 0)
    const outStock = newData.filter((elem) => elem.in_stock === 0)
    dataAfterSold.value = [...inStock, ...outStock]
  }
})

const updateData = (localData) => {
  const bike = [...localData]
  const inStock = bike.filter((elem) => elem.in_stock !== 0)
  const outStock = bike.filter((elem) => elem.in_stock === 0)
  const newBikeData = ref([...inStock, ...outStock])
  // console.log('upadate DAta: '.newBikeData.value)
  return (dataEnd.value = newBikeData.value)
}

watch(dataAfterSold, (newList) => {
  dataEnd.value = newList
})
</script>

<template>
  <div class="container-full">
    <div class="container">
      <Header />
      <breadCrumbs
        :bread-crumbs-type="route.params.type"
        :bread-crumbs-brand="route.params.brand"
      />
      <div class="header-info">
        {{ currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1) }}
      </div>
      <div class="section-search-sort">
        <SearchBar :bike-data="dataAfterSold" @search-data="updateData" />
        <SortItem class="sort" :current-data="dataAfterSold" @sorted-data="updateData" />
      </div>
      <section class="section-card">
        <FilterBar @filter-data-send="filterDataReceived" />
        <BikeCard :bike-data="dataEnd" />
      </section>
    </div>
    <FooterInfo />
  </div>
</template>

<style lang="scss">
.header-info {
  font-family: $font-family-accent;
  font-size: 32px;
  margin-top: 10px;
}
.section-search-sort {
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 10px;
}

@media (max-width: 600px) {
  .section-search-sort {
    flex-direction: column;
    row-gap: 10px;
    align-items: end;
  }
}

.section-card {
  display: flex;
}
</style>
