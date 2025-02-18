import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useShoppingStore = defineStore('shopping', () => {
  const bikeID = ref([])
  const finalPrice = ref(0)
  function getBikeID(id) {
    if (bikeID.value.length >= 1) {
      let even = bikeID.value.some((item) => {
        // console.log('id===')
        return item.id - id === 0
      })
      if (even) {
        bikeID.value.forEach((item) => {
          if (item.id === id) {
            item.count++
            // console.log('count++')
          }
        })
      } else {
        // console.log('else count ++')
        bikeID.value.push({ id: id, count: 1 })
      }
    } else {
      // console.log('else array < 1')
      bikeID.value.push({ id: id, count: 1 })
    }
  }
  function removeBikeAndPrice(id, price) {
    bikeID.value.forEach((item, index) => {
      if (item.id === id) {
        // console.log('current item:', item)
        if (id && price) {
          finalPrice.value = finalPrice.value - price * item.count
          bikeID.value.splice(index, 1)
        } else {
          bikeID.value.splice(index, 1)
        }
      }
    })
  }

  function getPrice(price) {
    finalPrice.value += price
  }
  function subtractPrice(price) {
    finalPrice.value -= price
  }

  function countPlus(id) {
    bikeID.value.forEach((item) => {
      if (item.id === id) {
        item.count++
      }
    })
  }
  function countMinus(id) {
    bikeID.value.forEach((item) => {
      if (item.id === id) {
        item.count--
        if (item.count === 0) {
          removeBikeAndPrice(id)
        }
      }
    })
  }

  return {
    bikeID,
    finalPrice,
    getBikeID,
    getPrice,
    subtractPrice,
    removeBikeAndPrice,
    countPlus,
    countMinus
  }
})
