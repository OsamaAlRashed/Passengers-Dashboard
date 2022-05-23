<template>
  <a-modal
    size="md"
    title="Add Import"
    btn_title="Add Import"
    placeholder="search"
    @search="search"
    @ok="submitForm"
  >
    <template slot="body">
      <a-input-select
        name="type"
        :options="importTypeList"
        v-model="importDto.type"
        placeholder="Select type"
      >
      </a-input-select>
      <a-input-select
        v-if="importDto.type == 1 || importDto.type == 2"
        name="userId"
        :options="driverList"
        v-model="importDto.userId"
        placeholder="Select a driver"
      >
      </a-input-select>
      <a-input-text
        name="amount"
        v-model="importDto.amount"
        placeholder="Amount of money"
        type="number"
      >
      </a-input-text>
      <a-input-datepicker
        name="date"
        v-model="importDto.date"
        placeholder="DD/MM/YYYY"
      >
      </a-input-datepicker>
      <a-input-text
        name="note"
        v-model="importDto.note"
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
    ...mapActions(["getDriverList", "import", "getImportTypes"]),
    search(text) {
      //this.getAdmins(text);
    },
    submitForm() {
      this.import({
        dto: this.importDto,
        cb: () => {
          this.resetDto();
        },
      });
    },
    resetDto() {
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
