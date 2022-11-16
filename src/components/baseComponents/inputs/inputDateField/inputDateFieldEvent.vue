<template>
  <q-input
    freezer
    outlined
    dense
    :readonly="readonly"
    v-model="myValue"
    mask="####/##/##"
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
          <q-date v-model="myValue">
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                label="Cerrar"
                color="cyan-9"
                flat
                @click="fireEventInput"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>
import moment from "moment";

export default {
  name: "inputDateFieldEvent",

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
        "YYYY/MM/DD"
      );
    }
  },
  watch: {
    modelValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.myValue = this.dateFormat(new Date(newValue), "YYYY/MM/DD");
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
    click() {
      this.$emit("click");
    },
    fireEventInput() {
      if (this.freezer && this.modelValue) {
        this.myValue = this.dateFormat(new Date(this.modelValue), "YYYY/MM/DD");
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
      return moment(dateString, "YYYY/MM/DD").toDate().toString();
    },
  },
};
</script>
