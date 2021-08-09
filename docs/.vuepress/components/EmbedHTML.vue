<template>
  <iframe
    v-if="url"
    :src="url"
    style="
      width: 100%;
      height: 500px;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
    "
    title="romantic-hermann-4t43b"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  <iframe
    v-else
    height="265"
    style="width: 100%"
    scrolling="no"
    :title="code"
    :src="`https://codepen.io/gaohongwei11/embed/${code}?height=265&theme-id=dark&default-tab=result`"
    frameborder="no"
    loading="lazy"
    allowtransparency="true"
    allowfullscreen="true"
  >
    See the Pen
    <a :href="`https://codepen.io/gaohongwei11/pen/${code}`">{{ code }}</a> by
    Ooooo~ ( <a href="https://codepen.io/gaohongwei11">@gaohongwei11</a>) on
    <a href="https://codepen.io">CodePen</a>.
  </iframe>
</template>
<script>
export default {
  name: "EmbedHTML",
  props: {
    code: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      str: "EmbedHTML",
    };
  },
};
</script>