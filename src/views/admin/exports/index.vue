<template>
  <b-row>
    <b-col cols="9">
      <a-table :items="exports" :columns="columns" no_select>
        <template slot="items.userId" slot-scope="{ value }">
          {{ getUserName(value) }}
        </template>
        <template slot="items.type" slot-scope="{ value }">
          {{ getExportType(value) }}
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
            <b-dropdown-item-button @click="deletePayment({id: props.row.id, type: 'export'})">Delete</b-dropdown-item-button>
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
    <!-- Edit Export -->
    <b-modal
      title="Edit Export"
      v-model="isEditExport"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      @ok="submitEditExport"
      size="md"
    >
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
    </b-modal>
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
import { nullGuid } from "../../../core/util/global";

export default {
  computed: {
    ...mapState({ exports: (state) => state.payments.exports }),
    ...mapState({ userList: (state) => state.global.userList }),
    ...mapState({ exportTypeList: (state) => state.global.exportTypeList }),

  },
  data: () => ({
    columns: [
      {
        label: "Name",
        field: "userId",
      },
      {
        label: "Type",
        field: "type",
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
    isEditExport: false,
    exportDto: {
      date: new Date(),
      amount: 0,
      note: "",
      userId: null,
      type: 0,
    }
  }),
  created() {
    this.getExports();
    this.getUserList();
    this.getExportTypes()
  },
  methods: {
    ...mapActions(["getExports", "getUserList", "deletePayment", "updatePayment", "getPayment", "getExportTypes"]),
    selectDate(moment) {
      var date = moment._i.split("/");
      var year = parseInt(date[0]);
      var month = parseInt(date[1]);
      this.getExports({ year: year, month: month });
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
      return "";
    },
    submitEditExport() {
      this.updatePayment({
        dto: this.exportDto,
        type: "export",
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
        type: 1,
      });
    },
    openEdit(id){
      this.getPayment({ id: id, cb: ({data}) => {
          Object.assign(this.exportDto, data)
      }})
      this.isEditExport = !this.isEditExport
    },
    getExportType(id) {
      if (id != null) {
        var index = this.exportTypeList.findIndex((x) => x.id == id);
        if (index != -1) return this.exportTypeList[index].name;
      }
      return "";
    },
  },
};
</script>