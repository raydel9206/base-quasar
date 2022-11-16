<template>
  <q-date
    v-model="myValue"
    color="ap-primary"
    mask="DD-MM-YYYY"
    :options="options"
    :option="option"
    :locale="myLocale"
  >
    <div class="row items-center justify-end">
      <btn v-close-popup label="Cerrar" />
    </div>
  </q-date>
</template>
<script>
import btn from "src/components/baseComponents/buttons/btn";
import moment from "moment";

export default {
  components: { btn },
  props: {
    name: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    option: {
      type: Boolean,
    },
  },
  name: "dateCmp",
  data() {
    return {
      myValue: moment().format("DD-MM-YYYY"),
      nameRef: "refInputField",

      //Forzando a usar idioma
      myLocale: {
        /* starting with Sunday */
        days: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
        daysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
        months:
          "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
          ),
        monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split(
          "_"
        ),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: "dias",
      },
    };
  },
  emits: ["update:modelValue"],
  created() {
    moment.locale("es");
    if (this.name) {
      this.nameRef = this.name;
    }
  },
  mounted() {
    if (this.modelValue) {
      this.myValue = this.modelValue;
    }
  },
  watch: {
    modelValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.myValue = newValue;
      }
    },
    myValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fireEventInput();
      }
    },
  },

  methods: {
    fireEventInput() {
      this.$emit("update:modelValue", this.getValue());
    },
    getValue() {
      return this.myValue;
    },
    dateFormat(timeStamp, format) {
      return moment(timeStamp).format(format);
    },
    dateObject(dateString, format) {
      return moment(dateString, "DD-MM-YYYY").toDate().toString();
    },
  },
};
</script>
