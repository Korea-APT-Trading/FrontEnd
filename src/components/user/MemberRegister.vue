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
                v-model.trim.lazy="user.userid"
                required
                placeholder="아이디 입력...."
                @change="confirmId"
                ref="idCur"
              ></b-form-input>
              <b-button
                type="button"
                variant="primary"
                class="m-1"
                @click="check"
                >아이디 중복 확인</b-button
              >
              <br />
              <b-alert
                show
                v-if="user.userid && !idValid"
                variant="outline-primary"
                >* 아이디는 5글자 이상 20글자 이하입니다.</b-alert
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
                v-model.trim.lazy="user.userpwd"
                required
                placeholder="비밀번호 입력...."
                @change="confirmPwd"
                ref="pwdCur"
              ></b-form-input>
              <b-alert
                show
                v-if="user.userpwd && !pwdValid"
                variant="outline-primary"
                >* 비밀번호는 8글자 이상입니다.</b-alert
              >
            </b-form-group>
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                id="username"
                v-model.trim.lazy="user.username"
                required
                placeholder="이름 입력...."
                @change="confirmName"
                ref="nameCur"
              ></b-form-input>
              <b-alert
                show
                v-if="user.username && !nameValid"
                variant="outline-primary"
                >* 이름은 20글자 이하입니다.</b-alert
              >
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                type="email"
                id="email"
                v-model.trim.lazy="user.email"
                required
                placeholder="이메일 입력...."
                @change="confirmEmail"
                ref="emailCur"
              ></b-form-input>
              <b-alert
                show
                v-if="user.email && !emailValid"
                variant="outline-primary"
                >* 이메일 양식에 맞춰 작성해주세요.</b-alert
              >
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
      idValid: false,
      pwdValid: false,
      nameValid: false,
      emailValid: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["idStatus", "registRst"]),
  },
  methods: {
    ...mapActions(memberStore, ["checkDuplicate", "doRegist"]),
    movePage() {
      this.$router.push({ name: "signIn" });
    },
    async regist() {
      if (!this.idStatus || !this.duplBtnStatus) {
        alert("아이디 중복 확인을 해주세요");
      } else if (
        !this.idValid ||
        !this.pwdValid ||
        !this.nameValid ||
        !this.emailValid
      ) {
        alert("정확하게 입력해주세요");
        if (!this.idValid) this.$refs.idCur.focus();
        else if (!this.pwdValid) this.$refs.pwdCur.focus();
        else if (!this.nameValid) this.$refs.nameCur.focus();
        else if (!this.emailValid) this.$refs.emailCur.focus();
      } else {
        await this.doRegist(this.user);
        alert("회원가입 성공!");
        this.movePage();
      }
    },
    async check() {
      //alert(this.user.userid);
      if (this.user.userid == null || !this.idValid)
        alert("아이디를 확인해주세요");
      else {
        this.duplBtnStatus = true;

        console.log("실행 전 : " + this.user.userid);
        await this.checkDuplicate(this.user.userid);
        console.log("실행 후");
      }
    },
    confirmId() {
      this.duplBtnStatus = false;
      if (this.user.userid.length >= 5 && this.user.userid.length <= 20)
        this.idValid = true;
      else this.idValid = false;
    },
    confirmPwd() {
      if (this.user.userpwd.length >= 8) this.pwdValid = true;
      else this.pwdValid = false;
    },
    confirmName() {
      if (this.user.username.length <= 20) this.nameValid = true;
      else this.nameValid = false;
    },
    confirmEmail() {
      if (this.user.email.indexOf("@") != -1) this.emailValid = true;
      else this.emailValid = false;
    },
  },
};
</script>

<style></style>
