import mixinBaseComponent from "src/components/baseComponents/_mixinBaseComponent/mixinBaseComponent";
import Store from "src/components/baseComponents/Data/Store";
import selectField from "src/components/baseComponents/inputs/inputSelectField/selectField";
import tooltip from "src/components/baseComponents/tooltip/tooltip";

export default {
  mixins: [mixinBaseComponent],
  components: { selectField, tooltip },
  props: {
    title: {
      type: String,
      default: "",
    },
    store: {
      type: Store,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: "id",
    },
    selection: {
      type: String,
      default: "none",
    },
    crudBtnText: {
      type: String,
      default: "",
    },
    crudActionRoute: {
      type: Boolean,
      default: true,
    },
    crudActionAddRoute: {
      type: Boolean,
      default: true,
    },
    nameForm: {
      type: String,
    },
    visibleAdd: {
      type: Boolean,
      default: true,
    },
    visibleEdit: {
      type: Boolean,
      default: true,
    },
    visibleDel: {
      type: Boolean,
      default: true,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    showSlotBody: {
      type: Boolean,
      default: false,
    },
    textFieldSearch: {
      type: String,
      default: "Buscar",
    },
    propertySearch: {
      type: String,
      default: "name",
    },
    filters: {
      type: Object,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    cardClass: {
      type: String,
      default: "",
    },
    search: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    filters: function () {
      this.loadData();
    },
  },
  computed: {
    activeEdit() {
      return this.selected.length === 1;
    },
    activeDel() {
      return this.selected.length > 0;
    },
    getRowsPerPage() {
      return this.pagination.rowsPerPage;
    },
    getCantPages() {
      let pages = parseInt(
        this.pagination.rowsNumber / this.pagination.rowsPerPage
      );
      return this.pagination.rowsNumber % this.pagination.rowsPerPage !== 0
        ? ++pages
        : pages;
    },
    getTotal() {
      return this.pagination.rowsNumber;
    },
    firstVisibleElement() {
      return this.getTotal > 0
        ? this.pagination.page > 1
          ? this.pagination.rowsPerPage * (this.pagination.page - 1)
          : 1
        : 0;
    },
    lastVisibleElement() {
      const last = this.pagination.rowsPerPage * this.pagination.page;
      return last < this.getTotal ? last : this.getTotal;
    },
  },
  mounted() {
    if (this.store) {
      this.pagination.page = this.store.getPage();
      this.pagination.rowsPerPage = this.store.getPageSize();
      this.loadData();
    }
  },
  data() {
    return {
      selected: [],
      records: [],
      rows: [],
      searchText: null,
      count: 0,
      pagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 0,
      },
      loading: false,
      optionsRowsPerPage: [5, 10, 20],
    };
  },
  methods: {
    cleanSearch() {
      this.searchText = null;
      this.loadData();
    },
    fireEventSelect() {
      this.$emit("selected", this.selected);
    },
    getNameSlotCell(column) {
      return column && column.name ? `body-cell-${column.name}` : "";
    },
    changeRowsPerPage(value) {
      this.pagination.rowsPerPage = value;
      this.loadData();
    },
    async loadData() {
      this.loading = true;
      if (this.store) {
        try {
          let filterParams = this.filters ? { ...this.filters } : null;
          if (this.searchText) {
            if (filterParams) {
              filterParams.name = this.searchText;
            } else {
              filterParams = { name: this.searchText };
            }
          }

          await this.store.load({
            page: this.pagination.page,
            page_size: this.pagination.rowsPerPage,
            q: filterParams ? JSON.stringify(filterParams) : null,
          });
          this.records = this.store.getData();
          this.pagination.rowsNumber = this.store.getTotalRows();
        } catch (e) {}
      }
      this.loading = false;
    },
    executeAction(action) {
      switch (action) {
        case "add":
          this.crudActionAddRoute
            ? this.$router.push({ name: `${action}${this.nameForm}` })
            : this.$emit("addBtnClick");
          break;
        case "edit":
          this.crudActionRoute
            ? this.$router.push({
                name: `${action}${this.nameForm}`,
                params: this.convertString(this.selected[0]),
              })
            : this.$emit("editBtnClick", this.convertString(this.selected[0]));
          break;
        default:
          this.executeOtherAction(action);
      }
    },
    convertString(select) {
      let selected = { ...select };
      let result = {};
      Object.keys(selected).map((x) => {
        if (typeof selected[x] === "object") {
          result[x] = JSON.stringify(selected[x]);
        } else {
          result[x] = selected[x];
        }
      });
      return result;
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
  },
};
