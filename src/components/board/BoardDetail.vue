<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listArticle">목록</b-button>
      </b-col>
      <b-col
        class="text-right"
        v-if="userInfo.userid === 'admin' || userInfo.userid === article.userid"
      >
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
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- /////////////////////////////////////// -->

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
        <board-comment-item
          v-for="comment in comments"
          :key="comment.boardcommentno"
          :comment="comment"
        />
      </b-col>
      <b-col v-else class="text-center">댓글이 없습니다.</b-col>
    </b-row>
    <!-- <qna-input-item type="modify" :no="articleno" /> -->
    <b-col v-if="ansBtnStatus">
      <b-button variant="outline-danger" size="sm" @click="writeComment"
        >댓글달기</b-button
      >
    </b-col>
    <b-card
      header-html="댓글 작성 중..."
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
// import moment from "moment";
import BoardCommentItem from "@/components/board/item/BoardCommentItem.vue";
import { getArticle, deleteArticle } from "@/api/board";
import { boardCommentArticle, writeComment } from "@/api/boardComment";
import { mapState } from "vuex";

export default {
  name: "BoardDetail",
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
    BoardCommentItem,
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  async created() {
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
        console.log("삭제시 에러발생!!", error);
      },
    );

    console.log(this.article);

    await boardCommentArticle(
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
      this.$router.push({ name: "boardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardModify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "boardList" });
        });
      }
    },
    writeComment() {
      this.ansBtnStatus = false;
    },
    cancelComment() {
      this.commentcontext = "";
      this.ansBtnStatus = true;
    },
    completeComment() {
      console.log(this.article.articleno);
      console.log(this.userInfo.userid);
      console.log(this.commentcontext);

      writeComment(
        {
          articleno: this.article.articleno,
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
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
