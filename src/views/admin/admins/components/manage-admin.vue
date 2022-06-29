<template>
  <validation-observer ref="observer">
    <a-modal
      size="lg"
      :title="isEdit() ? 'Edit Admin' : 'Add Admin'"
      btn_title="Add admin"
      ref="form"
      placeholder="search"
      @search="search"
      @ok="submitForm($event)"
      :isEdit="isEdit()"
      @delete="deleteAdmin(adminDto.id)"
      @close="resetDto()"
    >
      <template slot="body">
        <b-row>
          <b-form-group label="">
            <fileDragDrop
              @inValidFile="unValidThumbImage"
              @uploaded="uploadThumbImage"
              id="adminImage"
              height="50px"
              type="image"
              title="click to choose image or drop file here"
              class="ml-4"
            />
            <img
              v-if="adminDto.imagePath || adminDto.imageFile"
              :src="
                adminDto.imageFile ||
                $store.getters['app/domainHost'] + '/' + adminDto.imagePath
              "
              width="128px;"
              style="object-fit: fill"
              class="ml-4"
            />
          </b-form-group>
        </b-row>
        <b-row>
          <b-col cols="6">
            <a-input-text
              name="fullName"
              v-model="adminDto.fullName"
              placeholder="Full name"
              prepend
              prependIcon="Profile"
              :rules="[{ type: 'required', message: 'full name is required' }]"
            >
            </a-input-text>
          </b-col>
          <b-col cols="6">
            <a-input-text
              name="salary"
              v-model="adminDto.salary"
              placeholder="salary"
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
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <a-input-text
              name="phoneNumber"
              v-model="adminDto.phoneNumber"
              placeholder="Phone number"
              type="number"
              prepend
              prependIcon="Phone"
              :rules="[
                { type: 'required', message: 'Phone number is required' },
              ]"
            >
            </a-input-text>
          </b-col>
          <b-col cols="6">
            <a-input-datepicker
              name="dob"
              v-model="adminDto.dob"
              placeholder="DD/MM/YYYY"
              :max="new Date()"
            >
            </a-input-datepicker>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <a-input-text
              name="address"
              v-model="adminDto.addressText"
              placeholder="Home Address"
              prepend
              prependIcon="Pin location"
            >
            </a-input-text>
          </b-col>
          <b-col cols="6">
            <a-input-select
              name="genderType"
              :options="genders"
              v-model="adminDto.genderType"
              placeholder="Gender"
              prepend
              prependIcon="Gender"
            >
            </a-input-select>
          </b-col>
        </b-row>
      </template>
    </a-modal>
  </validation-observer>
</template>
<script>
import fileDragDrop from "@core/components/file-drag-drop/file-drag-drop.vue";
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global";
import { onEditAdminEvent } from "@/libs/listeners";
export default {
  computed: {
    ...mapState({ genders: (state) => state.global.genders }),
  },
  mounted() {
    onEditAdminEvent((payload) => {
      this.$refs.form.open();

      Object.assign(this.adminDto, {
        id: payload.id,
        imageFile: payload.imageFile,
        imagePath: payload.imagePath,
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        addressText: payload.addressText,
        genderType: payload.genderType,
        salary: payload.salary,
        dob: payload.dob,
        password: payload.password,
      });
    });
  },
  components: {
    fileDragDrop,
  },
  data: () => ({
    adminDto: {
      id: nullGuid,
      imageFile: null,
      imagePath: "",
      userName: "",
      fullName: "",
      phoneNumber: "",
      addressText: "",
      genderType: 0,
      salary: 0,
      dob: new Date(),
      password: "",
    },
  }),
  created() {
    this.genderTypes();
  },
  methods: {
    ...mapActions(["genderTypes", "addAdmin", "updateAdmin", "getAdmins"]),
    isEdit() {
      return this.adminDto.id != nullGuid;
    },
    search(text) {
      this.getAdmins({ text: text });
    },
    uploadThumbImage(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (() => {
        this.adminDto.imageFile = reader.result;
      }).bind(this);
    },
    unValidThumbImage() {},
    submitForm(BvModalEvent) {
      BvModalEvent.preventDefault();
      this.$refs.observer.validate().then((success) => {
        if (success) {
          if (!this.isEdit()) {
            this.addAdmin({
              dto: this.adminDto,
              cb: () => {
                this.resetDto();
              },
            });
          } else {
            this.updateAdmin({
              dto: this.adminDto,
              cb: () => {
                this.resetDto();
              },
            });
          }
          this.$refs.form.close();
        }
      });
    },
    resetDto() {
      this.$refs.observer.reset();
      Object.assign(this.adminDto, {
        id: nullGuid,
        imageFile: null,
        imagePath: "",
        fullName: "",
        phoneNumber: "",
        addressText: "",
        genderType: 0,
        salary: 0,
        dob: new Date(),
        password: "",
      });
    },
  },
};
</script>
