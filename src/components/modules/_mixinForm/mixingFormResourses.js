import { mapState } from "vuex";
import mixinComponent from "src/components/modules/_mixinComponent/mixinComponent";
import mixinConfig from "src/components/modules/_mixinConfig/mixinConfig";
import cardForm from "src/components/baseComponents/cardForm/cardForm";
import btnAceptar from "src/components/baseComponents/buttons/btnAceptar";
import btnCancel from "src/components/baseComponents/buttons/btnCancel";
import { api } from "boot/axios";

export default {
  mixins: [mixinComponent, mixinConfig],
  components: { cardForm, btnAceptar, btnCancel },
  props: {
    id: {
      type: Number,
    },
    uid: {
      type: Number,
    },
    idFicha: {
      type: Number,
    },
  },
  watch: {
    $route(to) {
      this.idElement = to.params.id || null;
      this.idFicha = to.params.idFicha || to.params.encuesta_id || null;
    },
  },
  mounted() {
    if (this.id || this.uid) {
      this.idElement = this.id ?? this.id;
      this.validateForm();
    }
  },
  data() {
    return {
      isValid: false,
      idElement: null,
      moduleName: null,
      elementText: "",
      formName: "myForm",
      sendFormData: false,
      sended: false,
    };
  },
  computed: {
    ...mapState("main", ["maskOptions"]),
    getTitle() {
      return this.idElement
        ? `Modificar ${this.elementText.toLowerCase()}`
        : `Crear ${this.elementText.toLowerCase()}`;
    },
    getSended() {
      return this.sended;
    },
  },
  methods: {
    sendData() {
      this.getRefSubmit().$el.click();
    },
    beforeSubmit(submitResult) {
      return this.idElement ? this.getDirtyValues(submitResult) : submitResult;
    },
    getDirtyValues(submitResult) {
      return submitResult;
    },

    async onSubmit(evt) {
      const formData = new FormData(evt.target);
      let submitResult = {};

      for (const [name, value] of formData.entries()) {
        if (value !== "") {
          submitResult[name] = value;
        }
      }
      submitResult = this.beforeSubmit(submitResult);
      submitResult.encuesta_id =
        this.idFicha ??
        (submitResult.encuesta_id = this.$route.params.encuesta_id);
      this.idElement = this.$route.params.id;

      const urlService = this.getUrlService();

      const textAction = this.idElement ? "Modifica" : "Adiciona";

      this.$q.loading.show({
        ...this.maskOptions,
        message: `${textAction}ndo ${this.elementText.toLowerCase()}...`,
      });

      let result = null;
      if (!this.idElement) {
        result = await api
          .post(urlService, submitResult)
          .then((result) => result)
          .catch((reason) => {
            return {
              status: reason.response.status,
              message: reason.response.data.message,
            };
          })
          .finally(() => {
            this.$q.loading.hide();
          });
      } else {
        result = await api
          .patch(urlService, submitResult)
          .then((result) => result)
          .catch((reason) => {
            return {
              status: reason.response.status,
              message: reason.response.data.message,
            };
          })
          .finally(() => {
            this.$q.loading.hide();
          });
      }

      let configMessage = {
        type: "success",
        message: `${
          this.elementText
        } ${textAction.toLowerCase()}do satisfactoriamente`,
      };
      switch (result.status) {
        case 400:
          configMessage = {
            type: "fail",
            message: `${result.message}`,
          };
          break;
        case 404:
        case 403:
          configMessage = {
            type: "fail",
            message: `No se pudo ${textAction}r`,
          };
          break;
        case 409:
          configMessage = {
            type: "fail",
            message: result.message,
          };
          break;
        case 500:
          configMessage = {
            type: "fail",
            message: `No se pudo ${textAction.toLowerCase()}r el ${this.elementText.toLowerCase()}`,
          };
      }

      this.$q.notify(configMessage);
      this.afterSubmit(result);
    },
    afterSubmit(result) {
      if (result.status === 200 || result.status === 201) {
        // this.goBack();
        console.log("entro");
        this.sended = true;
      }
      return result;
    },
    setSendedFalse() {
      this.sended = false;
    },
    getUrlService() {
      return this.idElement
        ? `${this.getServices.edit}/${this.idElement}`
        : this.getServices.add;
    },
    afterValidateFields(resultValidateFields) {
      return resultValidateFields;
    },
    async validate() {
      const that = this;
      await this.$nextTick().then(() => {
        that.validateForm();
      });
      return this.isValid;
    },
    getRefForm() {
      return this.$refs[this.formName];
    },
    getRefSubmit() {
      return this.$refs.btnSubmit;
    },
    async validateForm() {
      const that = this;
      await this.getRefForm()
        .validate(false)
        .then((success) => {
          const checkValid = that.afterValidateFields(success);

          if (checkValid && that.idElement) {
            this.isValid = this.isDirty();
          } else {
            this.isValid = checkValid;
          }
        });
    },
    isDirty() {
      return false;
    },
    clean() {},
    goBack() {
      let idFicha = this.idFicha ?? this.$route.params.encuesta_id;
      this.$router.push({
        name: `material_resourses`,
        params: { id: idFicha },
      });
    },
  },
};
