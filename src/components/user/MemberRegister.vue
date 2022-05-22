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
                @click="넣어야함;"
                >아이디 중복 확인</b-button
              >
            </b-form-group>
            <b-alert show variant="danger" v-if="idDuplicate"
              >사용할 수 없는 아이디 입니다.</b-alert
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
      idDuplicate: true,
      allCheck: false,
    };
  },
  methods: {
    movePage() {
      this.$router.push({ name: "signin" });
    },
    regist() {
      if (!this.allCheck) alert("아이디 중복 확인을 해주세요");
    },
  },
};
</script>

<style></style>
