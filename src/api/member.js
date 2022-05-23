import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

// function logout(success, fail)

async function checkId(userid, success, fail) {
  await api.get(`/user-id/${userid}`).then(success).catch(fail);
}

async function regist(user, success, fail) {
  await api.post(`/user`, JSON.stringify(user)).then(success).catch(fail);
}

async function modify(user, success, fail) {
  await api.patch(`/user`, JSON.stringify(user)).then(success).catch(fail);
}

async function drop(userid, success, fail) {
  await api.delete(`/user/drop/${userid}`).then(success).catch(fail);
}

export { login, findById, checkId, regist, modify, drop };
