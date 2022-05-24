<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-steelblue"><b-icon icon="house"></b-icon> SSAFY</h3>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron
          bg-variant="muted"
          text-variant="dark"
          border-variant="dark"
        >
          <template #header>12조: 김준우-박세현</template>

          <template #lead> 슬기로운 SSAFY 부동산 생활<br /> </template>

          <hr class="my-4" />

          <p>환영합니다</p>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "HomeView",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
</style>
