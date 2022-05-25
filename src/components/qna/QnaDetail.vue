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
          :header-html="`<h3>${article.subject}</h3><div><h6>작성자: ${article.userid}</div><div>${article.regtime}</h6></div>`"
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
    <b-row class="mb-1">
      <b-col v-if="comments.length">
        <br />
        <hr />
        <label>[ 댓글 ]</label>
        <hr />
        <!-- <b-card header-html="답변" class="mb-2" border-variant="dark" no-body>
          <b-card-body class="text-left">
            <div v-html="content"></div>
          </b-card-body>
        </b-card> -->
        <qna-comment-item
          v-for="comment in comments"
          :key="comment.articleno"
          :comment="comment"
        />
      </b-col>
      <b-col v-else class="text-center">답변 혹은 댓글이 없습니다.</b-col>
    </b-row>
    <!-- <qna-input-item type="modify" :no="articleno" /> -->
    <b-col v-if="ansBtnStatus">
      <b-button
        variant="outline-danger"
        size="sm"
        @click="writeComment"
        v-if="this.userInfo.userid === 'admin'"
        >답변하기</b-button
      >
      <b-button variant="outline-danger" size="sm" @click="writeComment" v-else
        >추가 질문하기</b-button
      >
    </b-col>
    <b-card
      header-html="답변 작성 중..."
      class="mb-2"
      border-variant="dark"
      no-body
      v-else
    >
      <b-card-body class="text-left"
        ><b-form-input
          v-model="commentcontext"
          required
          placeholder="내용 입력...."
        ></b-form-input>
      </b-card-body>
    </b-card>
    <b-button
      variant="outline-info"
      size="sm"
      @click="completeComment"
      class="mr-2"
      v-if="!ansBtnStatus"
      >완료</b-button
    >
    <b-button
      variant="outline-danger"
      size="sm"
      @click="cancelComment"
      v-if="!ansBtnStatus"
      >취소</b-button
    >
  </b-container>
</template>

<script>
// import QnaInputItem from "@/components/qna/item/QnaInputItem.vue";
import QnaCommentItem from "@/components/qna/item/QnaCommentItem.vue";
import { getArticle, deleteArticle } from "@/api/qna";
import { qnaCommentArticle, writeComment } from "@/api/qnaComment";
import { mapState } from "vuex";

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
      comments: {},
      ansBtnStatus: true,
      commentcontext: "",
    };
  },
  components: {
    // QnaInputItem,
    QnaCommentItem,
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
    content() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "내용이 없습니다.";
    },
  },
  async created() {
    if (
      this.$route.params.userid == this.userInfo.userid ||
      this.userInfo.userid === "admin"
    ) {
      // if (this.userInfo.userid === "admin")
      //   alert("관리자님은 특별히 보여줄게요.");
    } else {
      alert("문의 글을 볼 수 있는 권한이 없습니다.");
      this.$router.replace({ name: "qnaList" });
      return;
    }

    console.log(this.$route.params.articleno);
    await getArticle(
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
    //console.log(this.article);
    // if (
    //   this.article.userid == this.userInfo.userid ||
    //   this.userInfo.userid === "admin"
    // ) {
    //   if (this.userInfo.userid === "admin")
    //     alert("관리자님은 특별히 보여줄게요.");
    // } else {
    //   alert("문의글을 볼 수 있는 권한이 없습니다.");
    //   this.$router.push({ name: "qnaList" });
    // }

    await qnaCommentArticle(
      this.$route.params.articleno,
      (response) => {
        this.comments = response.data;
      },
      (error) => {
        console.log(error);
      },
    );
    console.log(this.comments);
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
    writeComment() {
      this.ansBtnStatus = false;
    },
    cancelComment() {
      this.commentcontext = "";
      this.ansBtnStatus = true;
    },
    completeComment() {
      writeComment(
        {
          qnano: this.article.articleno,
          userid: this.userInfo.userid,
          content: this.commentcontext,
        },
        () => {
          alert("답글을 달았습니다.");
          this.commentcontext = "";
          this.ansBtnStatus = true;
          location.reload();
        },
        (error) => {
          console.log(error);
          alert("답글 등록 도중 에러가 발생했습니다.");
        },
      );
    },
  },
};
</script>

<style></style>
