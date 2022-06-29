<template>
<validation-observer ref="observer">
 <a-modal
    size="md"
    title="Add Export"
    btn_title="Add Export"
    placeholder="search"
    @search="search"
    @ok="submitForm($event)"
    ref="form"
  >
    <template slot="body">
      <a-input-select
        name="type"
        :options="exportTypeList"
        v-model="exportDto.type"
        placeholder="Select type"
        :rules="[{ type: 'required', message: 'full name is required' }]"
        prepend
        prependIcon="Export"
      >
      </a-input-select>
      <a-input-select
        v-if="exportDto.type == 1"
        name="userId"
        :options="driverList"
        v-model="exportDto.userId"
        placeholder="Select a driver"
        :rules="[{ type: 'required', message: 'full name is required' }]"
        prepend
        prependIcon="Profile"
      >
      </a-input-select>
      <a-input-text
        name="amount"
        v-model="exportDto.amount"
        placeholder="Amount of money"
        type="number"
        prepend
        prependIcon="Bag money"
        :rules="[
          { type: 'required', message: 'salary is required' },
          {
            type: 'min_value:1',
            message: 'salary must be bigger than 0.',
          },
        ]"
      >
      </a-input-text>
      <a-input-datepicker
        name="date"
        v-model="exportDto.date"
        placeholder="DD/MM/YYYY"
        :rules="[{ type: 'required', message: 'full name is required' }]"
      >
      </a-input-datepicker>
      <a-input-text
        name="note"
        v-model="exportDto.note"
        placeholder="Write Note"
        prepend
        prependIcon="File"
      >
      </a-input-text>
    </template>
  </a-modal>
</validation-observer>
 
</template>
<script>
import fileDragDrop from "@core/components/file-drag-drop/file-drag-drop.vue";
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({ genders: (state) => state.global.genders }),
    ...mapState({ driverList: (state) => state.global.driverList }),
    ...mapState({ exportTypeList: (state) => state.global.exportTypeList }),
  },
  components: {
    fileDragDrop,
  },
  data: () => ({
    exportDto: {
      date: new Date(),
      amount: 0,
      note: "",
      userId: null,
      type: 0,
    },
  }),
  created() {
    this.getDriverList();
    this.getExportTypes()
  },
  methods: {
    ...mapActions(["getExports", "getDriverList", "export", "getExportTypes"]),
    search(text) {
      this.getExports({ search: text});
    },
    submitForm(BvModalEvent) {
      BvModalEvent.preventDefault();
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.export({
            dto: this.exportDto,
            cb: () => {
              this.resetDto();
            },
          });
          this.$refs.form.close()
        }
      })
    },
    resetDto() {
      this.$refs.observer.reset();
      Object.assign(this.exportDto, {
        date: new Date(),
        amount: 0,
        note: "",
        userId: null,
        type: 0,
      });
    },
  },
};
</script>
