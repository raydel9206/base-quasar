<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree :nodes="customize" node-key="id" ref="tree" @lazy-load="selected">
      <template v-slot:header-generic="prop">
        <div class="col-md-1 text-weight-bold text-primary">
          {{ prop.node.label }}
        </div>
        <div
          class="row text-center"
          style="width: 100%; margin-left: 15px; flex-wrap: nowrap"
        >
          <div
            class="tooltip apexcharts-theme-light"
            :style="styleUnasigned(prop)"
          >
            <div class="tooltiptext" style="order: 1; display: flex">
              <span
                class="apexcharts-tooltip-marker"
                style="background-color: rgb(119, 93, 208)"
              ></span>
              <div
                class="apexcharts-tooltip-text"
                style="
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 12px;
                "
              >
                <div class="apexcharts-tooltip-y-group">
                  <span class="apexcharts-tooltip-text-y-label"
                    >Sin asignar:
                  </span>
                  <span class="apexcharts-tooltip-text-y-value">{{
                    prop.node.unasigned_ct
                  }}</span>
                </div>
              </div>
            </div>
            <span class="text-weight-bold text-white"
              >{{
                ((prop.node.unasigned_ct * 100) / prop.node.total_ct).toFixed(
                  1
                )
              }}%</span
            >
          </div>
          <div
            class="tooltip apexcharts-theme-light"
            :style="stylePendent(prop)"
          >
            <div class="tooltiptext" style="order: 1; display: flex">
              <span
                class="apexcharts-tooltip-marker"
                style="background-color: rgb(254, 176, 25)"
              ></span>
              <div
                class="apexcharts-tooltip-text"
                style="
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 12px;
                "
              >
                <div class="apexcharts-tooltip-y-group">
                  <span class="apexcharts-tooltip-text-y-label"
                    >Pendiente:
                  </span>
                  <span class="apexcharts-tooltip-text-y-value">{{
                    prop.node.pendent_ct
                  }}</span>
                </div>
              </div>
            </div>
            <span class="text-weight-bold text-white"
              >{{
                ((prop.node.pendent_ct * 100) / prop.node.total_ct).toFixed(1)
              }}%</span
            >
          </div>
          <div
            class="tooltip apexcharts-theme-light"
            :style="stylePendentReview(prop)"
          >
            <div class="tooltiptext" style="order: 1; display: flex">
              <span
                class="apexcharts-tooltip-marker"
                style="background-color: rgb(0, 143, 251)"
              ></span>
              <div
                class="apexcharts-tooltip-text"
                style="
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 12px;
                "
              >
                <div class="apexcharts-tooltip-y-group">
                  <span class="apexcharts-tooltip-text-y-label"
                    >Por revisar:
                  </span>
                  <span class="apexcharts-tooltip-text-y-value">{{
                    prop.node.pendent_review_ct
                  }}</span>
                </div>
              </div>
            </div>
            <span class="text-weight-bold text-white"
              >{{
                (
                  (prop.node.pendent_review_ct * 100) /
                  prop.node.total_ct
                ).toFixed(1)
              }}%</span
            >
          </div>
          <div
            class="tooltip apexcharts-theme-light"
            :style="styleCompleted(prop)"
          >
            <div class="tooltiptext" style="order: 1; display: flex">
              <span
                class="apexcharts-tooltip-marker"
                style="background-color: rgb(0, 227, 150)"
              ></span>
              <div
                class="apexcharts-tooltip-text"
                style="
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 12px;
                "
              >
                <div class="apexcharts-tooltip-y-group">
                  <span class="apexcharts-tooltip-text-y-label"
                    >Terminado:
                  </span>
                  <span class="apexcharts-tooltip-text-y-value">{{
                    prop.node.completed_ct
                  }}</span>
                </div>
              </div>
            </div>
            <span class="text-weight-bold text-white"
              >{{
                ((prop.node.completed_ct * 100) / prop.node.total_ct).toFixed(
                  1
                )
              }}%</span
            >
          </div>
        </div>
      </template>

      <template v-slot:body-story="prop">
        {{ prop.node.story }}
      </template>

      <template v-slot:body-toggle="prop">
        <p class="text-caption">{{ prop.node.caption }}</p>
        <q-toggle
          v-model="prop.node.enabled"
          label="I agree to the terms and conditions"
        />
      </template>
    </q-tree>
  </div>
</template>

