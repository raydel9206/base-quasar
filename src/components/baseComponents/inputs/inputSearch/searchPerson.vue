<template>
  <input-field
    :ref="nameRef"
    :readonly="disable"
    label="Buscar carnet de identidad"
    counter
    required
    :maxlength="11"
    :rules="[(val) => { return /^\d{11}$/g.test(val) || 'Debe contener 11 dígitos'}]"
    @input="setValue"
  >
    <template v-slot:append>
      <q-icon v-show="activeSearch && !disable" color="ai-primary-dark" class="cursor-pointer" name="search" @click="searchCarnet()">
        <tooltip>Buscar carnet de identidad</tooltip>
<!--        <q-tooltip content-class="bg-primary" content-style="font-size: 16px" :offset="[10, 10]">-->
<!--          Buscar carnet de identidad-->
<!--        </q-tooltip>-->
      </q-icon>
      <q-icon v-show="value !== ''" class="cursor-pointer" color="ai-primary-dark" name="close" @click="cleanField">
        <tooltip>Limpiar campo</tooltip>
<!--        <q-tooltip content-class="bg-primary" content-style="font-size: 16px" :offset="[10, 10]">-->
<!--          Limpiar campo-->
<!--        </q-tooltip>-->
      </q-icon>
    </template>
  </input-field>
</template>

<script>
  import mixinSearch from '../_mixin/mixinSearch'
  import inputField from "components/baseComponents/inputs/inputField/inputField";
  import conf from "src/conf/conf";
  import {mapState} from "vuex";
  import Tooltip from "components/baseComponents/tooltip/tooltip";

  export default {
    name: 'searchPerson',
    mixins: [mixinSearch],
    components: {
      Tooltip,
      inputField
    },
    props: {
      edit: {
        type: Boolean
      },
      ci: {
        type: String
      }
    },
    data() {
      return {
        force: true
      }
    },
    computed: {
      ...mapState('admin', ['ci']),
      getServiceIdentity() {
        return conf.api.services.ci
      }
    },
    watch: {
      ci: function (newCi, oldCi){
        this.$refs.refInputField.setValue(newCi)
        //this.searchCarnet()
      }

    },
    methods: {
      setValue(value){
        this.value = value
      },
      getValue(){
        return this.value
      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     this.$refs.refInputField.$el.focus()
      //   }, 200)
      // })
    }
  }
</script>
