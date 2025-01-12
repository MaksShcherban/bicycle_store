<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  bikeData: Object
})

const query = ref('')

const queryBikes = computed(() => {
  return props.bikeData.filter(
    (item) =>
      (item.brand.toLowerCase() + ' ' + item.model.toLowerCase()).indexOf(
        query.value.toLowerCase()
      ) !== -1
  )
})
</script>

<template>
  <div class="search-data">
    <input
      class="search-data-input my-input"
      v-model.trim="query"
      @input="$emit('searchData', queryBikes)"
      type="text"
      placeholder="Search bike"
    />
  </div>
</template>
<style lang="scss" scoped>
.search-data {
  position: relative;
  &-input {
    padding: 5px;
    font-size: 16px;
    position: relative;
    padding-right: 30px;
    height: 40px;
  }
  &::after {
    content: '';
    display: flex;
    position: absolute;
    width: 20px;
    aspect-ratio: 1;
    background: url('/icon/search.png') center/contain no-repeat;
    top: 0.6em;
    right: 0.5em;
  }
}
</style>
