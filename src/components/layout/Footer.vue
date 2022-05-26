<template>
  <div>
    <div m-auto style="display: flex; justify-content: center">
      <img
        src="@/assets/main_logo.png"
        class="d-inline-block align-middle"
        height="75px"
        width="auto"
        alt="ssafy"
      />
    </div>

    <div
      m-auto
      style="display: flex; justify-content: center; align-items: center"
    >
      <label>김앤박 Company™</label>
    </div>
    <br />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import ms from "@/store/modules/memberStore";

const memberStore = "memberStore";

export default {
  name: "HeaderNaviBar",
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // console.log("memberStore : ", ms);
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
  },
};
</script>

<style></style>
