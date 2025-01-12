<script setup>
import { ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useFetch } from './fetch'

// Carousel configuration
const config = {
  itemsToShow: 1,
  wrapAround: true,
  snapAlign: 'center',
  breakpointMode: 'carousel',
  breakpoints: {
    // 500px and up
    450: {
      itemsToShow: 2,
      snapAlign: 'start'
    },
    600: {
      itemsToShow: 3,
      snapAlign: 'start'
    },
    800: {
      itemsToShow: 6,
      snapAlign: 'start'
    }
  }
}

const url = 'http://localhost:3000/brand'
const { data } = useFetch(url)
const carouselList = ref(data)
</script>

<template>
  <div>
    <Carousel class="carousel-brands" v-bind="config">
      <Slide class="carousel-brands-slide" v-for="item in carouselList" :key="item.idbrand">
        <router-link
          :to="'/brand/' + item.brand"
          class="carousel__item carousel-brands-item"
          :style="{ 'background-image': 'url(' + item.src_brand + ')' }"
        ></router-link
      ></Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
<style lang="scss" scoped>
.carousel-brands {
  padding-inline: 20px;
  &-item {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 20px;
  }
}
.carousel__next {
  display: flex;
  right: 10px;
  height: 100px;
  background-color: bisque;
  color: azure;
}
</style>
