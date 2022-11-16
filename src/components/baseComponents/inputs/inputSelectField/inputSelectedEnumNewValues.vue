<template>
    <window-confirm
   
      :ref="nameRefConfirmDelete"
      text="Desea eliminar el elemento seleccionado?"
      icon="delete"
      @confirm="confirmDelete"
    ></window-confirm>
  <q-select
    class="q-pl-sm q-pr-sm q-mt-md q-pb-md"
    outlined
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
    :disable="isDisabled"
    dense
    :fill-input="add"
    @input="fireEventInput"
    @filter="fireEventFilter"
    :clearable="clearable"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:after>
      <slot name="after">
        <q-btn
          v-if="showAddIcon"
          size="xs"
          dense
          outline
          round
          icon="add"
          @click="addInput()"
        />
      </slot>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" class="item">
        <q-item-section>
          <q-item-label>{{ scope.opt[optionLabel] }}</q-item-label>
        </q-item-section>
        <q-item-section side class="delete-left">
          <q-btn
            flat
            round
            color="red"
            icon="delete"
            @click="$event.stopPropagation(), deleteData(scope.opt)"
        /></q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import mixinInput from "src/components/baseComponents/inputs/_mixin/mixinInput";
import mixinList from 'src/components/modules/_mixinList/mixinList'
import config from "src/conf/conf.js";
import { api } from "boot/axios";

const services = config.api.services;

export default {
  name: "selectEnumFieldNewValues",
  mixins: [mixinInput,mixinList],

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
    modelValue: {
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
    add: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      options: [],
      stringOptions: [],

      inputValue: null,
     elementText: 'elemento',
           
        
    };
  },
  created() {
    if (this.enumServiceName) {
      this.loadEnums();
    }
  },
  computed: {
    isDisabled() {
      return this.disable; //|| (this.enumDepend && !this.depend);
    },

    showAddIcon() {
      return (
        this.add &&
        this.inputValue &&
        this.inputValue != "" &&
        this.options.filter(
          (v) =>
            v[this.optionLabel].toLowerCase() === this.inputValue.toLowerCase()
        ).length == 0
      );
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
      return `${services.enums[this.enumServiceName]}${params}`;
    },
  },
watch:{

  myValue: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue) {
       this.fireEventInput(newValue)
      },
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

      let a = this.label;
      this.options = this.stringOptions;
    },

    fireEventFilter(val, update) {
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

      this.$emit("filter", val, update);
    },
    deleteData(x) {
        this.selected.push(x)
     this.showWindowConfirmDelete()
    },
    async addInput() {
      let data = {};
      data[this.optionLabel] = this.inputValue;
      await api
        .post(this.getUrlEnumService, data)
        .then((response) => response.data)
        .catch(() => []);
      await this.loadEnums();
      let needle = this.inputValue.toLowerCase();
      this.options = this.stringOptions.filter(
        (v) => v[this.optionLabel].toLowerCase() === needle
      );

      // next function is available in Quasar v1.7.4+;
      // "ref" is the Vue reference to the QSelect

      let ref = this.$refs[this.nameRef];
   
      if (
        this.inputValue !== "" &&
        ref.options.length > 0 &&
        (ref.optionIndex === -1 || ref.optionIndex == null)
      ) {
        // ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
        ref.toggleOption(this.options[0], true); // toggle the focused option
  
      fireEventInput(this.options[0])
      }
    },
    getUrlDelete (items) {
      const path = Array.isArray(items) ? items.map(item => item.id).join(',') : items.id
      return `${this.getUrlEnumService}/${path}`
    },
      async delItem (items) {
      this.$q.loading.show({ ...this.maskOptions, message: `Eliminando ${this.elementText.toLowerCase()}...` })

      const urlService = this.getUrlDelete(items)

      const result = await api.delete(urlService).then(result => result)
        .catch((reason) => {
          return { status: reason.response.status }
        })
        .finally(() => {
          this.$q.loading.hide()
        })

      let configMessage = {
        type: 'success',
        message: `${this.elementText} eliminado satisfactoriamente`
      }
      switch (result.status) {
        case 400:
        case 409:
        case 404:
          configMessage = { type: 'fail', message: `No se pudo eliminar el ${this.elementText.toLowerCase()}` }
          break
        case 200:
        case 201:
           this.loadEnums();
      }
      this.selected=[]
      this.$q.notify(configMessage)
    },
      fireEventInput(data) {
      this.$emit("update:modelValue",data);
    },
    

  },
};
</script>

<style lang="sass" scoped>
.item:hover .delete-left
  display: block

.delete-left
  display: none
</style>
