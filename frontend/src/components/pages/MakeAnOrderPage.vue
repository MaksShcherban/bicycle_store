<script setup>
import Header from '../Header.vue'
import EmptyCartMessage from '../EmptyCartMessage.vue'
import FooterInfo from '../FooterInfo.vue'
import { useOrderStore } from '@/stores/orderStore'
import { useShoppingStore } from '@/stores/shoppingCart'
import { numberWithSpaces } from '@/utils/numberWithSpaces'
import { onMounted, ref, Teleport } from 'vue'

onMounted(() => {
  let currentBikeIDArrayOrder = orderStore.order.map((item) => {
    return item.idbike
  })
  let currentBikeIDArrayShopping = shoppingStore.bikeID.map((item) => {
    return item.id
  })
  if (JSON.stringify(currentBikeIDArrayShopping) !== JSON.stringify(currentBikeIDArrayOrder)) {
    orderStore.clearOrder()
  }
})

const orderStore = useOrderStore()
const shoppingStore = useShoppingStore()

const valueName = ref('')
const valueSurname = ref('')
const valueEmail = ref('')
const valuePhone = ref('')

const countClickToPhoneInp = ref(0)

const valueCity = ref('')
const valueNumberPost = ref()
const valueCallBack = ref(Boolean(false))

const firstFormActive = ref(Boolean(true))

const open = ref(false)

let teleportTitle = 'Fill in all the blanks, or check current value'

const changeDefaultValue = () => {
  countClickToPhoneInp.value++

  if (countClickToPhoneInp.value <= 1 || valuePhone.value === '') {
    valuePhone.value = '+38'
  }
  console.log(countClickToPhoneInp.value)
}

const removeValueInput = () => {
  if (valuePhone.value.length < 4) {
    valuePhone.value = ''
  }
}
const changeWindowForm = () => {
  if (
    valueName.value != '' &&
    valueSurname.value != '' &&
    valueEmail.value.includes('@') &&
    valuePhone.value.length === 13
  ) {
    firstFormActive.value = false
    open.value = false
  } else {
    open.value = true
  }
}
const buttonBack = () => {
  firstFormActive.value = true
}

const url = `http://localhost:3000/order`

const submitOrderForm = async () => {
  if (valueCity.value != '' && valueNumberPost.value != '') {
    const objectOrder = {
      orderID: Number(String(Date.now()).slice(4)),
      name: valueName.value,
      surname: valueSurname.value,
      email: valueEmail.value,
      phone: valuePhone.value,
      city: valueCity.value,
      num_post: valueNumberPost.value,
      call_back: valueCallBack.value,
      productID: orderStore.order
    }
    console.log(JSON.stringify(objectOrder))
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(objectOrder)
    })
    let result = await response.json()
    teleportTitle = result.message
    orderStore.clearOrder()
    open.value = true
  } else {
    open.value = true
  }
}

const valueEmptyCart = {
  paragraph: 'Go and place an order in the shopping cart ',
  link: '/shopping-cart',
  linkText: 'Go to cart!'
}
</script>

