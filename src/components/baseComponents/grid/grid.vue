<template>
  <q-table
    :title="title"
    :rows="records"
    style="width: 100%; height: calc(100vh - 230px)"
    :columns="columns"
    :row-key="rowKey"
    :flat="flat"
    :card-class="cardClass"
    :hide-header="hideHeader"
    :pagination="pagination"
    :selected-rows-label="getSelectedString"
    :selection="selection"
    :selected="selected"
    @update:selected="fireEventSelect"
    v-model:selected="selected"
  >
    <template v-slot:top-left>
      <div v-show="!search" class="flex full-width">
        <q-input
          borderless
          dense
          debounce="300"
          v-model="searchText"
          :placeholder="textFieldSearch"
        >
          <template v-slot:append>
            <q-icon
              v-show="searchText"
              name="close"
              @click="cleanSearch"
            ></q-icon>
            <q-icon name="search" class="cursor-pointer" @click="loadData" />
          </template>
        </q-input>
        <slot name="top-left"></slot>
      </div>
    </template>

    <template v-slot:top-right>
      <q-btn-group>
        <q-btn
          color="ap-secondary"
          v-if="visibleAdd"
          icon="add"
          @click="executeAction('add')"
        >
          <tooltip>Adicionar{{ ` ${crudBtnText}` }}</tooltip>
        </q-btn>
        <q-btn
          color="ap-secondary"
          v-if="visibleEdit"
          icon="edit"
          :disable="!activeEdit"
          @click="executeAction('edit')"
        >
          <tooltip>Modificar{{ ` ${crudBtnText}` }}</tooltip>
        </q-btn>
        <q-btn
          color="ap-secondary"
          v-if="visibleDel"
          icon="delete"
          :disable="!activeDel"
          @click="fireEvent('clickBtnDel', selected)"
        >
          <tooltip>Eliminar{{ ` ${crudBtnText}` }}</tooltip>
        </q-btn>
        <slot name="otherActionsBtns"></slot>
        <q-btn color="ap-secondary" icon="update" @click="loadData"
          ><tooltip>Actualizar</tooltip></q-btn
        >
      </q-btn-group>
      <slot name="otherBtns"></slot>
    </template>

    <template v-if="showSlotBody" v-slot:body="props">
      <slot name="body" v-bind:props="props"></slot>
    </template>

    <template v-slot:body-cell="row">
      <slot name="body-cell" v-bind:row="row"></slot>
    </template>

    <template
      v-for="column in columns"
      v-slot:[getNameSlotCell(column)]="props"
    >
      <slot :name="getNameSlotCell(column)" v-bind:props="props">
        <q-td class="text-center">{{ props.row[column.name] }}</q-td>
      </slot>
    </template>

    <template v-slot:no-data>
      <h5 class="text-grey">No hay datos</h5>
    </template>

    <template v-slot:bottom>
      <q-pagination
        class="q-mx-auto"
        v-model="pagination.page"
        :max="getCantPages"
        input
        @update:model-value="loadData"
      />
      <select-field
        class-field="q-my-none q-py-none q-mx-sm"
        :value="getRowsPerPage"
        :options="optionsRowsPerPage"
        @input="changeRowsPerPage"
      ></select-field
      ><span
        >Mostrando del {{ firstVisibleElement }} al {{ lastVisibleElement }} de
        {{ getTotal }}</span
      >
    </template>
  </q-table>
</template>

<script>
import mixinGrid from "./_mixinGrid/mixinGrid";
import mixinComponent from "components/modules/_mixinComponent/mixinComponent";

export default {
  name: "GridCmp",
  mixins: [mixinGrid, mixinComponent],
};
</script>
