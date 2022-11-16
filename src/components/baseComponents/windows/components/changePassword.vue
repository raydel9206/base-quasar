<template>
  <q-dialog v-model="activeWindow" persistent :full-width="fullWidth" @show="fireEventShow" @before-hide="hide">
    <q-card style="width: 35%">
      <q-card-section class="row items-center q-pa-sm bg-ap-secondary text-white">
        <div class="text-h6">{{ title }}</div>
        <q-space/>
        <q-btn v-if="btnClose" icon="close" flat round dense v-close-popup/>
      </q-card-section>

      <q-separator/>

      <q-card-section style="max-height: 70vh" class="scroll" :class="bodyClass">
        <slot name="body"/>
        <input-password
          required
          v-show="passwordActual"
          class="col-12 col-sm-6"
          label="Contraseña actual"
          name="last_password"
          ref="lastPassword"
          :rules="[(val) => !!val || 'El campo es obligatorio']"
          @input="validate"
        />
        <input-password
          required
          class="col-12 col-sm-6"
          label="Contraseña"
          name="password"
          ref="password"
          :rules="[(val) => this.pattern.test(val) || 'Debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial']"
          @input="validate"
        />
        <input-password
          required
          class="col-12 col-sm-6"
          ref="confirmPassword"
          label="Confirmar contraseña"
          :rules="[(val) => this.$refs.password.getValue() === val || 'Las contraseñas no coinciden']"
          @input="validate"
        />

      </q-card-section>

      <q-separator/>

      <q-card-actions :align="alignActions">
        <slot name="footer"/>
        <btn-cancel :tooltip="tooltipCancel" class="q-mr-sm" @click="hide"/>
        <btn-aceptar :tooltip="tooltipOk" :disable="!isValid" @click="setPassword"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import inputPassword from "components/baseComponents/inputs/inputPassword/inputPassword";
import btnCancel from "components/baseComponents/buttons/btnCancel";
import btnAceptar from "components/baseComponents/buttons/btnAceptar";
import mixinConfig from "components/modules/_mixinConfig/mixinConfig";
import {api} from "boot/axios";
import {Loading, Notify, QSpinnerTail} from "quasar";
import {mapActions} from "vuex";
import { sha256 } from "src/utils/sha256"
export default {
  name: 'changePassword',
  mixins: [mixinConfig],
  components: {inputPassword, btnCancel, btnAceptar},
  props: {
    title: {
      type: String,
      default: 'Cambiar contraseña'
    },
    active: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    bodyClass: {
      type: String,
      default: ''
    },
    alignActions: {
      type: String,
      default: 'right'
    },
    btnClose: {
      type: Boolean,
      default: true
    },
    tooltipOk: {
      type: String,
      default: 'Confirmar'
    },
    tooltipCancel: {
      type: String,
      default: 'Cancelar'
    },
    changePassword: {
      type: Boolean,
      default: false
    },
    passwordActual: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    active: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.activeWindow = newVal
      }
    }
  },
  data() {
    return {
      activeWindow: false,
      pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*?[#?!@$%^&*-]).{8}/,
      isValid: false,
      moduleName: 'password',
      apiName: "api",
    }
  },
  methods: {
    ...mapActions('auth', ['setSessionStorage']),
    getSlotRefByName(name) {
      // return this.$scopedSlots.body()[0].context.$refs[name]
    },
    setPassword(){
      if(this.changePassword)
        this.$emit('parentPassword', this.$refs.password.getValue())
      else
        this.change()
    },
    show() {
      this.activeWindow = true
    },
    hide() {
      this.activeWindow = false
      this.$emit('close')
    },
    fireEventShow() {
      this.$emit('show')
    },
    validate() {
      if(this.passwordActual){
        if(this.$refs.password.validate() && this.$refs.confirmPassword.validate() && this.$refs.lastPassword.validate())
          return this.isValid = true
        else
          return this.isValid = false
      }
      else{
        if(this.$refs.password.validate() && this.$refs.confirmPassword.validate())
          return this.isValid = true
        else
          return this.isValid = false
      }
    },
    async change(){
      let url = `${this.getServices.pass}`;
      let res = {}
      res.password = sha256(this.$refs.password.getValue())
      res.confirm_password = sha256(this.$refs.password.getValue())

      Loading.show({
        spinner: QSpinnerTail,
        //spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'blue',
        message: 'Cambiando contraseña...',
        messageColor: 'black'
      })

      let result = await api
        .put(url, {
          password: sha256(this.$refs.password.getValue()),
          confirm_password: sha256(this.$refs.password.getValue()),
          last_password: sha256(this.$refs.lastPassword.getValue())
        })
        .then((resp) => {
          let configMessage = {
            type: "success",
            message: 'Contraseña cambiada satisfactoriamente',
          };
          this.$q.notify(configMessage);
          this.activeWindow = false
          this.setSessionStorage(resp.data)
          this.$emit('close')
          Loading.hide()
        })
        .catch((error) => {
          if(error.request){
            switch (error.request.status){
              case 409:
                Notify.create({
                  type: 'negative',
                  timeout: 1000,
                  position: 'top',
                  message: 'La contraseña no puede ser igual a ninguna de las 24 anteriores'
                })
                Loading.hide()
                break
              case 403:
                Notify.create({
                  type: 'negative',
                  timeout: 1000,
                  position: 'top',
                  message: 'La contraseña actual es incorrecta'
                })
                Loading.hide()
                break
            }
          }
          Loading.hide()
          return this.error;
        })
        .finally(() => {});
    }
  }
}
</script>
