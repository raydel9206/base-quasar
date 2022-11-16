<template>
  <q-card class="q-ma-md bg-grey-2 border-solid-black" :style="getStyle">
    <q-card-section class="row">
      <q-card-actions class="col-12 q-pa-none justify-end ">
          <q-item-label
            v-for="estado in states"
            :key="estado"
            :class="getStatesStyle"
          >
            {{ estado }}
          </q-item-label>
        </q-card-actions>
      <div class="col-6 col-sm-2">
        <q-img
          :src="picture"
          ratio="1"
          style="height: 140px; max-width: 150px"
          no-native-menu
          class="rounded-borders"
          alt="No image"
        >
          <q-icon
            class="absolute all-pointer-events"
            size="40px"
            name="info"
            color="grey-7"
            style="bottom: 0px; right: 0px"
          >
            <q-tooltip>
              <slot name="tooltip">Tooltip</slot>
            </q-tooltip>
          </q-icon>
        </q-img>
      </div>
      <div class="col-6 col-sm-6 q-pa-lg">
        <q-item-section>
          <q-item-label class="text-h6 q-pa-md">
            <slot name="name-ID"></slot>
          </q-item-label>
          <q-item-label class="text-subtitle2 q-mt-lg q-pa-md">
            <slot name="entity"></slot>
          </q-item-label>
        </q-item-section>
      </div>
      <div class="col-12 flex-center col-sm-4 items-end">
        <q-card-actions class="col-12 col-sm-4 justify-end q-pt-xl">
          <slot name="buttons"></slot>
        </q-card-actions>
        <q-card-actions class="col-12 col-sm-4 q-pt-xl justify-end">
          <q-item-label>
            {{labelTextDate}} - {{dateFormat(fecha,format)}}
           </q-item-label>
        </q-card-actions>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment';
export default {
  name: "cardWorker",
  components: {},
  props: {
    states: {
      default: [],
    },
    picture: {
      default: require("/src/assets/noImage.jpg"),
    },
    fecha:{
      default:new Date(),
      type: Date,
    },
    labelTextDate:{
      default: "Fecha de Solicitud"
    },
    format:{
      default: "DD-MM-YYYY",
      type: String,
    }
  },
  computed: {
    getStyle() {
      const width = /* this.$q.platform.is.mobile ? */ 98; // : 60
      const a = this.dateFormat(this.fecha,this.format);
      return `width: ${width}vw `;
    },
    getStatesStyle() {
      return ` lastState bg-ap-complementary rounded-borders q-px-xl q-py-sm q-ml-md q-mb-md`;
    },
  },
  methods:{
    dateFormat(timeStamp,format){
      return moment(timeStamp).format(format);
    },
  }
};
</script>
<style>
.lastState:last-of-type {
  margin-right: 0;
}
.q-item__label + .q-item__label {
  margin-top: 0px;
}
</style>

