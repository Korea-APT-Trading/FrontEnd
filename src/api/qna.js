import { apiInstance } from "./index.js";

const api = apiInstance();

function qnaArticle(success, fail) {
  api.get(`/qna`).then(success).catch(fail);
}

export { qnaArticle };
