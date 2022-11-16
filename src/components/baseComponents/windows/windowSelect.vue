<template>
  <q-dialog v-model="activeWindow" persistent :full-width="fullWidth" @show="fireEventShow" @before-hide="hide">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar :icon="icon" :color="iconColor" text-color="white"/>
        <span class="q-ml-sm">{{ text }}</span>
      </q-card-section>

    <q-card-section style="max-height: 70vh" class="scroll" :class="bodyClass">
        <slot name="body" />
      </q-card-section>

      <q-card-actions align="right">
        <btn-cancel :tooltip="tooltipCancel" class="q-mr-sm" @click="hide"/>
        <btn-aceptar :tooltip="tooltipOk" @click="confirm"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import btnAceptar from 'src/components/baseComponents/buttons/btnAceptar'
import btnCancel from 'src/components/baseComponents/buttons/btnCancel'

export default {
  name: 'WindowConfirm',
  components: {
    btnAceptar,
    btnCancel
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    },
    icon: {
      type: String,
      default: 'info'
    },
    iconColor: {
      type: String,
      default: 'ap-secondary'
    },
    tooltipOk: {
      type: String,
      default: 'Confirmar'
    },
    tooltipCancel: {
      type: String,
      default: 'Cancelar'
    },
     title: {
      type: String
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
    }
  },
  watch: {
    active: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.activeWindow = newVal
      }
    }
  },
  data () {
    return {
      activeWindow: false
    }
  },
  methods: {
    show () {
      this.activeWindow = true
    },
    confirm () {
      this.activeWindow = false
      this.$emit('confirm')
    },
    hide () {
      this.activeWindow = false
      this.$emit('cancel')
    },
       fireEventShow () {
      this.$emit('show')
    }
  }
}
</script>
