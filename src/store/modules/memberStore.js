import jwt_decode from "jwt-decode";
import { login } from "@/api/member.js";
import { findById } from "../../api/member";
import { checkId } from "../../api/member";
import { regist } from "../../api/member";
import { modify } from "../../api/member";
import { drop } from "../../api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    idStatus: false,
    registRst: false,
    modifyRst: false,
    dropRst: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    // checkIdStatus: function (state) {
    //   return state.idStatus;
    // },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_ID_STATUS: (state, idStatus) => {
      state.idStatus = idStatus;
    },
    SET_REGIST_RST: (state, registRst) => {
      state.registRst = registRst;
    },
    SET_MODIFY_RST: (state, modifyRst) => {
      state.modifyRst = modifyRst;
    },
    SET_DROP_RST: (state, dropRst) => {
      state.dropRst = dropRst;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {},
      );
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async checkDuplicate({ commit }, userid) {
      //console.log(typeof userid);
      console.log(userid);
      //commit("SET_IS_LOGIN_ERROR", true);
      await checkId(
        userid,
        (response) => {
          if (response.data.message === "success") {
            console.log("성공");
            commit("SET_ID_STATUS", true);
          } else {
            console.log("실패");
            commit("SET_ID_STATUS", false);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async doRegist({ commit }, user) {
      console.log(user);
      await regist(
        user,
        (response) => {
          if (response.data.message === "success") {
            console.log("회원가입 성공");
            commit("SET_REGIST_RST", true);
          } else {
            console.log("회원가입 실패");
            commit("SET_REGIST_RST", false);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async doModify({ commit }, user) {
      console.log(user);
      await modify(
        user,
        (response) => {
          if (response.data.message === "success") {
            console.log("수정 성공");
            commit("SET_MODIFY_RST", true);
          } else {
            console.log("수정 실패");
            commit("SET_MODIFY_RST", false);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async doDrop({ commit }, userid) {
      console.log(userid);
      await drop(
        userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_DROP_RST", true);
          } else {
            commit("SET_DROP_RST", false);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
  },
};

export default memberStore;
