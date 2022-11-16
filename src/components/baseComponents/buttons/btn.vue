<template>
  <q-btn
    :label="getLabel"
    :color="color"
    :disable="disable"
    :outline="outline"
    :icon="icon"
    :round="round"
    :rounded="rounded"
    :size="size"
  >
    <tooltip v-if="tooltip" :text="tooltip" />
  </q-btn>
</template>

<script>
import mixinBtn from "./mixin/mixinBtn";

export default {
  name: "BtnCmp",
  mixins: [mixinBtn],
};
</script>
