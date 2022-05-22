<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
              <b-button
                type="button"
                variant="primary"
                class="m-1"
                @click="check"
                >아이디 중복 확인</b-button
              >
            </b-form-group>
            <b-alert
              show
              variant="danger"
              v-if="duplBtnStatus && !this.idStatus"
              >사용할 수 없는 아이디 입니다.</b-alert
            >
            <b-alert show v-if="duplBtnStatus && this.idStatus"
              >사용할 수 있는 아이디 입니다.</b-alert
            >
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="넣어야함;"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                id="username"
                v-model="user.username"
                required
                placeholder="이름 입력...."
                @keyup.enter="넣어야함;"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                type="email"
                id="email"
                v-model="user.email"
                required
                placeholder="이메일 입력...."
                @keyup.enter="넣어야함;"
              ></b-form-input>
            </b-form-group>

            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="regist"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberRegister",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
        username: null,
        email: null,
        joindate: null,
      },
      duplBtnStatus: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["idStatus"]),
  },
  methods: {
    ...mapActions(memberStore, ["checkDuplicate"]),
    movePage() {
      this.$router.push({ name: "signin" });
    },
    regist() {
      if (!this.idStatus) alert("아이디 중복 확인을 해주세요");
      //회원가입 등록 작업
    },
    async check() {
      //alert(this.user.userid);
      if (this.user.userid == null) alert("아이디를 입력해주세요");
      else {
        console.log("test");
        this.duplBtnStatus = true;

        console.log("실행 전 : " + this.user.userid);
        await this.checkDuplicate(this.user.userid);
        console.log("실행 후");
      }
    },
  },
};
</script>

<style></style>
