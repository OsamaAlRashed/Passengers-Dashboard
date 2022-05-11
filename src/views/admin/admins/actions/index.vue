<template>
  <a-modal
    size="lg"
    :title="isEdit() ? 'Edit Admin' : 'Add Admin'"
    btn_title="Add admin"
    ref="countryDialog"
    placeholder="search"
  >
    <template slot="body">
      <b-row>
        <b-col cols="6">
          <a-input-text
            name="name"
            v-model="adminDto.fullName"
            placeholder="enter name"
            >
          </a-input-text>
        </b-col>
        <b-col cols="6">
          <a-input-text
          name="name"
          v-model="adminDto.fullName"
          placeholder="enter name"
          >
        </a-input-text>
        </b-col> 
      </b-row>
    </template>
  </a-modal>
</template>
<script>
import { nullGuid } from "@core/util/global";
export default {
  data: () => ({
    adminDto: {
      id: nullGuid,
      fullName: "",
      phoneNumber: "",
      addressText: "",
      userName: "",
      genderType: 0,
      salary: 0,
      age: 0,
      identifierImagePath: "",
      isBlocked: false,
    },
  }),
  methods: {
    isEdit() {
      return this.adminDto.id != nullGuid;
    },
  },
};
</script>
