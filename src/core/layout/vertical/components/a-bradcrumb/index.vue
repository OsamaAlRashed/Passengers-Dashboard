<template>
  <b-col cols="12"> 
    <b-row class="pt-2 pb-3">
      <b-col cols="12" lg="6" class="d-flex align-items-center">
        <b-breadcrumb class="px-0 py-0 m-0 rounded-0">
          <b-breadcrumb-item
            v-for="(item, index) in items"
            :key="index"
            :href="item.to"
            :active="item.active"
            >{{ $t("breadcrumb")[item.text] }}</b-breadcrumb-item
          >
        </b-breadcrumb>
      </b-col>
      <b-col cols="12" lg="6">
        <slot></slot>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>
