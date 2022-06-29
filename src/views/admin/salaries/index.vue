<template>
  <b-row>
    <b-col cols="9">
      <a-table :items="salaries" :columns="columns" no_select>
        <template slot="items.userId" slot-scope="{ value }">
          {{ getUserName(value) }}
        </template>
        <template slot="items.actionBy" slot-scope="{ value }">
          {{ getUserName(value) }}
        </template>
        <template slot="items.date" slot-scope="{ value }">
          {{ getDate(value) }}
        </template>
        <template slot="items.dateCreated" slot-scope="{ value }">
          {{ getDate(value) }}
        </template>
        <template slot="items.dateUpdated" slot-scope="{ value }">
          {{ getDate(value) }}
        </template>
        <template slot="items.dateDeleted" slot-scope="{ value }">
          {{ getDate(value) }}
        </template>
        <template slot="items.details" slot-scope="{ props }">
          <b-dropdown
            size="sm"
            right
            text="Right align"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <b-button
                size="sm"
                variant="flat-secondary"
                class="btn-icon rounded-circle"
                style="padding: 2px 6px !important"
              >
                <i class="mdi mdi-dots-vertical"></i>
              </b-button>
            </template>
            <b-dropdown-item-button @click="openEdit(props.row.id)">Edit</b-dropdown-item-button
            >
            <b-dropdown-item-button @click="deletePayment({id: props.row.id, type: 'salary'})">Delete</b-dropdown-item-button>
          </b-dropdown>
        </template>
      </a-table>
    </b-col>
    <b-col cols="3">
      <vue-monthly-picker
        selectedBackgroundColor="red"
        :monthLabels="[
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]"
        @selected="selectDate"
      >
      </vue-monthly-picker>
    </b-col>
    <!-- Edit Salary -->
    <validation-observer ref="observer">
      <b-modal
        title="Edit Salary"
        v-model="isEditSalary"
        content-class="rounded-xl"
        shadow
        bg-variant="white"
        @ok="submitEditSalary($event)"
        size="md"
      >
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
      </b-modal>
    </validation-observer>
  </b-row>
</template>

<style>
.date-popover {
  background-color: white;
  border-radius: 16px;
}
</style>

<script>
import { mapActions, mapState } from "vuex";
import moment from 'moment';

export default {
  computed: {
    ...mapState({ salaries: (state) => state.payments.salaries }),
    ...mapState({ userList: (state) => state.global.userList }),
  },
  data: () => ({
    columns: [
      {
        label: "Name",
        field: "userId",
      },
      {
        label: "Value",
        field: "amount",
        sortable: false,
      },
      {
        label: "Action By",
        field: "actionBy",
      },
      {
        label: "Date",
        field: "date",
      },
      {
        label: "Created at",
        field: "dateCreated",
      },
      {
        label: "Last Updated",
        field: "dateUpdated",
      },
      {
        label: "Note",
        field: "note",
        sortable: false,
      },
      {
        label: "Deleted At",
        field: "dateDeleted",
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
    isEditSalary: false,
    salaryDto: {
      date: new Date(),
      amount: 0,
      note: "",
      userId: null,
      type: 1,
    }
  }),
  created() {
    this.getSalaries();
    this.getUserList();
  },
  methods: {
    ...mapActions(["getSalaries", "getUserList", "deletePayment", "updatePayment", "getPayment"]),
    selectDate(moment) {
      var date = moment._i.split("/");
      var year = parseInt(date[0]);
      var month = parseInt(date[1]);
      this.getSalaries({ year: year, month: month });
    },
    getUserName(id) {
      if (id != null) {
        var index = this.userList.findIndex((x) => x.id == id);
        if (index != -1) return this.userList[index].name;
      }
      return "";
    },
    getDate(data) {
      if (data) {
        return new Date(data).toLocaleDateString("en-GB", { timeZone: "UTC" });
      }
      return "-";
    },
    submitEditSalary(BvModalEvent) {
      BvModalEvent.preventDefault();
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.updatePayment({
            dto: this.salaryDto,
            type: "salary",
            cb: () => {
              this.resetDto();
            },
          });
          this.isEditSalary = false;
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
    openEdit(id){
      this.getPayment({ id: id, cb: ({data}) => {
          Object.assign(this.salaryDto, data)
      }})
      this.isEditSalary = !this.isEditSalary
    },
    moment
  },
};
</script>