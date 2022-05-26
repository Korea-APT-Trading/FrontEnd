<template>
  <div>
    <h3>지도 정보</h3>
    <div id="map"></div>
  </div>
</template>

<script>
// let kakao = window.kakao;
import { mapState } from "vuex";

export default {
  data() {
    return {
      map: null,
      markers: null,
      // markerPositions1: [
      //   { title: "카카오", latlng: new kakao.maps.LatLng(33.45, 126.56) },
      //   { title: "생태연못", latlng: new kakao.maps.LatLng(33.45, 126.56) },
      //   { title: "텃밭", latlng: new kakao.maps.LatLng(33.45, 126.57) },
      // ],
      // makers: [],
    };
  },
  computed: {
    ...mapState("houseStore", ["house"]),
  },
  watch: {
    house: function () {
      // if (this.marker.length > 0) {
      //   this.markers.forEach((item) => {
      //     item.setMap(null);
      //   });
      // }

      let markerPosition = new kakao.maps.LatLng(
        this.house.lat,
        this.house.lng,
      );

      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        position: markerPosition,
        title: this.house.aptName,
        // map: this.map,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);

      let moveLatLon = new kakao.maps.LatLng(this.house.lat, this.house.lng);

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      this.map.panTo(moveLatLon);
    },
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.553836, 126.969652),
        level: 4,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    // displayMarkers(positions) {
    //   if (this.markers.length > 0) {
    //     this.markers.forEach((item) => {
    //       item.setMap(null);
    //     });
    //   }

    //   const imgSrc = require("@/assets/markerStar.jpg");
    //   const imgSize = new kakao.maps.Size(24, 35);
    //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

    //   positions.forEach((position) => {
    //     const marker = new kakao.maps.Marker({
    //       map: this.map,
    //       position: position.latlng,
    //       title: position.title,
    //       image: markerImage,
    //     });
    //     this.markers.push(marker);
    //   });

    //   const bounds = positions.reduce(
    //     (bounds, position) => bounds.extend(position.latlng),
    //     new kakao.maps.LatLngBounds(),
    //   );

    //   this.map.setBounds(bounds);
    // },
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
    // this.displayMarkers();
  },
};
</script>

<style>
#map {
  width: 1110px;
  height: 650px;
}
</style>
