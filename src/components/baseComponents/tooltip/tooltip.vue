<template>
  <q-tooltip :class="contentClass" content-style="font-size: 13px"
    ><slot>{{ text }}</slot></q-tooltip
  >
</template>

<script>
export default {
  name: "tooltipCmp",
  props: {
    text: {
      type: String,
    },
    contentClass: {
      type: String,
      default: "bg-ap-secondary",
    },
  },
};
</script>
