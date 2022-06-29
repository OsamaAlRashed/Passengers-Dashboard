<template>
  <div>
    <a-table :items="drivers" :columns="columns" no_select @row-click="getDetails">
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
      <template slot="items.bloodType" slot-scope="{ value }">
        {{ getBlood(value) }}
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
          <b-dropdown-item-button @click="openAddFixedAmount($event, props)"
            >Add fixed amount</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="openAddSalary($event, props)"
            >Add Salary</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="openAccountDetails($event, props)"
            >Account Details</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="openEditDriver($event, props)"
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
      :title="salaryDto.isAddSalary ? 'Add Salary' : 'Add Fixed Amount'"
      v-model="isManagePayment"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      @ok="submitManagePayment($event)"
      ref="form"
    >
      <a-input-select
        name="userId"
        :options="driverList"
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
    
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { editDriverEvent } from "@/libs/global-event";

export default {
  computed: {
    ...mapState({ drivers: (state) => state.drivers.drivers }),
    ...mapState({ genders: (state) => state.global.genders }),
    ...mapState({ driverList: (state) => state.global.driverList }),
    ...mapState({ bloodTypeList: (state) => state.global.bloodTypeList }),
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
        label: "Gender",
        field: "genderType",
      },
      {
        label: "Blood type",
        field: "bloodType",
      },
      {
        label: "Age",
        field: "age",
      },
      {
        label: "Fixed Amount",
        field: "fixedAmount",
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
      isAddSalary: false
    },
    isAccountDetails: false,
    isManagePayment: false,
  }),

  created() {
    this.getDrivers();
    this.genderTypes();
    this.getDriverList();
    this.getBloodTypes();
  },

  methods: {
    ...mapActions([
      "genderTypes",
      "getDrivers",
      "getDriver",
      "deleteDriver",
      "blockDriver",
      "getDriverList",
      "addSalary",
      "getBloodTypes",
      "export"
    ]),
    ...mapMutations(["Update_FixedAmount"]),
    openEditDriver(e, props) {
       e.stopPropagation();
       editDriverEvent(props.row)
    },

    openAddSalary(e, props) {
      e.stopPropagation();

      this.salaryDto.userId = props.row.id;
      this.salaryDto.isAddSalary = true;
      this.isManagePayment = !this.isManagePayment;
    },

    openAddFixedAmount(e, props) {
      e.stopPropagation();

      this.salaryDto.userId = props.row.id;
      this.salaryDto.amount = props.row.fixedAmount;
      this.salaryDto.isAddSalary = false;
      this.isManagePayment = !this.isManagePayment;
    },
    

    openAccountDetails(e, props) {
      e.stopPropagation();

      this.accountDetailsDto.userName = props.row.userName;
      this.accountDetailsDto.password = props.row.password;

      this.isAccountDetails = !this.isAccountDetails;
    },

    openBlock(props){
      //e.stopPropagation();
      this.blockDriver(props.row.id)
    },

    submitManagePayment(BvModalEvent) {
      BvModalEvent.preventDefault()
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.isManagePayment = false;
          if(this.salaryDto.isAddSalary){
            this.addSalary({
              dto: this.salaryDto,
              cb: () => {
                this.resetSalaryDto();
              },
            });
          }
          else{
            this.export({
              dto: this.salaryDto,
              cb: () => {
                this.resetSalaryDto();
              },
            });
            this.Update_FixedAmount({userId: this.salaryDto.userId, fixedAmount: this.salaryDto.amount})
          }
          this.$refs.form.close();
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
        isAddSalary: false 
      });
    },

    openDelete(e, props){
       e.stopPropagation();
       this.deleteDriver(props.row.id)
    },

    getDetails(props){
      this.$router.push("/drivers/" + props.row.id);
    },

    getGender(index){
      var ob = this.genders[this.genders.findIndex((x) => x.id == index)]
      if(ob){
        return ob.name
      }
      return "";
    },

    getBlood(index){
      var ob = this.bloodTypeList[this.bloodTypeList.findIndex((x) => x.id == index)]
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
