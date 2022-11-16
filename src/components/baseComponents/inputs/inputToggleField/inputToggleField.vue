<template>
  <q-toggle
    class="q-pl-sm q-pr-sm"
    :class="classField"
    :ref="nameRef"
    :name="name"
    :label="label"
    v-model="myValue"
    :required="required"
    :disable="disable"
    checked-icon="check"
    unchecked-icon="clear"
    :color="activeColor"
    :toggle-indeterminate="toggleIndeterminate"
    keep-color
    dense
    @input="fireEventInput"
  ><slot /></q-toggle>
</template>

<script>
import mixinField from 'src/components/baseComponents/inputs/_mixin/mixinInput'

export default {
  name: 'inputToggleField',
  mixins: [mixinField],
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean
    },
    activeColor: {
      type: String,
      default: 'ap-secondary'
    },
    classField: {
      type: String,
      default: ''
    },
    toggleIndeterminate: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.value !== null) {
      this.myValue = this.value
    }
  }
}
</script>
