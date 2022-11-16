<template>
  <q-dialog persistent v-model="seamless" seamless position="bottom">
    <q-card class="my-card" bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Coordenadas</div>
        <div class="q-gutter-md">
          <input-field v-model="data.lat" label="Latitud"> </input-field>
          <input-field v-model="data.lng" label="Longitud"> </input-field>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <btn-cancel />
        <btn-aceptar @click="acept()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import mixinBaseComponent from "src/components/baseComponents/_mixinBaseComponent/mixinBaseComponent";
import BtnAceptar from "../../buttons/btnAceptar.vue";
import BtnCancel from "../../buttons/btnCancel.vue";
import inputField from "../../inputs/inputField/inputField.vue";

export default {
  mixins: [mixinBaseComponent],
  components: { inputField, BtnAceptar, BtnCancel },
  name: "location-windows",
  props: {
    modelValue: {
      type: Array,
      //default: () => [0, 0]
    },
  },
  data() {
    return {
      data: {
        lat: this.modelValue[0],
        lng: this.modelValue[1],
      },
      seamless: true,
    };
  },
  methods: {
    acept() {
      this.seamless= false
      this.$emit("acept", [this.data.lat, this.data.lng]);
    },
  },
  watch: {
    modelValue: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue) {
        this.data.lat = newValue[0];
        this.data.lng = newValue[1];
      },
    },
    data: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue) {
        this.$emit("update:modelValue", [newValue.lat, newValue.lng]);
      },
    },
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
