<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-steelblue"><b-icon icon="house"></b-icon> 김앤박</h3>

    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show><h3>상위 게시물</h3></b-alert>
        </b-col>
        <br />
      </b-row>
      <b-row class="mb-1"> </b-row>
      <b-row>
        <b-col v-if="articles.length">
          <b-table-simple hover responsive>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>조회수</b-th>
                <b-th>제목</b-th>
                <b-th>작성자</b-th>
                <b-th>작성일</b-th>
              </b-tr>
            </b-thead>
            <tbody>
              <!-- 하위 component인 ListRow에 데이터 전달(props) -->
              <board-top-five
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

    <!-- <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron
          bg-variant="muted"
          text-variant="dark"
          border-variant="dark"
        >
          <template #header>12조: 김준우-박세현</template>

          <template #lead> 슬기로운 SSAFY 부동산 생활<br /> </template>

          <hr class="my-4" />

          <p>환영합니다</p>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row> -->
  </b-container>
</template>

<script>
import { topFiveHitBoard } from "@/api/board";
import BoardTopFive from "@/components/board/item/BoardTopFive";

export default {
  name: "HomeView",
  props: {
    msg: String,
  },
  components: {
    BoardTopFive,
  },
  data() {
    return {
      articles: {},
    };
  },
  created() {
    topFiveHitBoard(
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      },
    );

    console.log(this.articles);
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
</style>
