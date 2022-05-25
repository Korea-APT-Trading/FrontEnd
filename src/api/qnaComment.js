import { apiInstance } from "./index.js";

const api = apiInstance();

async function qnaCommentArticle(articleno, success, fail) {
  await api.get(`/qnacomment/${articleno}`).then(success).catch(fail);
}

function writeComment(comment, success, fail) {
  api.post(`/qnacomment`, JSON.stringify(comment)).then(success).catch(fail);
}

export { qnaCommentArticle, writeComment };
