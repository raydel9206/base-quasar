<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :table-style="{ height: '20vw' }"
      inline
      :table-header-style=" { backgroundColor: '#c1f4cd' }"
      separator="cell"
      :columns="columns"
      row-key="name"



      title="Campos del Nodo"
      :pagination="initialPagination"
      rows-per-page-label="Registros por página"
      :pagination-label="getPaginationLabel"
      :rows-per-page-options="[3,6,9]"
      no-data-label="No se encuentra contenido disponible"
      :loading="loading"

    >

      <template v-slot:body="props">
        <q-tr  :props="props" @click="ChangeChekClik(props)" >
          <q-td key="check">
            <q-checkbox  v-model="props.row.check" @update:model-value="ChangeCheck" />

          </q-td>
          <q-td key="name"  @dblclick="EventdbClik(props)">
            {{ props.row.name }}
            <PoputEdit    :showProput="showProput"  v-model="input"
                          @update:model-value="ChangeSelectAndPoputEdit(input)"
                          @close="showProput=false">

            </PoputEdit>

<!--            <q-popup-edit v-if="showProput" @before-show="Prob"  v-model="props.row.name"-->
<!--                          @update:model-value="ChangeSelectAndPoputEdit(props)" v-slot="scope"-->
<!--                          @hide="Ver"-->
<!--                          buttons label-set="Aceptar" label-cancel="Cancelar">-->
<!--              <input-field v-model="scope.value" @keyup.enter="scope.set">-->
<!--                <div slot="append">-->
<!--                  <q-icon name="edit"/>-->
<!--                </div>-->
<!--              </input-field>-->
<!--            </q-popup-edit>-->
          </q-td>
          <q-td key="type" :props="props">
            <select-field v-model="props.row.model"  @update:model-value="ChangeSelect(props)"
                          :options="obtions" label="Tipo de  Campo"></select-field>
          </q-td>
        </q-tr>
      </template>



      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"

          >
            <p v-if="col.name!='check'">{{ col.label }}</p>
            <q-checkbox v-if="col.name=='check'" v-model="check" :disable="VerificarCheck" @update:model-value="ChangeAllChek" />

          </q-th>
        </q-tr>
      </template>






      <template v-slot:top-right>
        <q-btn-group>
          <btn color="ap-secondary"  icon="add" tooltip="Nuevo Campo" @click="AddRow"></btn>
          <btn color="ap-secondary" icon="delete" :disable="VerifDelete"  tooltip="eliminar Campo" @click="RemoveRow"></btn>

        </q-btn-group>

      </template>
    </q-table>

  </div>
</template>

