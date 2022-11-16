<template>
  <window :active="showProput" :title="'Editar Texto'" @close="datos=this.modelValue">


    <template v-slot:body>

      <input-field label="Nombre"  v-model="datos" @keyup.enter="this.$emit('update:modelValue',datos)">

      </input-field>
    </template>
    <template v-slot:footer>
      <btn-aceptar @click="this.$emit('update:modelValue',datos)">
      </btn-aceptar>
      <btn-cancel @click="this.$emit('update:modelValue',modelValue),datos=this.modelValue"></btn-cancel>
    </template>
  </window>
</template>

<script>
  import Window from "../../../windows/window";
  import InputField from "../../../inputs/inputField/inputField";
  import BtnAceptar from "../../../buttons/btnAceptar";
  import BtnCancel from "../../../buttons/btnCancel";

  export default {
    name: "PoputEdit",
    components: {BtnCancel, BtnAceptar, InputField, Window},
    props: ['modelValue', 'showProput'],

    data() {
      return {
        datos: this.modelValue
      }
    },

      watch:{
     modelValue(newVal,oldVal){
       this.datos=newVal
      }
      }


  }
</script>

<style scoped>

</style>
