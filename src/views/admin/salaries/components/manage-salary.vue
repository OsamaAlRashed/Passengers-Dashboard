<template>
<validation-observer ref="observer">
  <a-modal
    size="md"
    title="Add Salary"
    btn_title="Add Salary"
    placeholder="search"
    @search="search"
    @ok="submitForm($event)"
    ref="form"
  >
    <template slot="body">
      <a-input-select
        name="userId"
        :options="adminList.concat(driverList)"
        v-model="salaryDto.userId"
        placeholder="Select admin or driver"
        :rules="[{ type: 'required', message: 'full name is required' }]"
        prepend
        prependIcon="Profile"
      >
      </a-input-select>
      <a-input-text
        name="amount"
        v-model="salaryDto.amount"
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
        v-model="salaryDto.date"
        placeholder="DD/MM/YYYY"
        :rules="[{ type: 'required', message: 'full name is required' }]"

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
</validation-observer>

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
    ...mapActions(["getSalaries", "getDriverList", "getAdminList", "addSalary"]),
    search(text) {
      this.getSalaries({ search: text});
    },
    submitForm(BvModalEvent) {
      BvModalEvent.preventDefault();
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.addSalary({
            dto: this.salaryDto,
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
