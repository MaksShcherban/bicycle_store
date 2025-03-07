<script setup>
import { onMounted, ref, watch } from 'vue'
import Header from '../Header.vue'
import FooterInfo from '../FooterInfo.vue'
import EmptyCartMessage from '../EmptyCartMessage.vue'
import { useFetch } from '../../utils/fetch'
import { useShoppingStore } from '@/stores/shoppingCart'
import { useOrderStore } from '@/stores/orderStore'
import { numberWithSpaces } from '@/utils/numberWithSpaces'

const concatShoppingList = ref([])

const store = useShoppingStore()
const orderStore = useOrderStore()

const getDataBike = async () => {
  if (store.bikeID.length === 0) {
    concatShoppingList.value = []
  }
  let URL = `http://localhost:3000/shopping-cart?`

  store.bikeID.map((item) => {
    return (URL += `id=${item.id}&`)
  })
  URL = URL.slice(0, -1)
  // console.log(URL)
  const { data: receiveData } = await useFetch(URL)

  concatShoppingList.value = []
  receiveData.map((item) => {
    store.bikeID.map((i) => {
      if (item.idbike === i.id) {
        concatShoppingList.value.push({ ...item, count: i.count })
      }
    })
  })
}
getDataBike()

watch(
  () => store.bikeID.length,
  async () => {
    await getDataBike()
  },
  { deep: true }
)
const countMinusPrice = (id, price) => {
  store.countMinus(id)
  store.subtractPrice(price)
}
const countPlusPrice = (id, price) => {
  store.countPlus(id)
  store.getPrice(price)
}

const valueEmptyCart = {
  paragraph: 'Cart is empty, add to cart any product to it',
  link: '/',
  linkText: 'Go shopping!'
}
</script>
<template>
  <div class="container-full">
    <div class="container">
      <Header />
      <div class="shopping-cart">
        <div class="shopping-cart-title">Shopping Cart</div>
        <div v-if="concatShoppingList.length === 0">
          <EmptyCartMessage :valueEmptyCart="valueEmptyCart" />
        </div>
        <div class="shopping-cart-list-container">
          <ul tag="ul" name="fade" class="shopping-cart-list">
            <li v-for="(bike, index) in concatShoppingList" :key="index" class="shopping-cart-item">
              <router-link :to="`/type/${bike.type}/id/${bike.idbike}`">
                <div class="shopping-cart-image">
                  <img :src="bike.src" alt="" />
                </div>
              </router-link>
              <div class="shopping-cart-item-body">
                <div class="shopping-cart-item-body-name">
                  {{ bike.brand }} {{ bike.model }} {{ bike.year }} {{ bike.wheel_diameter }}"
                </div>

                <div class="shopping-cart-item-body-price">
                  {{ numberWithSpaces(bike.price) }} ₴
                </div>
                <div class="shopping-cart-item-body-bottom">
                  <div class="shopping-cart-item-body-count">
                    <div
                      @click="countMinusPrice(bike.idbike, bike.price), bike.count--"
                      class="shopping-cart-item-body-count-minus count-button"
                    >
                      -
                    </div>
                    <div class="shopping-cart-item-body-count-num">{{ bike.count }}</div>
                    <div
                      @click="countPlusPrice(bike.idbike, bike.price), bike.count++"
                      class="shopping-cart-item-body-count-plus count-button"
                    >
                      +
                    </div>
                  </div>
                  <div
                    @click="store.removeBikeAndPrice(bike.idbike, bike.price)"
                    class="shopping-cart-item-body-button"
                  >
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M5.82907 7.48718H18.6325V20.1197C18.6325 21.2242 17.7371 22.1197 16.6325 22.1197H7.82907C6.7245 22.1197 5.82907 21.2242 5.82907 20.1197V7.48718Z"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M4 4.74353L20.4615 4.74353"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M14.9134 2H9.54816L8.57266 4.74359H15.8889L14.9134 2Z"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <line
                          x1="12.3163"
                          y1="11.2307"
                          x2="12.3163"
                          y2="18.376"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></line>
                        <line
                          x1="9.57266"
                          y1="11.2307"
                          x2="9.57266"
                          y2="18.376"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></line>
                        <line
                          x1="15.0598"
                          y1="11.2307"
                          x2="15.0598"
                          y2="18.376"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></line>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="concatShoppingList.length != 0" class="shopping-cart-final-price">
          <div class="shopping-cart-final-price-body">
            <div class="shopping-cart-final-price-body-title">Total price:</div>
            <div class="shopping-cart-final-price-body-price">
              {{ numberWithSpaces(store.finalPrice) }} ₴
            </div>
          </div>
          <router-link to="/make-an-order">
            <button
              @click="orderStore.getShoppingCart(concatShoppingList)"
              class="final-price-button bth-buy"
            >
              Order now
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <FooterInfo />
  </div>
</template>
<style lang="scss" scoped>
.shopping-cart {
  &-title {
    font-size: 26px;
    margin-block: 20px;
  }
  &-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    justify-items: center;
    gap: 10px;
    &-container {
      min-height: calc(100vh - 80px - 130px - 50px);
    }
  }
  &-item {
    display: flex;
    flex-direction: column;
    column-gap: 20px;
    align-items: center;
    max-width: 290px;
    width: 100%;
    max-height: 300px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: $box-shadow;
  }

  &-final-price {
    background-color: #47b3d4;
    padding-block: 20px;
    display: flex;
    column-gap: 10px;
    justify-content: end;
    align-items: center;
    border-radius: 5px;
    margin-block: 5px;
    padding-right: 20px;
    &-body {
      display: flex;
      column-gap: 10px;
      font-size: 18px;
      &-price {
        font-weight: 700;
      }
    }
  }
}
.shopping-cart-item-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  padding-inline: 10px;
  &-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-count {
    display: flex;
    align-items: center;

    &-num {
      display: flex;
      justify-content: center;
      width: 16px;
    }
  }
  &-price {
    font-size: 18px;
    font-weight: 700;
  }
}
.count-button {
  padding: 5px 10px;
  cursor: pointer;
}
.shopping-cart-image img {
  max-width: 280px;
  width: 100%;
  max-height: 170px;
  height: 100%;
  padding-block: 10px;
  object-fit: contain;
}

@media (max-width: 1260px) {
  .shopping-cart-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 1024px) {
  .shopping-cart-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .shopping-cart-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 524px) {
  .shopping-cart-list {
    grid-template-columns: repeat(1, 1fr);
  }
  .shopping-cart-final-price {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding-right: 0;
  }
}
</style>
