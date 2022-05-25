<template>
  <b-tr>
    <b-th class="text-middle">
      <a :href="link">{{ title }}</a>
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
};
</script>

<style></style>
