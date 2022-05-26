<template>
  <b-container v-if="house" class="bv-example-row">
    <!-- <b-row>
      <b-col
        ><h3>{{ house.aptName }}</h3></b-col
      >
    </b-row> -->
    <b-row class="mb-2 mt-1">
      <b-col
        ><b-img :src="require('@/assets/apt2.jpg')" fluid-grow></b-img
      ></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary">이름 : {{ house.aptName }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary"
          >건축년도 : {{ house.buildYear }} 년
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary"
          >주소 : {{ house.sidoName }} {{ house.gugunName }}
          {{ house.dongName }} {{ house.jibun }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary"
          >거래금액 :
          {{
            (parseInt(house.recentPrice.replace(",", "")) * 10000) | price
          }}원</b-alert
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  computed: {
    ...mapState(houseStore, ["house"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  created() {
    console.log("this is detail");
    console.log(this.house);
  },
};
</script>

<style></style>
