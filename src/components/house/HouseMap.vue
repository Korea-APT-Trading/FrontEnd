<template>
  <div>
    <h3>House 위치</h3>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.2429362, 131.8624647, 16),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      // script.src =
      //   "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
      //   process.env.VUE_APP_KAKAOMAP_KEY;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      /* global kakao */
      script.addEventListener("load", () => {
        //console.log("loaded", kakao);
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      //console.log("이미 로딩됨: ", window.kakao);
      this.initMap();
    }
  },
};
</script>

<style>
#map {
  width: 1110px;
  height: 1110px;
}
</style>
