export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      data: {},
    };
  },
  created() {
   
    if (this.modelValue) {
      this.data = this.modelValue;
    }
  },
  watch: {
    modelValue: {
      deep: true,
      handler(newValue, oldValue) {
         
        if (newValue !== oldValue) {
          this.data = newValue;
        }
      },
    },
    data: {
      deep: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.fireEventInput();
        }
      },
    },
  },
  methods: {
    fireEventInput() {
      this.$emit("update:modelValue", this.data);
    },
  },
};