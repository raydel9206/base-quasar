import grid from "src/components/baseComponents/grid/grid";
import Store from "src/components/baseComponents/Data/Store";
import windowConfirm from "src/components/baseComponents/windows/windowConfirm";
import mixinConfig from "src/components/modules/_mixinConfig/mixinConfig";
import { api } from "boot/axios";
import conf from "src/conf/conf";

export default {
  mixins: [mixinConfig],
  components: { grid, windowConfirm },
  data() {
    return {
      selected: [],
      columns: () => [],
      apiName: "api",
      moduleName: "",
      gridName: "gridList",
      elementText: "",
      nameRefConfirmDelete: "windowsConfirmDelete",
      nameRefConfirmPrint: "windowsConfirmPrint",
      nameRefConfirmDone: "windowsConfirmDone",
    };
  },
  computed: {
    getTitle() {
      return `Listado de ${this.elementText}s`;
    },
    url() {
      return conf.api.services;
    },
  },
  methods: {
    getStore(config) {
      if (this.getServices && this.getServices.list) {
        return new Store({
          ...{
            url: this.getServices.list,
            totalProperty: "total",
            baseParams: {
              page_size: 5,
              page: 1,
            },
          },
          ...config,
        });
      }
      this.$q.notify({
        type: "fail",
        message: `Url no definida para listar ${this.elementText.toLowerCase()}`,
      });
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
    getUrlDelete(items) {
      const path = Array.isArray(items)
        ? items.map((item) => item.id ?? item.username).join(",")
        : items.id ?? items.username;
      return `${this.getServices.del}/${path}`;
    },

    showWindowConfirmDelete(itemDel) {
      if (this.$refs[this.nameRefConfirmDelete]) {
        this.$refs[this.nameRefConfirmDelete].show();
      }
    },

    showWindowConfirmDone(itemDel) {
      if (this.$refs[this.nameRefConfirmDone]) {
        this.$refs[this.nameRefConfirmDone].show();
      }
    },
    showWindowConfirmPrint(val) {
      if (this.$refs[this.nameRefConfirmPrint]) {
        this.$refs[this.nameRefConfirmPrint].show();
      }
    },
    confirmDelete() {
      this.delItem(this.selected);
    },

    async delItem(items) {
      this.$q.loading.show({
        ...this.maskOptions,
        message: `Eliminando ${this.elementText.toLowerCase()}...`,
      });

      const urlService = this.getUrlDelete(items);

      const result = await api
        .delete(urlService)
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

      let configMessage = {
        type: "success",
        message: `${this.elementText} eliminado satisfactoriamente`,
      };
      switch (result.status) {
        case 400:
        case 409:
        case 404:
          configMessage = {
            type: "fail",
            message: `No se pudo eliminar el ${this.elementText.toLowerCase()}`,
          };
          break;
        case 500:
          configMessage = {
            type: "fail",
            message: `No se pudo eliminar el ${this.elementText.toLowerCase()}. Error interno del sistema`,
          };
          break;
        case 403:
          configMessage = { type: "fail", message: result.message };
          break;
        case 200:
        case 201:
          this.reLoadList();
      }
      this.selected = [];
      this.$q.notify(configMessage);
    },

    reLoadList() {
      return this.$refs[this.gridName]
        ? this.$refs[this.gridName].loadData()
        : null;
    },
  },
};
