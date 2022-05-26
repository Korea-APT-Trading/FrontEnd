<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="userid-group" label="작성자:">
          <b-form-input
            id="userid"
            :disabled="true"
            v-model="article.userid"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="subject-group" label="제목:" label-for="subject">
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >글수정</b-button
        >
        <b-button
          type="reset"
          variant="danger"
          class="m-1"
          v-if="this.type === 'register'"
          >목록이동</b-button
        >
        <b-button @click="moveList" variant="danger" class="m-1" v-else
          >취소</b-button
        >
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
// import http from "@/api/http";
import { registArticle, getArticle, modifyArticle } from "@/api/qna";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
      //   isUserid: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  props: {
    type: { type: String },
    no: { type: String },
  },
  created() {
    //console.log(this.no);
    if (this.type === "modify") {
      getArticle(
        this.no,
        ({ data }) => {
          this.article = data;
        },
        (error) => {
          console.log(error);
        },
      );
      //this.article = data;
    } else if (this.type === "register") {
      console.log(this.userInfo);
      console.log(this.userInfo.userid);
      this.article.userid = this.userInfo.userid;
    }
    // this.isUserid = true;
    // }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      //   let err = true;
      //   let msg = "";
      //   !this.article.subject &&
      //     ((msg = "제목 입력해주세요"),
      //     (err = false),
      //     this.$refs.subject.focus());
      //   if (this.article.content == "") {
      //     (msg = "내용 입력해주세요"), (err = false);
      //     // this.$refs.content.focus();
      //     if (!err) alert(msg);
      //   }
      if (this.article.subject && this.article.content) {
        this.type === "register" ? this.registArticle() : this.modifyArticle();
        // console.log("test");
      }
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.$router.push({ name: "qnaList" });
    },
    registArticle() {
      registArticle(
        {
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          if (data === "success") alert("문의글이 등록되었습니다.");
          else alert("문의글 등록중 에러가 발생했습니다.");
          //this.$router.push({ name: "qnaList" });
          this.moveList();
        },
        (error) => {
          console.log(error);
        },
      );
    },
    modifyArticle() {
      modifyArticle(
        {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          if (data === "success") alert("수정 완료되었습니다.");
          else alert("수정 중 에러가 발생했습니다.");
          this.moveList();
        },
        (error) => {
          console.log(error);
        },
      );
    },
    moveList() {
      this.$router.push({ name: "qnaList" });
    },
  },
};
</script>

<style></style>
