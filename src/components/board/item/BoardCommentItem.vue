<template>
  <b-card :header-html="contentHead" class="mb-2" border-variant="dark" no-body>
    <b-card-body class="text-left">
      <div v-html="contentBody"></div>
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
    contentHead() {
      return this.userInfo.userid;
    },
    contentBody() {
      console.log(this.comment);
      if (this.comment.content)
        return this.comment.content.split("\n").join("<br>");
      return "내용이 없습니다.";
    },
  },
};
</script>

<style></style>
