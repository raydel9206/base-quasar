export default {
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    dense: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String
    },
    classField: {
      type: String,
      default: 'q-pl-sm q-pr-sm q-mt-md q-pb-md'
    }
  },
  created () {
    if (this.name) {
      this.nameRef = this.name
    }
  },
  mounted () {
    if (this.value) {
      this.myValue = this.value
    }
  },
  watch: {
    value (newValue, oldValue) {

      if (newValue !== oldValue) {

        this.myValue = newValue
      }
    },
    myValue (newValue, oldValue) {

      if (newValue !== oldValue) {

        this.fireEventInput()
      }
    }
  },
  data () {
    return {
      myValue: this.value,
      nameRef: 'refInputField'
    }
  },
  computed: {
    getLabel () {
      return this.required ? `${this.label} *` : this.label
    },
    getRules () {
      let rulesField = []
      if (this.required) {
        rulesField = [(val) => {
          return !!val || 'El campo es obligatorio'
        }]
      }

      if (this.min || this.max) {
        if (this.min && this.max) {
          rulesField.push((val) => {
            return (val >= this.min && val <= this.max) || `El valor debe estar entre ${this.min} y ${this.max}.`
          })
        } else {
          if (this.min) {
            rulesField.push((val) => {
              return (val >= this.min) || `El valor debe ser mayor que ${this.min}.`
            })
          } else {
            if (this.min) {
              rulesField.push((val) => {
                return (val >= this.max) || `El valor debe ser menor que ${this.max}.`
              })
            }
          }
        }
      }

      if (this.rules) {
        rulesField = rulesField.concat(this.rules)
      }
      return rulesField
    }
  },
  methods: {
    fireEventInput () {
      if (this.freezer && this.value) {
        this.myValue = this.value
      }
      this.$emit('input', this.getValue())
    },
    fireEventFilter (val, update) {
      this.$emit('filter', val, update)
    },
    fireEventClick () {
      this.$emit('click', this.myValue)
    },
    validate () {
      return this.$refs[this.nameRef].validate(this.myValue)
    },
    cleanField () {
      this.myValue = ''
    },
    getValue () {
      return this.myValue
    },
    keyPressEnter () {
      if (this.freezer && this.originalValue) {
        this.myValue = this.originalValue
      }
      this.$emit('keyPressEnter', this.myValue)
    },
    setValue (value) {
      this.myValue = value
      this.fireEventInput()
      this.fireEventFilter()
    }
  }
}
