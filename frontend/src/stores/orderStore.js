import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useOrderStore = defineStore('order', () => {
  const order = ref([])

  function getShoppingCart(array) {
    order.value = array
  }
  return { order, getShoppingCart }
})
