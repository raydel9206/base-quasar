<template>
  <q-dialog
    persistent
    v-model="dialog"
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
    @show="setupMap"
    @before-hide="hide"
  >
    <div id="mapDiv">
      <div
        id="mapid"
        class="container border-solid-black"
        style="height: 100vh"
      ></div>
    </div>
  </q-dialog>
</template>

<script>
import L from "leaflet";
import WMS from "leaflet.wms";
import iconsLeaflet from "leaflet-iconmaterial";
import "leaflet/dist/leaflet.css";
import LocationWindow from "src/components/baseComponents/map/components/location-window";
import Tooltip from "components/baseComponents/tooltip/tooltip";
import conf from "src/conf/conf";
import { api } from "boot/axios";
import { Loading, QSpinnerTail } from "quasar";
import { onMounted } from "vue";

const homeIcon = L.icon({
  iconUrl: require("../../../../public/icons/home.png"),
  iconSize: [38, 38],

  iconAnchor: [22, 39],

  popupAnchor: [-3, -76],
});
export default {
  name: "maps",
  components: {
    Tooltip,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [22.9789771, -82.2842982],
    },
    active: {
      type: Boolean,
      default: false,
    },
    approval: {
      type: String,
    },
    aged: {
      type: String,
    },
    state: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  mounted() {
    //this.setupMap()
  },
  watch: {
    active: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dialog = newVal;
      }
    },
  },
  data() {
    return {
      fabDown: true,
      map: null,
      layerControl: null,
      myPoint: this.modelValue,
      layerGroup: null,
      dialog: false,
      cubaBounds: [
        [23.5886107447, -85.5749110583],
        [19.6554808619, -73.5780248685],
      ],
      //maxZoom: 17,
    };
  },
  methods: {
    setupMap() {
      this.fabDown = true;

      const optionsWMS = {
        format: "image/png",
        transparent: "true",
        info_format: "text/html",
        identify: false,
        //maxZoom: 17,
        //minZoom: 6,
        tiled: true,
        //nameLayer: "osm",
      };
      const satelital = L.tileLayer.wms(conf.api.osm, {
        layers: "googlemapssatelite",
        format: "image/png",
        transparent: "true",
        info_format: "text/html",
        identify: false,
        //maxZoom: 17,
        //minZoom: 6,
        tiled: true,
      });
      const osm = L.tileLayer.wms(conf.api.osm, {
        layers: "osm",
        format: "image/png",
        transparent: "true",
        info_format: "text/html",
        identify: false,
        maxZoom: 17,
        //minZoom: 6,
        tiled: true,
      });

      this.map = L.map("mapid", {
        attributionControl: false,
        layers: [osm, satelital],
      })
        .fitBounds(this.cubaBounds)
        .setMaxZoom(this.maxZoom)
        .setMaxBounds(this.cubaBounds);

      // this.map.removeControl(this.map.zoomControl);

      let baseMaps = {
        OSM: osm,
        Satelital: satelital,
      };
      this.layerControl = L.control.layers(baseMaps).addTo(this.map);

      this.createdLayers();
    },
    createdLayers() {
      this.loadData();
      this.loadDataBuilding();
    },
    onClick(state) {
      let data = {
        uid: this.approval,
      };
      this.$emit("setState", data, state);
    },
    async loadDataBuilding() {
      this.milestone = sessionStorage.getItem("milestone");
      let milestone = JSON.parse(this.milestone);
      let url = `${conf.api.services.approved.map_buildings}/${milestone.uid}/${this.approval}`;

      Loading.show({
        spinner: QSpinnerTail,
        //spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: "blue",
        message: "Buscando información...",
        messageColor: "black",
      });

      let result = await api
        .get(url)
        .then((resp) => {
          const icon = L.icon({
            iconUrl: "building.png",
            iconSize: [25, 30], // size of the icon
            iconAnchor: [15, 25], // [22, 94] point of the icon which will correspond to marker's location
            popupAnchor: [-3, -76],
          });
          let building = [];
          resp.data.map((v) => {
            let marker = L.marker(
              [v.geom.coordinates[1], v.geom.coordinates[0]],
              { icon: icon }
            ).bindPopup(
              `<b>Cantidad cuestionarios:</b> ${v.polls.length} <br> <b>Cantidad código postal: </b> ${v.postal_codes.length}`,
              {
                offset: [0, 60],
                closeButton: false,
              }
            ); //cuestionarios, codigo postal
            building.push(marker);
          });
          let b = L.layerGroup(building).addTo(this.map);
          this.layerControl.addOverlay(b, "Inmuebles");

          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          return this.error;
        })
        .finally(() => {});
    },
    removeLayer() {
      let map = this.map;
      map.eachLayer(function (layer) {
        if (!!layer.toGeoJSON) {
          map.removeLayer(layer);
        }
      });
    },
    async loadData() {
      this.milestone = sessionStorage.getItem("milestone");
      let milestone = JSON.parse(this.milestone);
      let url = `${conf.api.services.approved.map_apples}/${milestone.uid}/${this.approval}`;
      this.removeLayer();

      Loading.show({
        spinner: QSpinnerTail,
        //spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: "blue",
        message: "Buscando información...",
        messageColor: "black",
      });

      let result = await api
        .get(url)
        .then((resp) => {
          let polygons = "";
          resp.data.map((v) => {
            const geojson = {
              type: "Feature",
              geometry: v.geom,
              properties: {
                code: v.code,
                building: v.buildings.length,
                id: v.uid,
              },
            };

            function getColor(d) {
              return d === 0 ? "#ec6565" : "#6594d7";
            }

            polygons = L.geoJSON(geojson, {
              style: {
                fillColor: getColor(geojson.properties.building),
                color: "white",
                weight: 2,
                fillOpacity: 0.7,
              },
              //onEachFeature: onEachFeature
              onEachFeature: function (feature, layer) {
                // layer.bindPopup(`<b>Código:</b> ${feature.properties['code']}`, {
                //   direction: 'center',
                //   closeButton: false
                // }).openPopup()
                layer.bindTooltip(feature.properties.code, {
                  permanent: true,
                  direction: "center",
                  className: "countryLabel",
                });
              },
            }).addTo(this.map);

            polygons.eachLayer((layer) => {
              this.map.fitBounds(layer.getBounds());
            });
          });

          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          return this.error;
        })
        .finally(() => {});
    },
    setCenter(pointArray) {
      this.map.flyTo(pointArray);
    },
    addOnlyPoint(pointArray) {
      this.layerGroup.clearLayers(); //CLEAR MAP

      L.marker(pointArray, { icon: homeIcon }).addTo(this.layerGroup);
    },
    setPoint(pointArray) {
      this.addOnlyPoint(pointArray);
      this.setCenter(pointArray);
    },
    setCurrentPosition(p) {
      if (p != null) {
        this.setCenter([p]);
      }
    },
    hide() {
      this.dialog = false;
      this.$emit("close");
    },
    onMapClick(e) {
      let point = [e.latlng.lat, e.latlng.lng];
      this.myPoint = point;
      this.addOnlyPoint(point);
    },

    acept() {
      this.dialog = false;
      this.$emit("update:modelValue", this.myPoint);
      this.$emit("close");
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.info h4 {
  margin: 0 0 5px;
  color: #777;
}
.countryLabel {
  background: rgba(255, 255, 255, 0);
  border: 0;
  border-radius: 0px;
  box-shadow: 0 0px 0px;
  color: #1d1d1d;
}
</style>
