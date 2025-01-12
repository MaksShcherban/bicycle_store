<script setup>
const props = defineProps({
  breadCrumbs: Object,
  breadCrumbsType: String,
  breadCrumbsBrand: String
})
</script>

<template>
  <div class="breadcrumbs">
    <router-link to="/"> Main </router-link>
    <div v-if="props.breadCrumbs">
      <router-link :to="`/type/` + props.breadCrumbs.type.toLowerCase()">
        / {{ props.breadCrumbs.type }}
      </router-link>
      <router-link :to="`/brand/` + props.breadCrumbs.brand.toLowerCase()">
        / {{ props.breadCrumbs.brand }}
      </router-link>
      <router-link
        :to="
          `/type/` +
          props.breadCrumbs.type.toLowerCase() +
          `/brand/` +
          props.breadCrumbs.brand.toLowerCase()
        "
      >
        / {{ props.breadCrumbs.type }} {{ props.breadCrumbs.brand }}
      </router-link>
    </div>
    <div v-else>
      <router-link
        v-if="props.breadCrumbsType"
        :to="`/type/` + props.breadCrumbsType.toLowerCase()"
      >
        / {{ props.breadCrumbsType }}
      </router-link>
      <router-link
        v-if="props.breadCrumbsBrand"
        :to="`/brand/` + props.breadCrumbsBrand.toLowerCase()"
      >
        / {{ props.breadCrumbsBrand }}
      </router-link>
      <router-link
        v-if="props.breadCrumbsType && props.breadCrumbsBrand"
        :to="
          `/type/` +
          props.breadCrumbsType.toLowerCase() +
          `/brand/` +
          props.breadCrumbsBrand.toLowerCase()
        "
      >
        / {{ props.breadCrumbsType }} {{ props.breadCrumbsBrand }}
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.breadcrumbs {
  display: flex;
  font-family: $font-family-base;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
