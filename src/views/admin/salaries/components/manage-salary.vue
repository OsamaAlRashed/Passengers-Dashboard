<template>
  <a-modal
    size="md"
    title="Add Salary"
    btn_title="Add Salary"
    placeholder="search"
    @search="search"
    @ok="submitForm"
  >
    <template slot="body">
      <a-input-select
        name="userId"
        :options="adminList.concat(driverList)"
        v-model="salaryDto.userId"
        placeholder="Select admin or driver"
      >
      </a-input-select>
      <a-input-text
        name="amount"
        v-model="salaryDto.amount"
        placeholder="Amount of money"
        type="number"
        prepend
        prependIcon="Bag money"
      >
      </a-input-text>
      <a-input-datepicker
        name="date"
        v-model="salaryDto.date"
        placeholder="DD/MM/YYYY"
      >
      </a-input-datepicker>
      <a-input-text
        name="note"
        v-model="salaryDto.note"
        placeholder="Write Note"
        prepend
        prependIcon="File"
      >
      </a-input-text>
    </template>
  </a-modal>
</template>
<script>
import fileDragDrop from "@core/components/file-drag-drop/file-drag-drop.vue";
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({ genders: (state) => state.global.genders }),
    ...mapState({ adminList: (state) => state.global.adminList }),
    ...mapState({ driverList: (state) => state.global.driverList }),
  },
  components: {
    fileDragDrop,
  },
  data: () => ({
    salaryDto: {
      date: new Date(),
      amount: 0,
      note: "",
      userId: null,
      type: 1,
    },
  }),
  created() {
    this.getAdminList();
    this.getDriverList();
  },
  methods: {
    ...mapActions(["getDriverList", "getAdminList", "addSalary"]),
    search(text) {
      //this.getAdmins(text);
    },
    submitForm() {
      this.addSalary({
        dto: this.salaryDto,
        cb: () => {
          this.resetDto();
        },
      });
    },
    resetDto() {
      Object.assign(this.salaryDto, {
        date: new Date(),
        amount: 0,
        note: "",
        userId: null,
        type: 1,
      });
    },
  },
};
</script>
