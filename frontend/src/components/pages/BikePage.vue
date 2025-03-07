<script setup>
import { useRoute } from 'vue-router'
import { onBeforeMount, ref, computed } from 'vue'
import { useFetch } from '../../utils/fetch'

import { useShoppingStore } from '@/stores/shoppingCart'
import { numberWithSpaces } from '@/utils/numberWithSpaces'
import Header from '@/components/Header.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import FooterInfo from '@/components/FooterInfo.vue'

const route = useRoute()
const id = route.params.id
const typeBike = route.params.type

const bikeDetail = ref(null)

const url = `http://localhost:3000/type/${typeBike}/id/${id}`

onBeforeMount(async () => {
  const { data: fetchedData } = await useFetch(url)
  bikeDetail.value = fetchedData
})

const uniqueColor = computed(() => {
  return [...new Set(bikeDetail.value.map((item) => item.color))]
})
const uniqueFrameSize = computed(() => {
  return [...new Set(bikeDetail.value.map((item) => item.frame_size))]
})

const store = useShoppingStore()

const uploadShopping = () => {
  store.getBikeID(Number(id))
  store.getPrice(bikeDetail.value[0].price)
}

// const uploadID = () => {
//   store.getBikeID(Number(id))
// }
</script>

<template>
  <div class="container-all">
    <div class="container">
      <Header />
      <BreadCrumbs :bread-crumbs="bikeDetail[0]" />
      <div class="bike-page">
        <div class="bike-page-info">
          <div class="bike-page-info-title">
            <div class="bike-page-name">
              Bike {{ bikeDetail[0].wheel_diameter }}" {{ bikeDetail[0].brand }}
              {{ bikeDetail[0].model }} ({{ bikeDetail[0].year }}) {{ bikeDetail[0].color }}
            </div>
            <div class="bike-page-info-about">
              <div class="bike-page-image">
                <img class="bike-page-image-item" :src="bikeDetail[0].src" alt="" srcset="" />
              </div>
              <div class="bike-page-intro">
                <ul class="bike-page-intro-list">
                  <li class="bike-page-intro-variant">
                    Options / color: <br />
                    <ul class="bike-page-intro-variant-list">
                      <li
                        class="bike-page-intro-variant-item"
                        v-for="colorItem in uniqueColor"
                        :key="colorItem"
                      >
                        {{ colorItem }};
                      </li>
                    </ul>
                  </li>
                  <li class="bike-page-intro-variant">
                    Size: <br />
                    <ul class="bike-page-intro-variant-list">
                      <li
                        class="bike-page-intro-variant-item"
                        v-for="frameItem in uniqueFrameSize"
                        :key="frameItem"
                      >
                        {{ frameItem }};
                      </li>
                    </ul>
                  </li>
                  <li class="bike-page-intro-variant">
                    Price: <br />
                    <div class="bike-page-intro-variant-price">
                      {{ numberWithSpaces(bikeDetail[0].price) }} ₴
                    </div>
                  </li>
                </ul>
                <router-link to="/shopping-cart">
                  <button @click="uploadShopping" class="bike-page-button-buy bth-buy">Buy</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="bike-page-services"></div>
      </div>
    </div>

    <FooterInfo />
  </div>
</template>

<style lang="scss">
.bike-page {
  &-info {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    // margin-top: 20px;
  }
  &-info-about {
    display: flex;
    column-gap: 30px;
  }

  &-name {
    font-family: $font-family-main;
    font-size: 26px;
  }
  &-image-item {
    width: 600px;
    border-radius: 10px;
    box-shadow: $box-shadow;
  }
  &-intro-list {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
  &-intro {
    &-variant {
      font-family: $font-family-accent;

      &-price {
        font-weight: 700;
        font-size: 24px;
      }
      &-list {
        display: flex;
        column-gap: 10px;
      }
    }
  }
}
</style>
