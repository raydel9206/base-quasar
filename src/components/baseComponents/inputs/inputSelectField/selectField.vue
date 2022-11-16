<template>
  <q-select
    :class="classField"
    map-options
    outlined
    clearable
    :ref="nameRef"
    :label="label"
    :name="name"
    :multiple="multiple"
    :option-value="optionValue"
    :options="options"
    :use-input="useInput"
    :use-chips="useChips"
    :hide-selected="hideSelected"
    :option-label="optionLabel"
    v-model="myValue"
    :rules="getRules"
    color="ai-primary-dark"
    bg-color="white"
    :required="required"
    dense
    :disable="disable"
    @input="fireEventInput"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="useSlotOption" v-slot:option="scope">
      <slot name="option" v-bind:scope="{ ...scope }"></slot>
    </template>
  </q-select>
</template>

<script>
import mixinInput from "src/components/baseComponents/inputs/_mixin/mixinInput";

export default {
  name: "selectField",
  mixins: [mixinInput],
  props: {
    value: {
      type: [String, Object, Array],
    },
    options: {
      type: Array,
      default: () => [],
    },
    useInput: {
      type: Boolean,
    },
    useChips: {
      type: Boolean,
    },
    hideSelected: {
      type: Boolean,
    },
    inputDebounce: {
      type: String,
    },
    optionValue: {
      type: String,
    },
    optionLabel: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    useSlotOption: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    fireEventFilter(val, update) {
      this.$emit("filter", { value: val, update: update });
    },
  },
};
</script>
