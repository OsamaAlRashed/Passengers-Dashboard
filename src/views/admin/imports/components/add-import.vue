<template>
<validation-observer ref="observer">
    <a-modal
    size="md"
    title="Add Import"
    btn_title="Add Import"
    placeholder="search"
    @search="search"
    @ok="submitForm($event)"
    ref="form"
  >
    <template slot="body">
      <a-input-select
        name="type"
        :options="importTypeList"
        v-model="importDto.type"
        placeholder="Select type"
        :rules="[{ type: 'required', message: 'full name is required' }]"
        prepend
        prependIcon="Import"
      >
      </a-input-select>
      <a-input-select
        v-if="importDto.type == 1 || importDto.type == 2"
        name="userId"
        :options="driverList"
        v-model="importDto.userId"
        placeholder="Select a driver"
        :rules="[{ type: 'required', message: 'full name is required' }]"
        prepend
        prependIcon="Profile"
      >
      </a-input-select>
      <a-input-text
        name="amount"
        v-model="importDto.amount"
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
        v-model="importDto.date"
        placeholder="DD/MM/YYYY"
        :rules="[{ type: 'required', message: 'full name is required' }]"
      >
      </a-input-datepicker>
      <a-input-text
        name="note"
        v-model="importDto.note"
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
    ...mapState({ importTypeList: (state) => state.global.importTypeList }),
  },
  components: {
    fileDragDrop,
  },
  data: () => ({
    importDto: {
      date: new Date(),
      amount: 0,
      note: "",
      userId: null,
      type: 0,
    },
  }),
  created() {
    this.getDriverList();
    this.getImportTypes()
  },
  methods: {
    ...mapActions(["getImports", "getDriverList", "import", "getImportTypes"]),
    search(text) {
      this.getImports({ search: text});
    },
    submitForm(BvModalEvent) {
      BvModalEvent.preventDefault();
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.import({
            dto: this.importDto,
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
      Object.assign(this.importDto, {
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
