<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>문의글 수정</h3></b-alert>
      </b-col>
    </b-row>
    <qna-input-item type="modify" :no="articleno" />
  </b-container>
</template>

<script>
import QnaInputItem from "@/components/qna/item/QnaInputItem.vue";

export default {
  name: "QnaModify",
  data() {
    return {
      articleno: 0,
    };
  },
  components: {
    QnaInputItem,
  },
  created() {
    this.articleno = this.$route.params.articleno;
  },
};
</script>

<style></style>
