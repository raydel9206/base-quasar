<template>
  <input-field
    freezer
    :readonly="readonly"
    v-model="myValue"
    mask="##-##-####"
    :label="label"
    :required="required"
    :name="name"
    :disable="disable"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <dateElement v-model="myValue" :option="option" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </input-field>
</template>
<script>
import inputField from "src/components/baseComponents/inputs/inputField/inputField";
import dateElement from "src/components/baseComponents/date/date";
import moment from "moment";

export default {
  components: { inputField, dateElement },
  name: "inputDateField",
  //mixins: [mixinInput],

  props: {
    name: {
      type: String,
    },

    modelValue: {
      type: String,
    },
    label: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    option: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myValue: null,
      nameRef: "refInputDateField",
    };
  },
  mounted() {
    if (this.modelValue) {
      this.myValue = this.myValue = this.dateFormat(
        new Date(this.modelValue),
        "DD-MM-YYYY"
      );
    }
  },
  watch: {
    modelValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.myValue = this.dateFormat(new Date(newValue), "DD-MM-YYYY");
      }
    },
    myValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fireEventInput();
      }
    },
  },
  emits: ["update:modelValue"],
  methods: {
    fireEventInput() {
      if (this.freezer && this.modelValue) {
        this.myValue = this.dateFormat(new Date(this.modelValue), "DD-MM-YYYY");
      }
      this.$emit("update:modelValue", this.dateObject(this.getValue()));
      this.$emit("change", this.dateObject(this.getValue()));
    },
    getValue() {
      return this.myValue;
    },
    dateFormat(timeStamp, format) {
      return moment(timeStamp).format(format);
    },
    dateObject(dateString, format) {
      return moment(dateString, "DD-MM-YYYY").toDate().toString();
    },
  },
};
</script>