<script>

  import mixinGrid from '../_mixinGrid/mixinGrid'
  import { uid } from 'quasar'



  import Btn from "../../buttons/btn";
  import InputField from "../../inputs/inputField/inputField";
  import Window from "../../windows/window";
  import BtnAceptar from "../../buttons/btnAceptar";
  import BtnCancel from "../../buttons/btnCancel";
  import PoputEdit from "./components/PoputEdit";
  import {ref} from "vue";

  export default {
    name: "gridField",

    components: {
      Btn,
      PoputEdit,


    },
    mixins: [mixinGrid],
    props: ['modelValue'],
    mounted() {
      this.modelValue.forEach(f=>{
        let object={
          name:f.name,
          model:f.model,
          id:f.id,
          check:false
        }
        this.rows.push(object)
      })
    },
    data() {
      return {
        input:'',
        check:false,
        idRow:'',
        selected :[],
        obtions:[{label: 'texto', value: 'text'}, {label: 'descripción', value: 'textarea'},
          {
            label: 'número',
            value: 'number'
          }, {label: 'booleano', value: 'boolean'}],
        showProput:false,
        isAct:false,
        datosPoput:null,
        loading: false,
        columns : [
          {name: 'check', align: 'left', field: 'check'},
          {name: 'name', align: 'left', label: 'Nombre del campo', field: row => row.name},
          {name: 'type', align: 'center', label: 'Tipo del campo', field: 'type', style: 'max-width:5px'},
        ],
        rowCount: 10,
        rows: [],


        initialPagination: {
                sortBy: 'desc',
                descending: true,
                page: 1,
                rowsPerPage: 3,
              },
      }
    },

    computed:{

      VerifDelete(){
        var ind=this.rows.findIndex(f=>f.check==true)
        if(ind==-1){
          return true
        }
        else{
          return false
        }
      },
      VerificarCheck(){
        if (this.rows.length>0){
          return false
        }
        else{
          return true
        }
      }
    },
    watch:{
   rows(newVal,old){
       
      }
    },


    methods: {

     ChangeChekClik(value){
       console.log(value,"esss")
        var object=this.rows.find(f=>f.id==value.row.id)
           object.check=!object.check
           var ind=this.rows.findIndex(f=>f.check==false)
        if(ind==-1){
          this.check=true
        }
        else{
          this.check=false
        }
      },
      ChangeCheck(value){
        if(value==false){
          this.check=false
        }
         var ind=this.rows.findIndex(f=>f.check==false)
        if(ind==-1){
          this.check=true
        }
      },
      ChangeAllChek(value){
        if(value==true){
          this.rows.forEach(f=>{
            f.check=true
          })
        }
        else{
          this.rows.forEach(f=>{
            f.check=false
          })
        }

      },
      getSelectedString(numberOfRows) {
        if (numberOfRows > 1) {
          return `${numberOfRows} elementos seleccionados`
        }
        if(numberOfRows==1){
          return `${numberOfRows} elemento seleccionado`
        }
      },

      EventdbClik(value){
        this.showProput=true
        this.input=value.row.name
        this.idRow=value.row.id
     },
      ChangeSelect(objectRow){
        this.showProput=false

        let objectModel = {
          name: objectRow.row.name,
          model: objectRow.row.model,
          options:this.obtions,
          check:objectRow.row.check,
          id: objectRow.row.id
        }
        let ind = this.rows.findIndex(f => f.id == objectRow.row.id)
        this.rows.splice(ind, 1)
        this.rows.splice(ind, 0, objectModel)
        this.Emitir()


      },
      ChangeSelectAndPoputEdit(newVal) {
        this.showProput=false
        let object=null
        //Cambiar los valores del row en el hijo
        this.rows.forEach(f=>{
          if(f.id==this.idRow){
           object=f
          }
        })

        let objectModel = {
          name: newVal,
          model: object.model,
          check:object.check,
          id: object.id
        }
        let ind = this.rows.findIndex(f => f.id == object.id)
        this.rows.splice(ind, 1)
        this.rows.splice(ind, 0, objectModel)
        this.Emitir()
      },
      Emitir() {
       let row=[]
        this.rows.forEach(f=>{
          let object={
            name:f.name,
            model:f.model,
            id:f.id,
          }
          row.push(object)
        })
        this.$emit('update:modelValue', row)

      },

      AddRow() {

        this.check=false
       let originalRows= this.rows
        this.loading = true

        setTimeout(() => {
          let id = 0
          const
            index = this.rows.length,
            row = originalRows[Math.floor(Math.random() * originalRows.length)]
             id = uid()

          let objectRows = {
            name: 'Campo',
            options:this.obtions,
            model: {label: 'texto', value: 'text'},
            check:false,
            id: id
          }

          const newRow = {...objectRows} // extend({}, row, { name: `${row.name} (${row.__count})` })
          this.rows = [...this.rows.slice(0, index), newRow, ...this.rows.slice(index)]
          this.loading = false
          console.log(this.rows)
          this.Emitir()

        }, 500)
      },
      RemoveRow() {
        this.loading = true
        setTimeout(() => {
          var i = 0;
          while (i < this.rows.length) {
            if(this.rows[i].check==true){
              this.rows.splice(i, 1);
            }
            else{
              i++
            }
          }
        this.loading= false
        this.check=false
          this.Emitir()

        }, 500)
      },
      getPaginationLabel(a, b, c) {
        return `${a}-${b} de ${c}`
      }
    }
  }





      //
      //   function getPaginationLabel(a, b, c) {
      //     return `${a}-${b} de ${c}`
      //   }












    // setup(props,  { emit }) {
    //
    //   const loading = ref(false)
    //   const rowCount = ref(10)
    //   let rows = ref(props.modelValue)
    //   const originalRows = [rows]
    //
    //   function ChangeSelectAndPoputEdit(objectRow) {
    //     let options = []
    //     objectRow.row.options.forEach(f => {
    //       options.push(f)
    //     })
    //     let objectModel = {
    //       name: objectRow.row.name,
    //       model: objectRow.row.model,
    //       options: options,
    //       id: objectRow.row.id
    //
    //     }
    //     let ind = rows.value.findIndex(f => f.id == objectRow.row.id)
    //     rows.value.splice(ind, 1)
    //     rows.value.splice(ind, 0, objectModel)
    //     Emitir()
    //   }
    //
    //
    //   function Emitir() {
    //     emit('update:modelValue',rows.value)
    //   }
    //
    //   function AddRow() {
    //     loading.value = true
    //     setTimeout(() => {
    //       const
    //         index = rows.value.length,
    //         row = originalRows[Math.floor(Math.random() * originalRows.length)]
    //       row.id = ++rowCount.value
    //       let id = 0
    //       if (rows.value.length === 0) {
    //         rowCount.value = 0
    //         id = row.id
    //       } else {
    //         id = row.id
    //       }
    //       let objectRows = {
    //         name: 'Campo',
    //         options: [{label: 'texto', value: 'text'}, {label: 'descripcion', value: 'textarea'}, {
    //           label: 'numero',
    //           value: 'number'
    //         }, {label: 'booleano', value: 'boolean'}],
    //         model: ref({label: 'texto', value: 'text'}),
    //         id: id
    //       }
    //       const newRow = {...objectRows} // extend({}, row, { name: `${row.name} (${row.__count})` })
    //       rows.value = [...rows.value.slice(0, index), newRow, ...rows.value.slice(index)]
    //       loading.value = false
    //       console.log(rows.value)
    //       Emitir()
    //
    //     }, 500)
    //   }
    //
    //   function RemoveRow() {
    //     loading.value = true
    //     setTimeout(() => {
    //       const index = rows.value.length - 1
    //       rows.value = [...rows.value.slice(0, index), ...rows.value.slice(index + 1)]
    //       loading.value = false
    //       Emitir()
    //     }, 500)
    //   }
    //
    //   function getPaginationLabel(a, b, c) {
    //     return `${a}-${b} de ${c}`
    //   }
    //
    //   return {
    //     getPaginationLabel,
    //     initialPagination: ref({
    //       sortBy: 'desc',
    //       descending: true,
    //       page: 1,
    //       rowsPerPage: 3,
    //     },),
    //     RemoveRow,
    //     ChangeSelectAndPoputEdit,
    //     AddRow,
    //     loading,
    //     originalRows,
    //     rowCount,
    //     rows,
    //     columns,
    //   }
    // },

</script>

<style scoped>

</style>
