<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="col-5">
        <CardForm title="Card form">
          <template v-slot:body>
            <q-form class="row" :ref="formName" @submit="onSubmit">
              <InputField
                class="col-12"
                type="textarea"
                name="nombre"
                v-model="name"
                label="Text Area"
              />

              <InputField
                class="col-12"
                name="nombre"
                v-model="name"
                label="Text"
              />
              <InputDateField class="col-12" label="Date" />
              <SelectField
                class="col-12"
                label="Select"
                :options="options"
                v-model="single"
              >
              </SelectField>

              <SelectField
                class="col-12"
                label="Select Multiple"
                :options="options"
                multiple
                useChips
              />
              <InputToggleField label="Input Toggle Field"></InputToggleField>
            </q-form>
          </template>
          <template v-slot:buttons>
            <BtnCancel class="q-mr-sm" @click="$router.go(-1)" />
            <BtnAceptar :disable="!isValidForm" @click="sendObservation" />
          </template>
        </CardForm>
      </div>

      <div class="col-6">
        <span class="q-ma-md text-h6">Card Worker</span>
        <card-worker style="width: 100%"></card-worker>
      </div>
    </div>
  </q-page>
</template>

<script>
import mixinConfig from "components/modules/_mixinConfig/mixinConfig";
import mixinList from "components/modules/_mixinList/mixinList";
import mixinGrid from "components/baseComponents/grid/_mixinGrid/mixinGrid";
import mixinComponent from "components/modules/_mixinComponent/mixinComponent";
import CardForm from "src/components/baseComponents/cardForm/cardForm.vue";
import InputField from "src/components/baseComponents/inputs/inputField/inputField.vue";
import BtnCancel from "src/components/baseComponents/buttons/btnCancel.vue";
import BtnAceptar from "src/components/baseComponents/buttons/btnAceptar.vue";
import CardWorker from "src/components/baseComponents/cardWorker/cardWorker.vue";
import InputDateField from "src/components/baseComponents/inputs/inputDateField/inputDateField.vue";
import SelectField from "src/components/baseComponents/inputs/inputSelectField/selectField.vue";
import InputToggleField from "src/components/baseComponents/inputs/inputToggleField/inputToggleField.vue";

export default {
  name: "listAffectClasification",
  mixins: [mixinConfig, mixinList, mixinGrid, mixinComponent],
  components: {
    CardForm,
    InputField,
    BtnCancel,
    BtnAceptar,
    CardWorker,
    InputDateField,
    SelectField,
    InputToggleField,
  },
  data() {
    return {
      name: "",
      single: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {},
  computed: {},
};
</script>

<style lang="sass" scoped>
.my-card-height
  width: 100%
  height: 50%
.my-menu-link
  color: #212121
  background: #e6f1fc

.my-card
  transition-duration: 0.2s

.my-card:hover
  transform: translateZ(20px) scale(0.98)
</style>
