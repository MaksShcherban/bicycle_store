<script setup>
import { ref } from 'vue'
const benefitsList = ref([
  {
    id: 1,
    src: '/images/benefits/free-delivery-free-svgrepo-com.png',
    title: 'Free delivery',
    subtitle: 'to Ukraine',
    alt: 'Free delivery'
  },
  {
    id: 2,
    src: '/images/benefits/official-warranty.png',
    title: 'official warranty',
    subtitle: 'from the manufacturer',
    alt: 'official warranty'
  },
  {
    id: 3,
    src: '/images/benefits/payment.png',
    title: 'Payment by installments',
    subtitle: '0% installment plan',
    alt: 'Payment by installments'
  },
  {
    id: 4,
    src: '/images/benefits/barter.png',
    title: '365 days',
    subtitle: 'exchange of goods',
    alt: 'Barter system '
  }
])
</script>
<template>
  <div class="benefits">
    <ul class="benefits-list">
      <li class="benefits-item" v-for="item in benefitsList" :key="item.id">
        <img class="benefits-item-image" :src="item.src" :alt="item.alt" />
        <div class="benefits-item-text">
          <div class="benefits-item-title">{{ item.title }}</div>
          <div class="benefits-item-subtitle">{{ item.subtitle }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.benefits {
  margin-top: 30px;
  margin-bottom: 30px;
  &-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    row-gap: 15px;
  }
  &-item {
    display: flex;
    align-items: center;
    text-align: left;
    column-gap: 20px;
    width: 300px;
    margin: 0 auto;
    &-title {
      font-family: $font-family-accent;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0.25px;
      font-weight: 700;
    }
    &-subtitle {
      font-family: $font-family-base;
      font-size: 14px;
    }
    &-image {
      width: 100px;
    }
  }
}

@media (max-width: 1250px) {
  .benefits-list {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 630px) {
  .benefits-list {
    grid-template-columns: 1fr;
  }
  .benefits-item {
    width: 250px;
  }
  .benefits-item-image {
    width: 80px;
  }
}
</style>
