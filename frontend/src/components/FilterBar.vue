<script setup>
import { ref } from 'vue'
import { useFetch } from './fetch'
import CustomMinMaxSlider from './CustomMinMaxSlider.vue'

const typeArray = ref([])
const brandArray = ref([])
const wheelArray = ref([])
const isActiveType = ref(true)
const isActiveBrand = ref(false)
const isActiveWheel = ref(false)
const currentStateFilter = defineProps({ currentStateFilter: Boolean })

const getFilterParams = async () => {
  let url = 'http://localhost:3000/get-filter-params/type'
  const { data: fetchDataType } = await useFetch(url)
  typeArray.value = fetchDataType
  url = 'http://localhost:3000/get-filter-params/brand'
  const { data: fetchDataBrand } = await useFetch(url)
  brandArray.value = fetchDataBrand
  url = 'http://localhost:3000/get-filter-params/wheel'
  const { data: fetchDataWheel } = await useFetch(url)
  wheelArray.value = fetchDataWheel
}
getFilterParams()

const changePlusMinusType = () => {
  isActiveType.value = !isActiveType.value
}
const changePlusMinusBrand = () => {
  isActiveBrand.value = !isActiveBrand.value
}
const changePlusMinusWheel = () => {
  isActiveWheel.value = !isActiveWheel.value
}

const filterData = ref({
  sliderMin: 10000,
  sliderMax: 423000,
  typeBike: [],
  brandBike: [],
  wheelSize: [],
  buttonClick: false
})
</script>

<template>
  <div class="filter-bar">
    <ul class="filter-bar-list">
      <div class="button-close" @click="$emit('updateVisible', !isACtive)">Close</div>
      <li class="filter-bar-item">
        <div class="filter-bar-item-title item-title-price">Price</div>
        <div class="slider-cont">
          <CustomMinMaxSlider
            :min="10000"
            :max="423000"
            v-model:min-value="filterData.sliderMin"
            v-model:max-value="filterData.sliderMax"
          />
        </div>
      </li>
      <li class="filter-bar-item">
        <div class="filter-bar-head">
          <div class="filter-bar-item-title">Type</div>
          <div class="plus-minus" @click="changePlusMinusType">
            <span class="item"></span>
            <span class="item" :class="{ active: isActiveType }"></span>
          </div>
        </div>
        <ul
          v-for="(item, index) of typeArray"
          :key="index"
          class="filter-bar-item-body-type"
          :class="{ active: isActiveType }"
        >
          <li class="type-array-item">{{ item.type }}</li>
          <input type="checkbox" :value="item.type" v-model="filterData.typeBike" />
        </ul>
      </li>
      <li class="filter-bar-item">
        <div class="filter-bar-head">
          <div class="filter-bar-item-title">Brand</div>
          <div class="plus-minus" @click="changePlusMinusBrand">
            <span class="item"></span>
            <span class="item" :class="{ active: isActiveBrand }"></span>
          </div>
        </div>
        <ul
          v-for="(item, index) of brandArray"
          :key="index"
          class="filter-bar-item-body-type"
          :class="{ active: isActiveBrand }"
        >
          <li class="type-array-item">{{ item.brand }}</li>
          <input type="checkbox" :value="item.brand" v-model="filterData.brandBike" />
        </ul>
      </li>
      <li class="filter-bar-item">
        <div class="filter-bar-head">
          <div class="filter-bar-item-title">Wheel Size</div>
          <div class="plus-minus" @click="changePlusMinusWheel">
            <span class="item"></span>
            <span class="item" :class="{ active: isActiveWheel }"></span>
          </div>
        </div>
        <ul
          v-for="(item, index) of wheelArray"
          :key="index"
          class="filter-bar-item-body-type"
          :class="{ active: isActiveWheel }"
        >
          <li class="type-array-item">{{ item.wheel_diameter }}</li>
          <input type="checkbox" :value="item.wheel_diameter" v-model="filterData.wheelSize" />
        </ul>
      </li>
      <button
        @click="$emit('filterDataUpdate', filterData)"
        type="button"
        class="my-button filter-button"
      >
        Filter
      </button>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.filter-bar {
  margin-inline: 10px;
  transition: 0.3s;
}
.filter-bar-list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.filter-bar-item {
  position: relative;
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
    height: 0;
    opacity: 0;
    overflow: hidden;
    justify-content: space-between;
    transition: 0.5s;
    margin-right: 7.5px;
    &.active {
      display: flex;
      height: auto;
      opacity: 1;
    }
  }
}
.filter-bar-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plus-minus {
  padding: 10px;
}
.item {
  display: block;
  width: 15px;
  height: 2px;
  background: #000;
  transition: 0.3s;
  border-radius: 5px;
  &.active {
    opacity: 0;
  }
  &:nth-child(2) {
    transform: translateY(-1px) rotate(90deg);
  }
}

.filter-button {
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid #000;
}

.button-close {
  position: relative;
  display: none;
  padding: 5px;
  border: 1px solid;
  cursor: pointer;
  border-radius: 5px;
  justify-content: end;
  padding-inline: 10px;
  &::after {
    position: absolute;
    content: '';
    display: flex;
    width: 15px;
    height: 2px;
    background-color: #000;
    top: 1em;
    left: 1em;
    transform: rotate(45deg);
    border-radius: 5px;
  }
  &::before {
    position: absolute;
    content: '';
    display: flex;
    width: 15px;
    height: 2px;
    background-color: #000;
    top: 1em;
    left: 1em;
    transform: rotate(-45deg);
    border-radius: 5px;
  }
}

@media (max-width: 940px) {
  .filter-bar {
    position: absolute;
    top: 70px;
    left: -100%;
    padding: 50px;
    margin: 0;
    background: $bg-color-header;
    z-index: 10;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: $box-shadow;
  }
  .button-close {
    display: flex;
  }
}
@media (max-width: 425px) {
  .filter-bar {
    width: calc(100% - 20px);
  }
}
</style>
