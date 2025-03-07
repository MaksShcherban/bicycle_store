import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useOrderStore = defineStore('order', () => {
  const orderLocalStorage = JSON.parse(localStorage.getItem('orderStorage') ?? '[]')
  const order = ref(orderLocalStorage)

  function getShoppingCart(array) {
    order.value = array
    localStorage.setItem('orderStorage', JSON.stringify(order.value))
  }
  function clearOrder() {
    order.value = []
    localStorage.setItem('orderStorage', JSON.stringify(order.value))
  }
  return { order, getShoppingCart, clearOrder }
})
