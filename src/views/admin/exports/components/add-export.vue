<template>
  <a-modal
    size="md"
    title="Add Export"
    btn_title="Add Export"
    placeholder="search"
    @search="search"
    @ok="submitForm"
  >
    <template slot="body">
      <a-input-select
        name="type"
        :options="exportTypeList"
        v-model="exportDto.type"
        placeholder="Select type"
      >
      </a-input-select>
      <a-input-select
        v-if="exportDto.type == 1"
        name="userId"
        :options="driverList"
        v-model="exportDto.userId"
        placeholder="Select a driver"
      >
      </a-input-select>
      <a-input-text
        name="amount"
        v-model="exportDto.amount"
        placeholder="Amount of money"
        type="number"
      >
      </a-input-text>
      <a-input-datepicker
        name="date"
        v-model="exportDto.date"
        placeholder="DD/MM/YYYY"
      >
      </a-input-datepicker>
      <a-input-text
        name="note"
        v-model="exportDto.note"
        placeholder="Write Note"
      >
      </a-input-text>
    </template>
  </a-modal>
</template>
<script>
import fileDragDrop from "@core/components/file-drag-drop/file-drag-drop.vue";
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global";
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
    ...mapActions(["getDriverList", "export", "getExportTypes"]),
    search(text) {
      //this.getAdmins(text);
    },
    submitForm() {
      this.export({
        dto: this.exportDto,
        cb: () => {
          this.resetDto();
        },
      });
    },
    resetDto() {
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
