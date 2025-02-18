<script setup></script>
<template>
  <div class="empty-cart">
    <p>Cart is empty, add to cart any product to it</p>
    <router-link to="/">Go shopping!</router-link>
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
