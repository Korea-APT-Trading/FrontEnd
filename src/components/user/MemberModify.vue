<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>Modify Page</template>

          <template #lead> 내 정보 수정페이지입니다. </template>

          <hr class="my-4" />

          <b-form class="text-left">
            <b-form-group label="아이디:">
              <b-form-input
                v-model="user.userid"
                disabled
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="비밀번호 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                id="username"
                v-model="user.username"
                required
                placeholder="이름 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                type="email"
                id="email"
                v-model="user.email"
                required
                placeholder="이메일 입력...."
              ></b-form-input>
            </b-form-group>
          </b-form>

          <!-- <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userid }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.username
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.joindate
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container> -->
          <hr class="my-4" />

          <b-button
            type="button"
            variant="primary"
            class="mr-1"
            @click="complete"
            >수정완료</b-button
          >
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  // components: {},
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
        username: null,
        email: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo", "modifyRst"]),
  },
  methods: {
    ...mapActions(memberStore, ["doModify"]),
    async complete() {
      //alert("수정완료 누름: " + this.user);
      console.log(this.user);
      await this.doModify(this.user);

      if (this.modifyRst) {
        alert("회원 정보 수정 완료");
        this.userInfo.userid = this.user.userid;
        this.userInfo.userpwd = this.user.userpwd;
        this.userInfo.username = this.user.username;
        this.userInfo.email = this.user.email;
      } else alert("회원 정보 수정 실패");
      this.$router.push({ name: "mypage" });
    },
  },
  created() {
    this.user.userid = this.userInfo.userid;
    this.user.userpwd = this.userInfo.userpwd;
    this.user.username = this.userInfo.username;
    this.user.email = this.userInfo.email;
  },
};
</script>

<style></style>
