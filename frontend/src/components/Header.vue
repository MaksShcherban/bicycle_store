<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="header">
    <div class="header-logo">
      <div class="header-logo-images">
        <router-link to="/" class="header-logo-link">
          <img class="header-logo-link-image" src="/icon/logo.svg" alt="Logo" />
        </router-link>
      </div>
      <div class="header-logo-text">
        <div class="header-logo-text-title">
          Bicycle <br />
          Store
        </div>
      </div>
    </div>
    <nav class="header-body">
      <ul class="header-body-list" :class="{ active: isActive }">
        <li class="header-body-item">
          <a href="#" class="header-body-item-link">
            <img class="header-body-item-image" src="/icon/contact.svg" alt="contact" />
            <div class="header-body-item-text">Contact</div>
          </a>
        </li>
        <li class="header-body-item">
          <a href="#" class="header-body-item-link">
            <img class="header-body-item-image" src="/icon/catalog.svg" alt="Catalog" />
            <div class="header-body-item-text">Catalog</div>
          </a>
        </li>
        <li class="header-body-item">
          <router-link to="/shopping-cart" class="header-body-item-link">
            <img class="header-body-item-image" src="/icon/trash.svg" alt="shopping cart" />
            <div class="header-body-item-text">{{ numberWithSpaces(store.finalPrice) }} ₴</div>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="hamburger" @click="clickHamburger" :class="{ active: isActive }">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'
import { useShoppingStore } from '@/stores/shoppingCart'
import { numberWithSpaces } from '@/utils/numberWithSpaces'
const isActive = ref(false)
const clickHamburger = () => {
  isActive.value = !isActive.value
}

const store = useShoppingStore()
// const props = defineProps({
//   currentFinalPrice: { type: Number, default: 0 }
// })
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 15px;
  padding-inline: 10px;
  background-color: $bg-color-header;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: $box-shadow;
  min-height: 110px;
  position: sticky;
  top: 0;
  z-index: 15;
  &-logo {
    display: flex;
    align-items: center;
    column-gap: 10px;
    &-images {
      border-radius: 50%;
      transition-duration: 0.2s;
      &:hover {
        box-shadow: $box-shadow;
        filter: brightness(85%);
      }
    }
    &-link-image {
      width: 80px;
      aspect-ratio: 1;
    }
    &-text-title {
      font-family: $font-family-accent;
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.25px;
    }
  }

  &-body-list {
    display: flex;
    column-gap: 15px;
    padding-right: 30px;
  }
  &-body-item {
    transition-duration: 0.2s;
    &:hover {
      border-radius: 10px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      filter: brightness(80%);
    }
    &-link {
      display: flex;
      column-gap: 10px;
      padding-block: 10px;
      padding-inline: 5px;
      text-decoration: none;
      align-items: center;
    }
    &-text {
      font-family: $font-family-base;
      font-weight: 700;
      color: $color-black;
    }
  }
}
.header-body-item-image {
  width: 30px;
  aspect-ratio: 1;
}
.hamburger {
  display: none;
  cursor: pointer;
}
.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: $color-black;
  margin-right: 10px;
}
@media (max-width: 768px) {
  .header {
    min-height: 80px;
    padding: 10px;
    &-logo-link-image {
      width: 70px;
    }
    &-logo-text-title {
      font-size: 16px;
    }
  }
  .hamburger {
    display: block;
  }
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .header-body-list {
    position: fixed;
    left: -100%;
    top: 90px;
    flex-direction: column;
    background-color: $bg-color-header;
    width: calc(100% - 30px);
    text-align: center;
    align-items: center;
    transition: 0.3s;
    z-index: 11;
    border-radius: 20px;
  }
  .header-body-item {
    margin: 10px 0;
  }
  .header-body-list.active {
    left: 15px;
  }
}
</style>
