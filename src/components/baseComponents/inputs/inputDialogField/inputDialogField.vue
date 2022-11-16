<template>
  <input-field v-model="myValue">
    <template v-slot:append>
      <q-icon :name="icon" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <window-select>
            <template v-slot:body>
              <slot name="body" />
            </template>
          </window-select>
        </q-popup-proxy>
      </q-icon>
    </template>
  </input-field>
</template>
<script>
import inputField from "src/components/baseComponents/inputs/inputField/inputField";
import WindowSelect from "src/components/baseComponents/windows/windowSelect";
import mixinInput from 'src/components/baseComponents/inputs//_mixin/mixinInput';

export default {
  components: { inputField, WindowSelect },
  name: "inputDialogField",
  mixins:[mixinInput],
  props: {
    value: {
      type: Array,
      default: () => [0, 0],
    },
    icon: {
      type: String,
      default: "menu",
    },
  },
 
  methods: {},
};
</script>
<style lang="sass" scoped></style>
