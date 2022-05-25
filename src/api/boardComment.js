import { apiInstance } from "./index.js";

const api = apiInstance();

async function boardCommentArticle(articleno, success, fail) {
  await api.get(`/boardcomment/${articleno}`).then(success).catch(fail);
}

function writeComment(comment, success, fail) {
  api.post(`/boardcomment`, JSON.stringify(comment)).then(success).catch(fail);
}

export { boardCommentArticle, writeComment };
