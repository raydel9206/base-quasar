<template>
  <q-select
    class="q-pl-sm q-pr-sm q-mt-md q-pb-md"
    outlined
    :ref="nameRef"
    :label="getLabel"
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
    :disable="isDisabled"
    dense
    :fill-input="fillInput"
    @input="fireEventInput"
    @filter="fireEventFilter"
    :clearable="clearable"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
    <template v-slot:after>
      <slot name="after"> </slot>
    </template>
  </q-select>
</template>

<script>
import mixinInput from "src/components/baseComponents/inputs/_mixin/mixinInput";
import config from "src/conf/conf.js";
import { api } from "boot/axios";

const services = config.api.services;

export default {
  name: "selectEnumField",
  mixins: [mixinInput],
  props: {
    enumServiceName: {
      type: String,
      required: true,
    },
    enumDepend: {
      type: Boolean,
      default: false,
    },
    depend: {
      type: [String, Object],
    },
    value: {
      type: [String, Object],
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
    clearable: {
      type: Boolean,
      default: false,
    },
    fillInput: {
      type: Boolean,
      default: false,
    },
    listSelect: {
      type: [Array, Object],
      default: null,
    },
    defineUrl: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    depend: function (newValue, oldValue) {
      if (
        oldValue &&
        typeof newValue === "object" &&
        typeof oldValue === "object"
      ) {
        if (newValue[this.optionValue] === oldValue[this.optionValue]) {
          return;
        }
      }
      if (newValue === oldValue) {
        return;
      }
      if (!newValue) {
        this.myValue = null;
      }
      this.loadEnums();
    },
  },
  data() {
    return {
      options: [],
      stringOptions: [],
    };
  },
  created() {
    if (this.enumServiceName) {
      this.loadEnums();
    }
  },
  computed: {
    isDisabled() {
      return this.disable || (this.enumDepend && !this.depend);
    },
    getUrlEnumService() {
      const params =
        this.enumDepend && this.depend
          ? `/${
              typeof this.depend === "object"
                ? this.depend[this.optionValue]
                : this.depend
            }`
          : "";
      return this.defineUrl
        ? this.enumServiceName
        : `${services.enums[this.enumServiceName]}${params}`;
    },
  },
  methods: {
    async loadEnums() {
      this.stringOptions =
        this.enumDepend && !this.depend
          ? []
          : await api
              .get(this.getUrlEnumService)
              .then((response) => response.data)
              .catch(() => []);
      if (this.listSelect) {
        this.temp = [];
        this.temp = this.stringOptions.filter((el) => {
          return !this.listSelect.find((element) => {
            return element.id === el.id;
          });
        });
        this.stringOptions = this.temp;
      }
      this.options = this.stringOptions;
    },
    fireEventFilter(val, update) {
      //update()
      this.inputValue = val;

      if (val === "") {
        update(() => {
          this.options = this.stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.stringOptions.filter(
          (v) => v[this.optionLabel].toLowerCase().indexOf(needle) > -1
        );
      });
      // if (val === "") {
      //   update(() => {
      //     this.options = this.stringOptions.map((user) => user);
      //   });
      // } else if (this.stringOptions.length === 0) {
      //   update(() => {
      //     this.options = [];
      //   });
      // } else {
      //   update(() => {
      //     this.options = this.stringOptions
      //       .map((user) => user)
      //       .filter((name) => {
      //         return (
      //           name.name && name.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
      //         );
      //       });
      //   });
      // }

      this.$emit("filter", val, update);
    },
  },
};
</script>
