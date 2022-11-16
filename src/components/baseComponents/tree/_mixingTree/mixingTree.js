import mixinList from "components/modules/_mixinList/mixinList";
import { api } from "boot/axios";
export default {
  mixins: [mixinList],
  methods:{
     async loadData (url) {
      this.loading = true;
      //Peticion api//
       let result= await api
          .get(url)
          .then((resp) => {
           console.log(resp,"esss")
            return resp.data
          })
          .catch((error) => {
            return this.error;
          })
          .finally(() => {});
         this.loading = false;


    //    let resultCase1=[{
    //   root: true,
    //   name: null,
    //   id: -1,
    //   leaf: true,
    //   type:
    //     {
    //       name: null,
    //       id: -1,
    //       children: [
    //         {
    //           name: 'Direccion',
    //           id: 1
    //         }
    //       ],
    //       leaf: false
    //
    //     },
    //   children:[]
    //
    // }]
    //
    //    let resultCase2=[{
    //       root: true,
    //       name: null,
    //       id: -1,
    //       leaf: false,
    //       type:
    //         {
    //           name: null,
    //           id: -1,
    //           children: [
    //             {
    //               name: 'Direccion',
    //               id: 1
    //             }
    //           ],
    //           leaf: false
    //
    //         },
    //       children:[
    //         {
    //
    //           name: 'CITMA',
    //           id: 1,
    //           leaf: true,
    //           type: {
    //               name: 'Direccion',
    //               id: 1,
    //               children: [
    //                 {
    //                   name: 'Departamaneto de Ciencia y Técnica',
    //                   id: 2
    //                 },
    //
    //               ],
    //               leaf: true
    //
    //             },

              // children:[
              //   {
              //
              //     name: 'Prueba',
              //     id: 2,
              //     leaf: true,
              //
              //     type: {
              //       name: 'Direccion',
              //       id: 1,
              //       children: [
              //         {
              //           name: 'Prueba',
              //           id: 2
              //         },
              //
              //       ],
              //       leaf: true
              //
              //     }
              //
              //   },
              // ]

        //     },
        //   ]
        //
        // }]

       // let resultCase3=[{
       //    root: true,
       //    name: null,
       //    id: -1,
       //    leaf: false,
       //    type:
       //      {
       //        name: null,
       //        id: -1,
       //        children: [
       //          {
       //            name: 'Direccion',
       //            id: 1
       //          }
       //        ],
       //        leaf: false
       //
       //      },
       //    children:[
       //      {
       //
       //        name: 'CITMA',
       //        id: 2,
       //        leaf: false,
       //        type:
       //          {
       //            name: 'Direccion',
       //            id: 1,
       //            children: [
       //              {
       //                name: 'Departmaneto de Ciencia y Técnica',
       //                id: 3
       //              }
       //            ],
       //            leaf: true
       //
       //          }
       //
       //      }
       //    ]
       //
       //  }]

       // let resultCase4=[
       //   {
       //   root: false,
       //   name: 'Departmaneto de Ciencia y Técnica del MINFAR',
       //   id: 4,
       //   leaf: false,
       //   type:
       //     {
       //       name: 'Departmaneto de Ciencia y Técnica',
       //       id: 2,
       //       children: [
       //         {
       //           name: 'OSDE',
       //           id: 7
       //         },
       //         {
       //           name: 'Regiones Militares',
       //           id: 8
       //         },
       //         {
       //           name: 'IDNS',
       //           id: 9
       //         },
       //         {
       //           name: 'Hospital Central Militar',
       //           id: 10
       //         }
       //       ],
       //       leaf: true
       //
       //     }
       //
       //
       // },
       //   {
       //     root: false,
       //     name: 'Probando Minfar',
       //     id: 15,
       //     leaf: false,
       //     type:
       //       {
       //         name: 'Departmaneto de Ciencia y Técnica',
       //         id: 2,
       //         children: [
       //           {
       //             name: 'OSDE',
       //             id: 7
       //           },
       //           {
       //             name: 'Regiones Militares',
       //             id: 8
       //           },
       //           {
       //             name: 'IDNS',
       //             id: 9
       //           },
       //           {
       //             name: 'Hospital Central Militar',
       //             id: 10
       //           }
       //         ],
       //         leaf: false
       //
       //       }
       //
       //
       //   }
       // ]
       //
       // let resultCase5=[
       //   {
       //   root: false,
       //   name: 'OSDE',
       //   id: 4,
       //   leaf: true,
       //   type:
       //     {
       //       name: 'OSDE',
       //       id: 5,
       //       children: [
       //         {
       //           name: 'OSDE',
       //           id: 7
       //         },
       //         {
       //           name: 'Regiones Militares',
       //           id: 8
       //         },
       //         {
       //           name: 'IDNS',
       //           id: 9
       //         },
       //         {
       //           name: 'Hospital Central Militar',
       //           id: 10
       //         }
       //       ],
       //       leaf: false
       //
       //     }
       //
       //
       // }
       // ]
       //
       //
       //
       //
       // let result=[resultCase1,resultCase2,resultCase3,resultCase4,resultCase5]

       // return result[pos]

       return result


    }

  }


}
