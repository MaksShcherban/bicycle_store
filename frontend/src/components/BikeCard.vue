<script setup>
// import { ref } from 'vue'
const props = defineProps({
  bikeData: Array
})
</script>
<template>
  <div class="bike">
    <div v-if="props.bikeData.includes(props.bikeData[0])">
      <ul class="bike-list">
        <li
          class="bike-item"
          :class="{ disable: item.in_stock === 0 }"
          v-for="item in props.bikeData"
          :key="item.idbike"
        >
          <router-link
            class="bike-item-link"
            :to="`/type/` + item.type.toLowerCase() + `/id/` + item.idbike"
          >
            <img class="bike-images" :src="item.src" />
            <div class="bike-description">
              <div class="bike-title">
                Bike {{ item.wheel_diameter }}" {{ item.brand }} {{ item.model }}
              </div>
              <div class="bike-in_stoke in-stock" v-if="item.in_stock === 1">In stock</div>
              <div class="bike-in_stoke out-stock" v-else>Sold out</div>
              <div v-if="item.in_stock === 1" class="bike-subtitle">
                {{ item.price.toLocaleString('en').replace(/,/g, ' ') }} ₴
              </div>
              <div v-else class="bike-subtitle">0$</div>
            </div>
          </router-link>
          <div class="block-bike-hide">
            <div class="block-bike-hide-router">
              Brand:
              <router-link
                class="block-bike-hide-router-link"
                :to="`/brand/` + item.brand.toLowerCase()"
                >{{ item.brand }}</router-link
              >
            </div>
            <div class="block-bike-hide-router">
              Type:
              <router-link
                class="block-bike-hide-router-link"
                :to="`/type/` + item.type.toLowerCase()"
                >{{ item.type }}</router-link
              >
            </div>
            <div class="block-bike-hide-buttons">
              <button class="bth-buy" :disabled="item.in_stock === 0">Buy</button>
              <router-link
                class="block-bike-hide-info"
                :to="`/type/` + item.type.toLowerCase() + `/id/` + item.idbike"
              >
                More info
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="empty">Nothing found😢</div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
.bike {
  max-width: $container-width-small;
  margin: 0 auto;
  margin-top: 20px;
  &-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    gap: 10px;
    position: relative;
  }
  &-description {
    display: flex;
    flex-direction: column;
    margin-block: 20px;
    padding-inline: 15px;
    height: 100%;
    row-gap: 10px;
    justify-content: space-between;
  }
  &-item {
    position: relative;
    border-radius: 10px;
    background-color: #fff;
    padding-top: 20px;
    max-width: 310px;
    width: 100%;
    height: 340px;
    transition-duration: 0.2s;
    border: #cacccf solid 1px;
    z-index: 1;
    &.disable {
      filter: blur(1px);
      &:disabled {
        background: #000;
      }
    }
    &:hover {
      position: relative;
      margin-bottom: -100px;
      height: 440px;
      z-index: 2;
      .bike-description {
        height: auto;
      }
      .block-bike-hide {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        // justify-content: space-between;
        row-gap: 10px;
        bottom: 0;
        padding-inline: 15px;
        padding-bottom: 10px;
      }
      .bike-in_stoke {
        color: #ebf2eb;
      }
      .in-stock {
        background-color: #0ac23b;
      }
      .out-stock {
        background-color: #e2612a;
      }
    }
    &-link {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      height: 100%;
      color: #000;
    }
  }
  &-images {
    width: 100%;
    max-width: 310px;
    max-height: 139px;
    height: 100%;
    object-fit: contain;
    min-width: 200px;
    padding-inline: 5px;
  }
  &-title {
    font-family: $font-family-main;
    letter-spacing: 0.4px;
    font-weight: 700;
  }
  &-subtitle {
    font-family: $font-family-main;
    font-weight: 700;
  }
  &-in_stoke {
    font-family: $font-family-main;
    width: max-content;
    transition-duration: 0.2s;
    padding: 5px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.5px;
  }
}
.block-bike-hide {
  display: none;
  &-router-link {
    color: $color-black;
  }
  &-buttons {
    display: flex;
    justify-content: space-between;
    align-self: center;
    column-gap: 5px;
  }
}

.block-bike-hide-info {
  text-decoration: none;
  border: solid 1px black;
  width: 150px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $color-black;
  transition: 0.2s;
  &:hover {
    background-color: color.scale($color-btn, $blackness: 10%);
  }
}
.empty {
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  height: 400px;
}

@media (max-width: 1050px) {
  .bike-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (max-width: 768px) {
  .bike-list {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 540px) {
  .bike-list {
    grid-template-columns: 1fr;
  }
}
</style>
