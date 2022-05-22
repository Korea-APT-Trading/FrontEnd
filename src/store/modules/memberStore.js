import jwt_decode from "jwt-decode";
import { login } from "@/api/member.js";
import { findById } from "../../api/member";
import { checkId } from "../../api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    idStatus: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkIdStatus: function (state) {
      return state.idStatus;
    },
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
      checkId(
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
  },
};

export default memberStore;