<script>
import eventHandler from "src/eventBus/eventBus";
export default {
  name: "CustomizingTree",
  data() {
    return {
      ticket: [],
      customize: [],
      municipalities: [],
      aged: [],
      ageas: [],
    };
  },
  props: {
    data: {
      type: [Array, Object],
    },
  },
  created() {
    eventHandler.$on("dataTree", (msg) => {
      this.loadData(msg);
    });
  },
  methods: {
    styleUnasigned(prop) {
      return `width: ${Math.round(
        (prop.node.unasigned_ct * 100) / prop.node.total_ct
      )}%;height: 20px;background-color: rgb(119, 93, 208);`;
    },
    stylePendent(prop) {
      return `width: ${Math.round(
        (prop.node.pendent_ct * 100) / prop.node.total_ct
      )}%;height: 20px;background-color: rgb(254, 176, 25) ;`;
    },
    stylePendentReview(prop) {
      return `width: ${Math.round(
        (prop.node.pendent_review_ct * 100) / prop.node.total_ct
      )}%;height: 20px;background-color: rgb(0, 143, 251);`;
    },
    styleCompleted(prop) {
      return `width: ${Math.round(
        (prop.node.completed_ct * 100) / prop.node.total_ct
      )}%;height: 20px;background-color: rgb(0, 227, 150);`;
    },
    selected({ node, key, done, fail }) {
      done(node.children);
    },
    loadData(data) {
      if (data.length > 1) {
        this.customize[0] = {
          label: "Cuba",
          id: "1",
          header: "generic",
          completed_ct: "",
          pendent_ct: "",
          pendent_review_ct: "",
          unasigned_ct: "",
          total_ct: "",
          children: [],
        };
        data.map((mun, i) => {
          let sum_completed = 0;
          let sum_pendent = 0;
          let sum_pendent_review = 0;
          let sum_unasigned = 0;
          let sum_total = 0;
          this.customize[0].children.push({
            label: mun.name,
            id: mun.uid,
            header: "generic",
            completed_ct: "",
            pendent_ct: "",
            pendent_review_ct: "",
            unasigned_ct: "",
            total_ct: "",
            body: "story",
            story: "",
            children: [],
          });
          mun.municipalities.map((aged, j) => {
            this.customize[0].children[i].children.push({
              label: aged.name,
              id: aged.uid,
              header: "generic",
              completed_ct: "",
              pendent_ct: "",
              pendent_review_ct: "",
              unasigned_ct: "",
              total_ct: "",
              children: [],
            });
            aged.ageas.map((ageas) => {
              this.customize[0].children[i].children[j].children.push({
                label: `Área (${ageas.code})`,
                id: ageas.uid,
                header: "generic",
                completed_ct: ageas.completed_ct,
                pendent_ct: ageas.pendent_ct,
                pendent_review_ct: ageas.pendent_review_ct,
                unasigned_ct: ageas.unasigned_ct,
                total_ct: ageas.total_ct,
              });
              sum_completed += parseInt(ageas.completed_ct);
              sum_pendent += parseInt(ageas.pendent_ct);
              sum_pendent_review += parseInt(ageas.pendent_review_ct);
              sum_unasigned += parseInt(ageas.unasigned_ct);
              sum_total += parseInt(ageas.total_ct);
            });
            this.customize[0].children[i].children[j].completed_ct =
              sum_completed;
            this.customize[0].children[i].children[j].pendent_ct = sum_pendent;
            this.customize[0].children[i].children[j].pendent_review_ct =
              sum_pendent_review;
            this.customize[0].children[i].children[j].unasigned_ct =
              sum_unasigned;
            this.customize[0].children[i].children[j].total_ct = sum_total;
          });
          sum_completed = 0;
          sum_pendent = 0;
          sum_pendent_review = 0;
          sum_unasigned = 0;
          sum_total = 0;
          this.customize[0].children[i].children.map((v) => {
            sum_completed += v.completed_ct;
            sum_pendent += v.pendent_ct;
            sum_pendent_review += v.pendent_review_ct;
            sum_unasigned += v.unasigned_ct;
            sum_total += v.total_ct;
          });
          this.customize[0].children[i].completed_ct = sum_completed;
          this.customize[0].children[i].pendent_ct = sum_pendent;
          this.customize[0].children[i].pendent_review_ct = sum_pendent_review;
          this.customize[0].children[i].unasigned_ct = sum_unasigned;
          this.customize[0].children[i].total_ct = sum_total;
        });

        let sum_completed = 0;
        let sum_pendent = 0;
        let sum_pendent_review = 0;
        let sum_unasigned = 0;
        let sum_total = 0;
        this.customize[0].children.map((v) => {
          sum_completed += v.completed_ct;
          sum_pendent += v.pendent_ct;
          sum_pendent_review += v.pendent_review_ct;
          sum_unasigned += v.unasigned_ct;
          sum_total += v.total_ct;
        });
        this.customize[0].completed_ct = sum_completed;
        this.customize[0].pendent_ct = sum_pendent;
        this.customize[0].pendent_review_ct = sum_pendent_review;
        this.customize[0].unasigned_ct = sum_unasigned;
        this.customize[0].total_ct = sum_total;
      } else if(data[0].municipalities.length > 1) {
        let sum_completed = 0;
          let sum_pendent = 0;
          let sum_pendent_review = 0;
          let sum_unasigned = 0;
          let sum_total = 0;
        this.customize[0] = {
          label: data[0].name,
          id: data[0].uid,
          header: "generic",
          completed_ct: "",
          pendent_ct: "",
          pendent_review_ct: "",
          unasigned_ct: "",
          total_ct: "",
          children: [],
        };
        data[0].municipalities.map((aged, i) => {
            this.customize[0].children.push({
              label: aged.name,
              id: aged.uid,
              header: "generic",
              completed_ct: "",
              pendent_ct: "",
              pendent_review_ct: "",
              unasigned_ct: "",
              total_ct: "",
              children: [],
            });
            aged.ageas.map((ageas) => {
              this.customize[0].children[i].children.push({
                label: `Área (${ageas.code})`,
                id: ageas.uid,
                header: "generic",
                completed_ct: ageas.completed_ct,
                pendent_ct: ageas.pendent_ct,
                pendent_review_ct: ageas.pendent_review_ct,
                unasigned_ct: ageas.unasigned_ct,
                total_ct: ageas.total_ct,
              });
              sum_completed += parseInt(ageas.completed_ct);
              sum_pendent += parseInt(ageas.pendent_ct);
              sum_pendent_review += parseInt(ageas.pendent_review_ct);
              sum_unasigned += parseInt(ageas.unasigned_ct);
              sum_total += parseInt(ageas.total_ct);
            });
            this.customize[0].children[i].completed_ct =
              sum_completed;
            this.customize[0].children[i].pendent_ct = sum_pendent;
            this.customize[0].children[i].pendent_review_ct =
              sum_pendent_review;
            this.customize[0].children[i].unasigned_ct =
              sum_unasigned;
            this.customize[0].children[i].total_ct = sum_total;
          });
          sum_completed = 0;
        sum_pendent = 0;
        sum_pendent_review = 0;
        sum_unasigned = 0;
        sum_total = 0;
        this.customize[0].children.map((v) => {
          sum_completed += v.completed_ct;
          sum_pendent += v.pendent_ct;
          sum_pendent_review += v.pendent_review_ct;
          sum_unasigned += v.unasigned_ct;
          sum_total += v.total_ct;
        });
        this.customize[0].completed_ct = sum_completed;
        this.customize[0].pendent_ct = sum_pendent;
        this.customize[0].pendent_review_ct = sum_pendent_review;
        this.customize[0].unasigned_ct = sum_unasigned;
        this.customize[0].total_ct = sum_total;          
      }
      else {
        let sum_completed = 0;
          let sum_pendent = 0;
          let sum_pendent_review = 0;
          let sum_unasigned = 0;
          let sum_total = 0;
        this.customize[0] = {
          label: data[0].municipalities[0].name,
          id: data[0].municipalities[0].uid,
          header: "generic",
          completed_ct: "",
          pendent_ct: "",
          pendent_review_ct: "",
          unasigned_ct: "",
          total_ct: "",
          children: [],
        };
        data[0].municipalities[0].ageas.map((ageas) => {
              this.customize[0].children.push({
                label: `Área (${ageas.code})`,
                id: ageas.uid,
                header: "generic",
                completed_ct: ageas.completed_ct,
                pendent_ct: ageas.pendent_ct,
                pendent_review_ct: ageas.pendent_review_ct,
                unasigned_ct: ageas.unasigned_ct,
                total_ct: ageas.total_ct,
              });
              sum_completed += parseInt(ageas.completed_ct);
              sum_pendent += parseInt(ageas.pendent_ct);
              sum_pendent_review += parseInt(ageas.pendent_review_ct);
              sum_unasigned += parseInt(ageas.unasigned_ct);
              sum_total += parseInt(ageas.total_ct);
            });
        this.customize[0].completed_ct = sum_completed;
        this.customize[0].pendent_ct = sum_pendent;
        this.customize[0].pendent_review_ct = sum_pendent_review;
        this.customize[0].unasigned_ct = sum_unasigned;
        this.customize[0].total_ct = sum_total;
      }
    },
  },
};
</script>

<style lang="scss" src="./scss/CustomizingTree.scss"></style>
