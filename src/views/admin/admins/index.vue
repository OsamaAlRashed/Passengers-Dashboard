<template>
  <div>
    <a-table :items="admins" :columns="columns" no_select @row-click="getDetails">
      <template slot="items.identifierImagePath" slot-scope="{ value, props }">
       <b-img
          style="border-radius: 16px;"
          width="48"
          height="48"
          :src="value ? $store.getters.domainHost + value : getDefaultImage(props.row.genderType)"
        >
        </b-img>
      </template>
      <template slot="items.genderType" slot-scope="{ value }">
        {{ getGender(value) }}
      </template>
      <template slot="items.isBlocked" slot-scope="{ value, props }">
        <b-checkbox
          switch
          :checked="value"
          @input="openBlock(props)"
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
          <b-dropdown-item-button @click="openAddSalary($event, props)"
            >Add Salary</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="openAccountDetails($event, props)"
            >Account Details</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="openEditAdmin($event, props)"
            >Edit</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="openDelete($event, props)"
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
        prepend
        prependIcon="Profile"
      >
      </a-input-text>
      <a-input-text
        name="password"
        value="xxxxxxx"
        placeholder="Password"
        prepend
        prependIcon="Lock"
        readonly
      >
      </a-input-text>
    </b-modal>
    <!-- Add Salary -->
    <validation-observer ref="observer">
      <b-modal
        title="Add Salary"
        v-model="isAddSalary"
        content-class="rounded-xl"
        shadow
        bg-variant="white"
        @ok="submitAddSalary($event)"
      >
      <a-input-select
        name="userId"
        :options="adminList"
        v-model="salaryDto.userId"
        placeholder=""
        prepend
        prependIcon="Profile"
        :rules="[
          { type: 'required', message: 'Admin is required' },
        ]"
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
          { type: 'required', message: 'money is required' },
          {
            type: 'min_value:1',
            message: 'money must be bigger than 0.',
          },
        ]"
      >
      </a-input-text>
      <a-input-datepicker
        name="date"
        v-model="salaryDto.date"
        placeholder="DD/MM/YYYY"
        :rules="[
          { type: 'required', message: 'date is required' },
        ]"
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
    
    <!-- Admin Details -->
    <b-modal
      v-model="isAdminDetails"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      :hide-footer="true"
      :hide-header="true"
    >
        <div class="mb-5" style="border-radius: 16px; background-color: #F5F5F5; height: 110px;">
            <div style="min-height: 98px;"></div>
            <div>
              <b-img
              style="border-radius: 16px; margin-left: 20px; margin-top: -12px;"
              width="64"
              height="64"
              :src="adminDetailsDto.path ? $store.getters.domainHost + adminDetailsDto.path : getDefaultImage(adminDetailsDto.genderType)"
              >
              </b-img>
              <strong class="ml-3">{{adminDetailsDto.fullName}}</strong>
            </div>
        </div>
        <div class="d-flex my-2 mt-3" v-if="adminDetailsDto.phoneNumber">
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Phone.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.phoneNumber}}</p>
        </div>
        <div class="d-flex my-2" v-if="adminDetailsDto.address">
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Pin location.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.address}}</p>
        </div>
        <div class="d-flex my-2"  v-if="adminDetailsDto.gender" >
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Gender.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.gender}}</p>
        </div>
        <div class="d-flex my-2"  v-if="adminDetailsDto.dob" >
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Cake.svg"></b-img>
            <p style="margin: inherit;">{{getDate(adminDetailsDto.dob)}}</p>
        </div>
        <div class="d-flex my-2" v-if="adminDetailsDto.salary" >
            <b-img class="mr-3" src="~@/assets/icons/outline/Icon-Outline-Bag money.svg"></b-img>
            <p style="margin: inherit;">{{adminDetailsDto.salary}}</p>
        </div>
    </b-modal>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { editAdminEvent } from "@/libs/global-event";

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
      userId: null,
      type: 1,
    },
    adminDetailsDto:{
        fullName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        genderType: 0,
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
      "addSalary"
    ]),

    openEditAdmin(e, props) {
       e.stopPropagation();
       editAdminEvent(props.row)
    },

    openAddSalary(e, props) {
      e.stopPropagation();

      this.salaryDto.userId = props.row.id;
      this.salaryDto.amount = props.row.salary;

      this.isAddSalary = !this.isAddSalary;
    },

    openAccountDetails(e, props) {
      e.stopPropagation();

      this.accountDetailsDto.userName = props.row.userName;
      this.accountDetailsDto.password = props.row.password;

      this.isAccountDetails = !this.isAccountDetails;
    },

    openBlock(props){
      //e.stopPropagation();
      this.blockAdmin(props.row.id)
    },

    submitAddSalary(BvModalEvent) {
      BvModalEvent.preventDefault()
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.addSalary({
            dto: this.salaryDto,
            cb: () => {
              this.resetSalaryDto();
            },
          });
          this.isAddSalary = false;
        }
      })
      
    },

    resetSalaryDto() {
      this.$refs.observer.reset();
      Object.assign(this.salaryDto, {
        date: new Date(),
        amount: 0,
        note: "",
        userId: null,
        type: 1,
      });
    },

    getDetails(props){
        this.adminDetailsDto.fullName = props.row.fullName;
        this.adminDetailsDto.phoneNumber = props.row.phoneNumber;
        this.adminDetailsDto.address = props.row.addressText;
        this.adminDetailsDto.genderType = props.row.genderType;
        this.adminDetailsDto.gender = this.genders[this.genders.findIndex((x) => x.id == props.row.genderType)]?.name ?? "";
        this.adminDetailsDto.dob = props.row.dob;
        this.adminDetailsDto.salary = props.row.salary;
        this.adminDetailsDto.path = props.row.identifierImagePath;

        this.isAdminDetails = !this.isAdminDetails;
    },

    openDelete(e, props){
       e.stopPropagation();
       this.deleteAdmin(props.row.id)
    },

    getGender(index){
      var ob = this.genders[this.genders.findIndex((x) => x.id == index)]
      if(ob){
        return ob.name
      }
      return "";
    },

    getDate(data) {
      if (data) {
        return new Date(data).toLocaleDateString("en-GB", { timeZone: "UTC" });
      }
      return "";
    },

    getDefaultImage(gender){
      return require(`@/assets/images/default image/${gender == 1 ? 'Male' : 'Female'}.svg`);
    }
  },
};
</script>
