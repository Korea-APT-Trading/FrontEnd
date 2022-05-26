<template>
  <div>
    <h3>지도 정보</h3>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      markerPositions1: [
        { title: "카카오", latlng: new kakao.maps.LatLng(33.45, 126.56) },
        { title: "생태연못", latlng: new kakao.maps.LatLng(33.45, 126.56) },
        { title: "텃밭", latlng: new kakao.maps.LatLng(33.45, 126.57) },
      ],
      makers: [],
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
  height: 1110px;
}
</style>
