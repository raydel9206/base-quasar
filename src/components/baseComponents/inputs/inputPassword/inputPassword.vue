<template>
  <input-field
    :type="isPwd ? 'password' : 'text'"
    :label="label"
    :rules="rules"
    :disable="disable"
    :original-value="value"
    lazy-rules
    ref="nameRefPassword"
    @input="fireEvent('input')"
    counter
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </input-field>
</template>


<script>
import mixinBaseComponent from "components/baseComponents/_mixinBaseComponent/mixinBaseComponent";
import mixinInput from "components/baseComponents/inputs/_mixin/mixinInput";
import inputField from "components/baseComponents/inputs/inputField/inputField";

export default {
  name: "password",
  mixins: [mixinInput, mixinBaseComponent],
  components: {
    inputField
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => {}
    },
    originalValue: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      isPwd: true
    }
  },
  methods: {
    getValue(){
      return this.$refs.nameRefPassword.myValue
    },
    validate(){
      return this.$refs.nameRefPassword.validate()
    }
  }
}
</script>

<style scoped>

</style>
