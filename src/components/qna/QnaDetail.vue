<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>문의글 보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listArticle">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="content"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- <qna-input-item type="modify" :no="articleno" /> -->
  </b-container>
</template>

<script>
// import QnaInputItem from "@/components/qna/item/QnaInputItem.vue";
import { getArticle, deleteArticle } from "@/api/qna";

export default {
  name: "QnaWrite",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
        hit: "",
        regtime: "",
      },
    };
  },
  components: {
    // QnaInputItem,
  },
  created() {
    //console.log(this.$route.params.articleno);
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article.articleno = response.data.articleno;
        this.article.userid = response.data.userid;
        this.article.subject = response.data.subject;
        this.article.content = response.data.content;
        this.article.hit = response.data.hit;
        this.article.regtime = response.data.regtime;
      },
      (error) => {
        console.log(error);
      },
    );
    //console.log(this.articleno);

    console.log(this.article);
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "qnaList" });
    },
    deleteArticle() {
      if (confirm("정말로 문의글을 삭제하시겠습니까?")) {
        deleteArticle(
          this.article.articleno,
          () => {
            alert("삭제되었습니다.");
            this.$router.push({ name: "qnaList" });
          },
          (error) => {
            console.log(error);
            alert("삭제 도중 에러가 발생했습니다.");
          },
        );
      }
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "qnaModify",
        params: { articleno: this.article.articleno },
      });
    },
  },
  computed: {
    content() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "내용이 없습니다.";
    },
  },
};
</script>

<style></style>
