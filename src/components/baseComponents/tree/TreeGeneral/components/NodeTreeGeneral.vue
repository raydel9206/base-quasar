<template>
  <div class="row items-center">
    <q-icon v-show="nodeTree.node.icon!=undefined" :name="nodeTree.node.icon" color="dark" size="28px" class="q-mr-sm"/>

    <div class="row q-pa-xs">
      <div class="text-weight-bold text-dark">{{ nodeTree.node.name }}</div>
      <div class="bg-grey-2 text-teal">({{ nodeTree.node.type.name}})</div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "NodeTreeGeneral",
      props:['nodeTree']
    }
</script>

<style scoped>

</style>
