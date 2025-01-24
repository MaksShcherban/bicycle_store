<script setup>
import { computed, ref, watch } from 'vue'
import Header from '@/components/Header.vue'
import { useRoute } from 'vue-router'
import { useFetch } from '../fetch'
import BikeCard from '../BikeCardList.vue'
import breadCrumbs from '@/components/BreadCrumbs.vue'
import SortItem from '../SortBar.vue'
import SearchBar from '../SearchBar.vue'
import FooterInfo from '@/components/FooterInfo.vue'
import FilterBar from '../FilterBar.vue'
const route = useRoute()
const data = ref([])
const currentRoute = ref('')
const queryInputSearch = ref('')
const queryInputSort = ref('')
const isActive = ref(false)

const loadData = async () => {
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
  const { data: fetchedData } = await useFetch(url)
  const inStock = fetchedData.filter((elem) => elem.in_stock !== 0)
  const outStock = fetchedData.filter((elem) => elem.in_stock === 0)
  data.value = [...inStock, ...outStock]
}

loadData()

watch(
  () => route.fullPath,
  async () => {
    await loadData()
  }
)

const dataSearchAndSort = computed(() => {
  let result = [...data.value]
  if (queryInputSearch.value) {
    result = result.filter(
      (item) =>
        (item.brand.toLowerCase() + ' ' + item.model.toLowerCase()).indexOf(
          queryInputSearch.value.toLocaleLowerCase()
        ) !== -1
    )
  }
  if (queryInputSort.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (queryInputSort.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (queryInputSort.value === 'name-alphabet') {
    result.sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model))
  }
  let inStock = result.filter((elem) => elem.in_stock !== 0)
  let outStock = result.filter((elem) => elem.in_stock === 0)
  result = [...inStock, ...outStock]
  return result
})

const querySearchUpdate = (input) => {
  queryInputSearch.value = input
}

const querySortUpdate = (input) => {
  queryInputSort.value = input
}

const filterDataParams = ref([])

const filterDataReceived = async (filterData) => {
  filterDataParams.value = [
    ...filterData.typeBike,
    ...filterData.brandBike,
    ...filterData.wheelSize
  ]

  let url = 'http://localhost:3000/filter-params?'
  if (filterData.sliderMin) {
    const queryPrice = `priceFrom=${filterData.sliderMin}&`
    url += queryPrice
  }
  if (filterData.sliderMax) {
    const queryPrice = `priceTo=${filterData.sliderMax}&`
    url += queryPrice
  }

  if (filterData.typeBike.length >= 1) {
    const queryParamsType = filterData.typeBike
      .map((item) => `type=${encodeURIComponent(item)}`)
      .join('&')
    url += `${queryParamsType}&`
  }

  if (filterData.brandBike.length >= 1) {
    const queryParamsBrand = filterData.brandBike
      .map((item) => `brand=${encodeURIComponent(item)}`)
      .join('&')
    url += `${queryParamsBrand}&`
  }
  if (filterData.wheelSize.length >= 1) {
    const queryParamsWheel = filterData.wheelSize
      .map((item) => `wheel=${encodeURIComponent(item)}`)
      .join('&')
    url += `${queryParamsWheel}&`
  }

  const EndURL = url.substring(0, url.length - 1)

  const { data: filterDataUpdate } = await useFetch(EndURL)
  const inStock = filterDataUpdate.filter((elem) => elem.in_stock !== 0)
  const outStock = filterDataUpdate.filter((elem) => elem.in_stock === 0)
  data.value = [...inStock, ...outStock]
  isActive.value = filterData.buttonClick
}

const clickButtonFilter = () => {
  isActive.value = !isActive.value
}
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
        <div class="header-info-page">
          {{ currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1) }}
        </div>
        <div v-if="filterDataParams.length >= 1" class="header-info-filter">
          Filters:

          <ul
            v-for="(item, index) in filterDataParams"
            :key="index"
            class="header-info-filter-list"
          >
            <li class="header-info-filter-item">{{ item }}</li>
            <span v-if="index + 1 != filterDataParams.length">,</span>
          </ul>
        </div>
      </div>
      <div class="section-search-sort">
        <div class="button-filter" @click="clickButtonFilter">Filter</div>
        <SearchBar @query-input-data="querySearchUpdate" />
        <SortItem class="sort" @sorted-data="querySortUpdate" />
      </div>
      <section class="section-card">
        <FilterBar
          class="filter-bar-component"
          :class="{ active: isActive }"
          @filter-data-update="filterDataReceived"
          :current-state-filter="isActive"
          @update-visible="clickButtonFilter"
        />
        <BikeCard :bike-data="dataSearchAndSort" />
      </section>
    </div>
    <FooterInfo />
  </div>
</template>

<style lang="scss">
.container {
  position: relative;
}
.header-info {
  font-family: $font-family-accent;
  font-size: 32px;
  margin-top: 10px;
  &-filter {
    display: flex;
    font-family: $font-family-main;
    align-items: center;
    flex-wrap: wrap;
    font-size: 18px;
    column-gap: 3px;
    &-list {
      display: flex;
    }
  }
}
.section-search-sort {
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 10px;
}
.button-filter {
  display: none;
}

@media (max-width: 940px) {
  .button-filter {
    display: flex;
    border: 1px solid;
    height: 40px;
    width: 227px;
    justify-content: center;
    padding-inline: 10px;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    background-color: $bg-color-header;
  }
  .active {
    display: block;
  }
  .filter-bar-component.active {
    left: 10px;
  }
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
