<script setup>
import { onMounted, ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { useFetch } from './fetch'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const config = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 5000,

  breakpointMode: 'carousel',
  breakpoints: {
    // 737px and up
    737: {
      itemsToShow: 2,
      snapAlign: 'center'
    }
  }
}
const carouselList = ref([])

const url = 'http://localhost:3000/mainCarousel'

onMounted(async () => {
  const { data: fetchedData } = await useFetch(url)
  carouselList.value = fetchedData
})
</script>

<template>
  <Carousel class="carousel" v-bind="config">
    <Slide class="carousel-slide" v-for="item in carouselList" :key="item.id">
      <div class="carousel__item">
        <router-link :to="'/type/' + item.nameType.toLowerCase()">
          <div class="carousel-item" :style="{ 'background-image': 'url(' + item.src + ')' }">
            <div class="carousel-item-body">
              <div class="carousel-item-body-title">{{ item.nameType }}</div>
              <div class="carousel-item-body-description">{{ item.slogan }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style lang="scss" scoped>
.carousel {
  margin-top: 40px;
  padding-bottom: 20px;
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center;
    z-index: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    &-body {
      &-title {
        position: absolute;
        top: 1em;
        left: 1em;
        font-family: $font-family-accent;
        padding: 5px;
        font-size: 28px;
        border-radius: 10px;
        box-shadow: $box-shadow;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }
      &-description {
        position: absolute;
        bottom: 1em;
        right: 1em;
        max-width: 400px;
        text-align: right;
        font-family: $font-family-base;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        box-shadow: $box-shadow;
        border-radius: 10px;
        padding-inline: 15px;
        padding-block: 5px;
      }
    }
  }
}
.carousel__item {
  width: 750px;
  height: 500px;
  border-radius: 20px;
  padding-inline: 10px;
}
</style>
