<template>
  <b-card>
    <validation-observer ref="observer">
      <label>Km price</label>
      <a-input-text
        name="price"
        v-model="settingDto.kmPrice"
        placeholder="Km price"
        type="number"
        prepend
        prependIcon="Bag money"
        :rules="[
          { type: 'required', message: 'Km price is required' },
          {
            type: 'min_value:1',
            message: 'Km price must be bigger than 0.',
          },
        ]"
      >
      </a-input-text>
      <button class="btn btn-primary" @click="submitForm">Accept</button>
    </validation-observer>
  </b-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({ settingDto: (state) => state.settings.settingDto }),
  },
  created() {
    this.getSettings();
  },
  data: () => ({}),
  methods: {
    ...mapActions(["getSettings", "setSettings"]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.setSettings({
            price: this.settingDto.kmPrice,
            cb: () => {},
          });
        }
      });
    },
  },
};
</script>
