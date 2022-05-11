<template>
  <div class="bg-light rounded border p-2" :class="{'text-center' : !multiple}" v-if="items.length">
    <template v-for="(img, index) in items">
      <slot :items="items" :remove="removeFile">
        <span
          :key="index"
          class="d-inline-block position-relative text-center border rounded m-2 p-2"
        >
          <b-button
            variant="outline-danger"
            class="btn-icon remove"
            @click="removeFile(index)"
          >
            <i class="mdi mdi-close"></i>
          </b-button>
          <img :src="domain + img.src" :width="multiple ? 80 : 180" :height="multiple ? 80 : 180" alt="" class="image" />
          <small b.popover.bottom :title="img.name" class="d-block"
            >{{ img.name.slice(0, 10) }}
            {{ img.name.length > 10 ? "..." : "" }}</small
          >
        </span>
      </slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    domain: {
      type: String,
      default: () => ''
    },
    items: {
      type: Array,
      require: true,
      default: () => []
    },
    multiple: Boolean,
  },
  methods: {
    removeFile(index) {
      this.$emit('remove', index)
    }
  }
}
</script>

<style scoped lang="scss">
.remove {
  position: absolute;
  top: 3px;
  left: 3px;
  z-index: 10;
  height: 20px!important;
  font-size: 14px!important;
  padding: 2px!important;
}
.image {
  object-fit: cover;
  transition: 0.4s;
  border-radius: 0.25rem;
  &:hover {
    transform: scale(1.5);
  }
}
</style>
