<template>
  <pre class="m-0"><code class="hljs rounded" v-html="hljs.highlight(html, {language}).value"></code></pre>
</template>

<script>
import hljs from 'highlight.js';
export default {
  props: {
    html: String,
    language: String
  },
  data: () => ({
    hljs,
  }),
};
</script>

