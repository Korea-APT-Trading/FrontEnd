import { apiInstance } from "./index.js";

const api = apiInstance();

function qnaArticle(success, fail) {
  api.get(`/qna`).then(success).catch(fail);
}

function registArticle(article, success, fail) {
  api.post(`/qna`, JSON.stringify(article)).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/qna/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  api
    .put(`/qna/${article.articleno}`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  api.delete(`/qna/${articleno}`).then(success).catch(fail);
}

export { qnaArticle, registArticle, getArticle, modifyArticle, deleteArticle };
