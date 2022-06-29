<template>
  <b-row>
    <b-col cols="9">
      <a-table :items="imports" :columns="columns" no_select>
        <template slot="items.userId" slot-scope="{ value }">
          {{ getUserName(value) }}
        </template>
        <template slot="items.type" slot-scope="{ value }">
          {{ getImportType(value) }}
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
            <b-dropdown-item-button @click="deletePayment({id: props.row.id, type: 'import'})">Delete</b-dropdown-item-button>
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
    <!-- Edit Import -->
     <validation-observer ref="observer">
         <b-modal
      title="Edit Import"
      v-model="isEditImport"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      @ok="submitEditImport($event)"
      size="md"
    >
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

export default {
  computed: {
    ...mapState({ imports: (state) => state.payments.imports }),
    ...mapState({ userList: (state) => state.global.userList }),
    ...mapState({ importTypeList: (state) => state.global.importTypeList }),

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
    isEditImport: false,
    importDto: {
      date: new Date(),
      amount: 0,
      note: "",
      userId: null,
      type: 0,
    }
  }),
  created() {
    this.getImports();
    this.getUserList();
    this.getImportTypes()
  },
  methods: {
    ...mapActions(["getImports", "getUserList", "deletePayment", "updatePayment", "getPayment", "getImportTypes"]),
    selectDate(moment) {
      var date = moment._i.split("/");
      var year = parseInt(date[0]);
      var month = parseInt(date[1]);
      this.getImports({ year: year, month: month });
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
    submitEditImport(BvModalEvent) {
      BvModalEvent.preventDefault();
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.updatePayment({
            dto: this.importDto,
            type: "import",
            cb: () => {
              this.resetDto();
            },
          });
          this.isEditImport = false;
        }
      })
      
    },
    resetDto() {
      Object.assign(this.importDto, {
        date: new Date(),
        amount: 0,
        note: "",
        userId: null,
        type: 1,
      });
    },
    openEdit(id){
      this.getPayment({ id: id, cb: ({data}) => {
          Object.assign(this.importDto, data)
      }})
      this.isEditImport = !this.isEditImport
    },
    getImportType(id) {
      if (id != null) {
        var index = this.importTypeList.findIndex((x) => x.id == id);
        if (index != -1) return this.importTypeList[index].name;
      }
      return "";
    },
  },
};
</script>