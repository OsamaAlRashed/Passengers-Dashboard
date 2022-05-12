<template>
  <div>
    <a-table :items="admins" :columns="columns" no_select @row-click="getDetails">
      <template slot="items.identifierImagePath" slot-scope="{ value }">
        <b-img
          style="border-radius: 16px;"
          width="48"
          height="48"
          :src="$store.getters.domainHost + value"
        >
        </b-img>
      </template>
      <template slot="items.genderType" slot-scope="{ value }">
        {{ genders[genders.findIndex((x) => x.id == value)].name }}
      </template>
      <template slot="items.isBlocked" slot-scope="{ value, props }">
        <b-checkbox
          switch
          :checked="value"
          @input="blockAdmin(props.row.id)"
        ></b-checkbox>
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
          <b-dropdown-item-button @click="openAddSalary(props)"
            >Add Salary</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="openAccountDetails(props)"
            >Account Details</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="openEditAdmin(props)"
            >Edit</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="deleteAdmin(props.row.id)"
            >Delete</b-dropdown-item-button
          >
        </b-dropdown>
      </template>
    </a-table>

    <!-- Account Details -->
    <b-modal
      title="Account Details"
      v-model="isAccountDetails"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      :hide-footer="true"
    >
      <a-input-text
        name="userName"
        v-model="accountDetailsDto.userName"
        placeholder="Username"
        readonly
      >
      </a-input-text>
      <a-input-text
        name="password"
        v-model="accountDetailsDto.password"
        placeholder="Password"
        type="number"
      >
      </a-input-text>
    </b-modal>
    <!-- Add Salary -->
    <b-modal
      title="Add Salary"
      v-model="isAddSalary"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      @ok="submitAddSalary"
    >
      <a-input-select
        name="userId"
        :options="adminList"
        v-model="salaryDto.userId"
        placeholder=""
      >
      </a-input-select>
      <a-input-text
        name="amount"
        v-model="salaryDto.amount"
        placeholder="Amount of money"
        type="number"
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
      >
      </a-input-text>
    </b-modal>
    <!-- Admin Details -->
    <b-modal
      v-model="isAdminDetails"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      :hide-footer="true"
      :hide-header="true"
    >
        <div class="mb-5" style="border-radius: 16px; background-color: #F5F5F5; height: 110px;" >
            <b-img
            style="border-radius: 16px; margin-left: 20px; margin-top: 75px;"
            width="64"
            height="64"
            :src="$store.getters.domainHost + adminDetailsDto.path"
            >
            </b-img>
        </div>
        <div class="d-flex my-2">
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Phone.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.phoneNumber}}</p>
        </div>
        <div class="d-flex my-2">
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Pin location.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.address}}</p>
        </div>
        <div class="d-flex my-2">
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Gender.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.gender}}</p>
        </div>
        <div class="d-flex my-2">
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Cake.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.dob}}</p>
        </div>
        <div class="d-flex my-2">
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Bag money.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.salary}}</p>
        </div>
    </b-modal>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "../../../core/util/global";

export default {
  computed: {
    ...mapState({ admins: (state) => state.admins.admins }),
    ...mapState({ genders: (state) => state.global.genders }),
    ...mapState({ adminList: (state) => state.global.adminList }),
  },

  data: () => ({
    columns: [
      {
        label: "",
        field: "identifierImagePath",
        sortable: false,
      },
      {
        label: "Name",
        field: "fullName",
      },
      {
        label: "Phone number",
        field: "phoneNumber",
        sortable: false,
      },
      {
        label: "Address",
        field: "addressText",
        sortable: false,
      },
      {
        label: "Gender",
        field: "genderType",
      },
      {
        label: "Age",
        field: "age",
      },
      {
        label: "Salary",
        field: "salary",
      },
      {
        label: "Block",
        field: "isBlocked",
        sortable: false,
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
    accountDetailsDto: {
      userName: "",
      password: "",
    },
    salaryDto: {
      date: new Date(),
      amount: 0,
      note: "",
      userId: nullGuid,
      type: 1,
    },
    adminDetailsDto:{
        phoneNumber: "",
        address: "",
        gender: 0,
        dob: new Date(),
        salary: "",
        path: ""
    },
    isAccountDetails: false,
    isAddSalary: false,
    isAdminDetails: false
  }),

  created() {
    this.getAdmins();
    this.genderTypes();
    this.getAdminList();
  },

  methods: {
    ...mapActions([
      "genderTypes",
      "getAdmins",
      "getAdmin",
      "deleteAdmin",
      "blockAdmin",
      "getAdminList",
      "addPayment"
    ]),

    openAdd() {
      this.$refs.adminDialog.open();
    },

    openEditAdmin(props) {
      this.$refs.adminDialog.open();
    },

    openAddSalary(props) {
      this.salaryDto.userId = props.row.id;
      this.salaryDto.amount = props.row.salary;

      this.isAddSalary = !this.isAddSalary;
    },
    openAccountDetails(props) {
      this.accountDetailsDto.userName = props.row.userName;
      this.accountDetailsDto.password = props.row.password;

      this.isAccountDetails = !this.isAccountDetails;
    },

    submitAddSalary() {
      this.addPayment({
        dto: this.salaryDto,
        cb: () => {
          this.resetSalaryDto();
        },
      });
    },

    resetSalaryDto() {
      Object.assign(this.salaryDto, {
        date: new Date(),
        amount: 0,
        note: "",
        userId: nullGuid,
        type: 1,
      });
    },

    getDetails(props){
        this.adminDetailsDto.phoneNumber = props.row.phoneNumber;
        this.adminDetailsDto.address = props.row.addressText;
        this.adminDetailsDto.gender = this.genders[this.genders.findIndex((x) => x.id == props.row.genderType)]?.name ?? "";
        this.adminDetailsDto.dob = props.row.dob;
        this.adminDetailsDto.salary = props.row.salary;
        this.adminDetailsDto.path = props.row.identifierImagePath;

        this.isAdminDetails = !this.isAdminDetails;
    }
  },
};
</script>
