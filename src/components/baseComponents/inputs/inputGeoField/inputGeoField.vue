<template>
  <maps v-if="showMap" v-model="coord" @close='showMap= false'/>
  <input-field v-model="coord" :label="label" :name='name'>

  
    <template v-slot:append>
      <q-icon name="place" class="cursor-pointer" @click="showMap = true" />
    </template>
  </input-field>
</template>
<script>
import inputField from "src/components/baseComponents/inputs/inputField/inputField";

import maps from "src/components/baseComponents/map/maps";
import mixinInput from "src/components/baseComponents/inputs/_mixin/mixinInput";

export default {
  components: { maps, inputField },
  mixins: [mixinInput],
  name: "inputGeoField",
  props: {
    modelValue: {
      type: Array,
      default: () => [22.9789771, -82.2842982],
    },
  },
  data() {
    return {
      showMap: false,
      coord: this.modelValue,
    };
  },
  methods: {},
  
};
</script>
<style lang="sass" scoped></style>
