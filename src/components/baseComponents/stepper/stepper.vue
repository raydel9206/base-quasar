<template>
  <q-stepper
    v-model="myStep"
    vertical
    flat
    class="bg-grey-1 ap-primary"
    animated
  >
    <q-step
      v-for="(step, index) in steps"
      :key="index"
      :name="step.name"
      :prefix="step.prefix"
      :title="step.title"
      :icon="step.icon"
      :done="myStep > index + 1"
    >
    </q-step>
  </q-stepper>
</template>

<script>
import mixinBaseComponent from "src/components/baseComponents/_mixinBaseComponent/mixinBaseComponent";
export default {
  name: "add-stepper",
  mixins: [mixinBaseComponent],
  props: {
    steps: {
      type: Array,
      default: () => [], //name,prefix,tittle, icon
    },
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      myStep: this.modelValue,
    };
  },
  watch: {
    myStep(newValue) {
      this.$emit("update:modelValue", newValue);
    },
    modelValue(newValue) {
      if (newValue != this.myStep) {
        this.myStep = newValue;
      }
    },
  },

};
</script>
<style lang="sass" scoped></style>
