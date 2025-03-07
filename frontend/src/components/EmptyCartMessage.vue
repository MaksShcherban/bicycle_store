<script setup>
const props = defineProps({
  valueEmptyCart: Object
})
</script>
<template>
  <div class="empty-cart">
    <p>{{ props.valueEmptyCart.paragraph }}</p>
    <router-link :to="props.valueEmptyCart.link">{{ props.valueEmptyCart.linkText }}</router-link>
  </div>
</template>
<style lang="scss">
.empty-cart {
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 40%;
  left: calc(50% - 150px);
  width: 300px;
  padding: 20px;
  background-color: $bg-color-header;
  border-radius: 20px;
}
</style>
