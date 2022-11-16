import {QSpinnerTail} from 'quasar'
import mixinField from "components/baseComponents/inputs/_mixin/mixinField";
import {api} from "boot/axios";

export default {
  mixins: [mixinField],
  components: {
    // inputField
  },
  props: {
    urlService: {
      type: String,
      default: ''
    },
    maskVariant: {
      type: String,
      default: 'component'
    }
  },
  computed: {
    activeSearch() {
      return this.value !== '' && this.$refs[this.nameRef] ? this.$refs[this.nameRef].validate() : false
    },
    getServiceIdentity() {
      return this.urlService
    },
  },
  methods: {
    async searchCarnet() {
      let url = `${this.getServiceIdentity}/${this.value}`

      this.showMask()
      let result = await api.get(`${url}`).then(resp => resp)
        .catch(err => {
          this.hideMask()
          return null
        })

      this.hideMask()
      this.$emit('personInfo', result ? result.data : null)
    },
    showMask() {
      switch (this.maskVariant) {
        case 'component':
        case 'global':
          this.$q.loading.show({
            spinner: QSpinnerTail,
            spinnerSize: 140,
            backgroundColor: 'blue',
            message: 'Buscando información...',
            messageColor: 'black'
          })
          break
      }
    },
    keyPressEnter() {
      if (this.activeSearch) {
        this.searchCarnet()
      }
    },
    hideMask() {
      switch (this.maskVariant) {
        case 'component':
        case 'global':
          this.$q.loading.hide()
          break
      }
    },
    cleanField() {
      this.value = ''
      this.$refs[this.nameRef].cleanField()
      this.$emit('cleanField')
    }
  }
}