<template>
  <div class="container-full">
    <div class="container">
      <Header />
      <div class="container-order">
        <div v-if="orderStore.order.length === 0">
          <EmptyCartMessage :valueEmptyCart="valueEmptyCart" />
        </div>
        <div v-else class="order">
          <div class="order-title">Place your order</div>
          <div class="order-info">
            <form
              v-if="firstFormActive"
              :class="{ activeFirst: firstFormActive }"
              class="order-info-form"
            >
              <label for="inp-name">Name</label>
              <input v-model="valueName" type="text" id="inp-name" placeholder="Enter name" />
              <label for="inp-surname">Surname</label>
              <input
                v-model="valueSurname"
                type="text"
                id="inp-surname"
                placeholder="Enter surname"
              />
              <label for="inp-email">Email</label>
              <input v-model="valueEmail" type="email" id="inp-email" placeholder="Enter email" />
              <label for="inp-phone">Phone</label>
              <input
                v-model="valuePhone"
                type="tel"
                id="inp-phone"
                placeholder=" +38 (0__) ___-__-__"
                maxlength="13"
                @focus.passive="changeDefaultValue"
                @blur="removeValueInput"
              />
              <button @click.prevent="changeWindowForm" class="button-form bth-buy">Next</button>
            </form>
            <form v-else class="order-info-form">
              <label for="inp-city">City</label>
              <input v-model="valueCity" type="text" id="inp-city" placeholder="Enter city" />
              <label for="inp-post-office">Number Nova Post Office</label>
              <input
                v-model="valueNumberPost"
                type="number"
                id="inp-post-office"
                placeholder="Enter post office"
              />
              <div class="block-input-call-back">
                <label for="inp-call-back">Call back for confirmation </label>
                <input v-model="valueCallBack" id="inp-call-back" type="checkbox" />
              </div>
              <div @click="buttonBack()" class="button-back my-button">Back</div>
              <button @click.prevent="submitOrderForm" class="button-form bth-buy">Confirm</button>
            </form>
            <div class="order-info-products">
              <ul class="order-info-list">
                <li v-for="item in orderStore.order" :key="item.idbike" class="order-info-item">
                  <img :src="item.src" alt="product src" />
                  <div class="order-info-item-name">
                    <span
                      >{{ item.brand }} {{ item.model }} {{ item.wheel_diameter }}"
                      {{ item.year }}</span
                    >
                  </div>
                  <div class="order-info-item-count-price">
                    <div class="order-info-item-count">
                      Quantity - <span>{{ item.count }}</span>
                    </div>
                    <div class="order-info-item-price">
                      <span>{{ numberWithSpaces(item.price) }} ₴</span>
                    </div>
                  </div>
                </li>
                <div class="order-info-block-price">
                  <router-link to="/shopping-cart" class="order-info-block-edit"
                    >Edit order</router-link
                  >
                  <div class="order-info-final-price">
                    Total price: <span>{{ numberWithSpaces(shoppingStore.finalPrice) }} ₴</span>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <Teleport to="body">
          <div v-if="open" class="modal">
            <p>{{ teleportTitle }}</p>
            <button class="button-ok my-button" @click="open = false">Ok</button>
          </div>
        </Teleport>
      </div>
    </div>
    <FooterInfo />
  </div>
</template>
<style lang="scss" scoped>
.modal {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  z-index: 999;
  top: 40%;
  left: calc(50% - 150px);
  width: 300px;
  background-color: $bg-color-header;
}
.order {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &-title {
    font-size: 24px;
    padding-block: 10px;
    font-family: $font-family-accent;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    & span {
      font-weight: 700;
    }
    &-list {
      margin-inline: 20px;
    }
    &-form {
      display: flex;
      flex-direction: column;
      align-items: normal;

      padding: 20px;
      padding-block: 20px;
      max-width: 300px;
      width: 100%;

      & input {
        width: 100%;
        margin-bottom: 10px;
      }
    }
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 50px;

      width: 100%;
      box-shadow: $box-shadow;
      border-radius: 20px;
      background-color: #fff;
      padding-right: 10px;
      margin-bottom: 15px;

      & img {
        width: 200px;
        padding: 10px;
      }
      &-count-price {
        display: flex;
        column-gap: 20px;
      }
      &-count {
        display: flex;
        column-gap: 10px;
      }
    }
    &-block-price {
      display: flex;
      justify-content: space-between;
    }
  }
}
.button-form {
  max-width: 300px;
  font-weight: 700;
  box-shadow: $box-shadow;
  border-radius: 5px;
}
.button-ok {
  max-width: 100px;
  width: 100%;
  font-weight: 700;
  box-shadow: $box-shadow;
}
.button-back {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 700;
  box-shadow: $box-shadow;
  cursor: pointer;
  margin-top: 20px;
}

.block-input-call-back {
  display: flex;
  justify-content: left;
  align-items: center;
  & input {
    display: flex;
    margin: 0;
    justify-content: left;
    width: 20px;
  }
  & label {
    max-width: 250px;
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .order-info {
    flex-direction: column-reverse;
    row-gap: 20px;

    &-list {
      display: flex;
      flex-direction: column;

      align-items: center;
    }
    &-block-price {
      max-width: 800px;
      width: 100%;
    }
    &-form {
      max-width: none;
      padding: 20px;
      & input {
        max-width: none;
      }
    }
  }
  .button-form {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .order-info-item {
    column-gap: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-block: 10px;
    &-name {
      font-size: 15px;
    }
    &-count-price {
      font-size: 15px;
    }
    & img {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 3;
      width: 170px;
    }
  }
}
@media (max-width: 470px) {
  .order-info-item {
    grid-template-columns: repeat(1, 1fr);

    justify-items: center;
    & img {
      width: 200px;
    }
  }
}
</style>
