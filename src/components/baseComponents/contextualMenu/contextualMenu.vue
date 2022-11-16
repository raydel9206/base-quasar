<template>
  <q-menu
    max-width="15rem"
    touch-position
    context-menu
  >
    <template v-slot:default>
      <slot name="default"></slot>
    </template>

  </q-menu>
</template>

<script>
    export default {
        name: "contextualMenu",
    }
</script>

<style scoped>

</style>
