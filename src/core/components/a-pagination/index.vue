<template>
  <b-pagination
    :value="firstPage"
    :total-rows="items.length"
    :per-page="pageLength"
    first-number
    last-number
    prev-class="prev-item"
    next-class="next-item"
    dir="ltr"
    class="mt-1 mb-0"
    @input="(value) => updatePagination(value)"
  >
    <template #prev-text>
      <i class="mdi mdi-chevron-left"></i>
    </template>

    <template
      slot="page"
      slot-scope="{ active, content, disabled, index, page }"
    >
      <slot
        name="page"
        :active="active"
        :page="page"
        :active,="content"
        :disabled="disabled"
        :index="index"
      ></slot>
    </template>

    <template #next-text>
      <i class="mdi mdi-chevron-right"></i>
    </template>
  </b-pagination>
</template>
<script>
import { BPagination } from "bootstrap-vue";
export default {
  components: {
    BPagination,
  },
  props: {
    items: Array,
    value: Array,
    pageLength: {
      type: Number,
      default: () => 10,
    },
  },
  data: () => ({
    val: {
      type: null,
    },
    firstPage: 1,
  }),
  mounted() {
    this.val = this.value;
    this.updatePagination(this.firstPage);
  },
  methods: {
    updatePagination(page) {
      const firstPage = this.pageLength * (page - 1);
      this.val = this.items.slice(firstPage, firstPage + this.pageLength);
      this.firstPage = page;
    },
  },
  watch: {
    val(v) {
      this.$emit("input", v);
    },
    value(v) {
      this.val = v;
    },
    items() {
      this.updatePagination(this.firstPage);
    },
  },
};
</script>