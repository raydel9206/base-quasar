import mixinComponent from 'src/components/modules/_mixinComponent/mixinComponent'
import tooltip from 'src/components/baseComponents/tooltip/tooltip'

export default {
  mixins: [mixinComponent],
  components: { tooltip },
  props: {
    label: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'ap-primary'
    },
    tooltip: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    outline: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    getLabel () {
      return this.tagLang ? this.getText(this.tagLang) : this.label
    }
  }
}
