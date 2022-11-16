<template>
  <q-input
    :class="classField"
    outlined
    :ref="nameRef"
    :name="name"
    :type="type"
    :label="getLabel"
    color="ai-primary-dark"
    :suffix="suffix"
    v-model="myValue"
    :value="myValue"
    :mask="mask"
    :disable="disable"
    :required="required"
    :rules="getRules"
    dense
    :min="min"
    :max="max"
    :maxValues="max"
    :filled="filled"
    :hint="hint"
    :counter="counter"
    :maxlength="maxlength"
    :readonly="readonly"
    :autogrow="autogrow"
    :placeholder="placeholder"
    bg-color="white"
    @click="fireEventClick"
    @keyup.enter="keyPressEnter"
  >
    <slot></slot>
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
  </q-input>
</template>

<script>
import mixinField from "src/components/baseComponents/inputs/_mixin/mixinInput";

export default {
  name: "inputField",
  mixins: [mixinField],
  props: {
    type: {
      type: String,
    },
    label: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
    },
    rules: {
      type: Array,
      default: () => {},
    },
    mask: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    counter: {
      type: Boolean,
      default: false,
    },
    freezer: {
      type: Boolean,
      default: false,
    },
    min: {
      type: [String, Number],
    },
    max: {
      type: [String, Number],
    },
    maxlength: {
      type: [String, Number],
    },
    autogrow: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
  },
};
</script>
