<template>
  <b-tr>
    <b-th class="text-middle">
      <a :href="link" v-html="title"></a>
    </b-th>
  </b-tr>
</template>

<script>
export default {
  name: "BoardListItem",
  props: {
    escription: String,
    link: String,
    originalLink: String,
    pubData: String,
    title: String,
  },
  created() {
    console.log(this.title);
  },
};
</script>

<style></style>
