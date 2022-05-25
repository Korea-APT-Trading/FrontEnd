<template>
  <b-card
    header-html="답변"
    class="mb-2"
    border-variant="dark"
    no-body
    v-if="comment.userid === 'admin'"
  >
    <b-card-body class="text-left">
      <div v-html="contentHtml"></div>
    </b-card-body>
  </b-card>
  <b-card
    header-html="추가 질문"
    class="mb-2"
    border-variant="dark"
    no-body
    v-else
  >
    <b-card-body class="text-left">
      <div v-html="contentHtml"></div>
    </b-card-body>
  </b-card>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "QnaListItem",
  props: {
    comment: Object,
    // articleno: Number,
    // qnano: Number,
    // userid: String,
    // content: String,
    // regtime: String,
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
    contentHtml() {
      console.log(this.comment);
      if (this.comment.content)
        return this.comment.content.split("\n").join("<br>");
      return "내용이 없습니다.";
    },
  },
};
</script>

<style></style>
