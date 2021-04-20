<template>
  <iframe
    height="265"
    style="width: 100%;"
    scrolling="no"
    :title="code"
    :src="`https://codepen.io/gaohongwei11/embed/${code}?height=265&theme-id=dark&default-tab=result`"
    frameborder="no"
    loading="lazy"
    allowtransparency="true"
    allowfullscreen="true"
  >
    See the Pen
    <a :href="`https://codepen.io/gaohongwei11/pen/${code}`">{{code}}</a> by Ooooo~
    (
    <a href="https://codepen.io/gaohongwei11">@gaohongwei11</a>) on
    <a href="https://codepen.io">CodePen</a>.
  </iframe>
</template>
<script>
export default {
  name: "EmbedHTML",
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      str: "EmbedHTML"
    };
  }
};
</script>