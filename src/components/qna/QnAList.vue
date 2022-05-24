/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>QnA 목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>문의제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <qna-list-item
              v-for="article in articles"
              :key="article.articleno"
              v-bind="article"
            />
          </tbody>
        </b-table-simple>
      </b-col>
      <b-col v-else class="text-center">질문이 없습니다.</b-col>
    </b-row>
  </b-container>
</template>

<script>
//import http from "@/api/http";
import QnaListItem from "@/components/qna/item/QnaListItem";
import { qnaArticle } from "@/api/qna.js";

export default {
  name: "QnaList",
  components: {
    QnaListItem,
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    // http.get(`/qna`).then(({ data }) => {
    //   this.articles = data;
    // });
    qnaArticle(
      (response) => {
        this.articles = response.data;
        //console.log(this.articles);
      },
      (error) => {
        console.log(error);
      },
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "qnaRegister" });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
