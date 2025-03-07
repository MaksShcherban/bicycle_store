import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useShoppingStore = defineStore('shopping', () => {
  const bikesCartLocalStorage = JSON.parse(localStorage.getItem('bikesCart') ?? '[]')
  const finalPriceLocalStorage = JSON.parse(localStorage.getItem('finalPrice') ?? 0)
  const bikeID = ref(bikesCartLocalStorage)
  const finalPrice = ref(finalPriceLocalStorage)
  function getBikeID(id) {
    if (bikeID.value.length >= 1) {
      let even = bikeID.value.some((item) => {
        return item.id - id === 0
      })
      if (even) {
        bikeID.value.forEach((item) => {
          if (item.id === id) {
            item.count++
          }
        })
      } else {
        bikeID.value.push({ id: id, count: 1 })
      }
    } else {
      bikeID.value.push({ id: id, count: 1 })
    }
    localStorage.setItem('bikesCart', JSON.stringify(bikeID.value))
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
    localStorage.setItem('bikesCart', JSON.stringify(bikeID.value))
    localStorage.setItem('finalPrice', JSON.stringify(finalPrice.value))
  }

  function getPrice(price) {
    finalPrice.value += price
    localStorage.setItem('finalPrice', JSON.stringify(finalPrice.value))
  }
  function subtractPrice(price) {
    finalPrice.value -= price
    localStorage.setItem('finalPrice', JSON.stringify(finalPrice.value))
  }

  function countPlus(id) {
    bikeID.value.forEach((item) => {
      if (item.id === id) {
        item.count++
      }
    })
    localStorage.setItem('bikesCart', JSON.stringify(bikeID.value))
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
    localStorage.setItem('bikesCart', JSON.stringify(bikeID.value))
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
