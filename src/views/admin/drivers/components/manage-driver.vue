<template>
<validation-observer ref="observer">
  <a-modal
    size="lg"
    :title="isEdit() ? 'Edit Driver' : 'Add Driver'"
    btn_title="Add driver"
    ref="form"
    placeholder="search"
    @search="search"
    @ok="submitForm($event)"
    :isEdit="isEdit()"
    @delete="deleteDriver(driverDto.id)"
  >
    <template slot="body">
      <b-row>
        <b-form-group label="">
          <fileDragDrop
            @inValidFile="unValidThumbImage"
            @uploaded="uploadThumbImage"
            id="driverImage"
            height="50px"
            type="image"
            title="click to choose image or drop file here"
            class="ml-4"
          />
          <img
            v-if="driverDto.imagePath || driverDto.imageFile"
            :src="
              driverDto.imageFile ||
              $store.getters['app/domainHost'] + '/' + driverDto.imagePath
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
            v-model="driverDto.fullName"
            placeholder="Full name"
            prepend
            prependIcon="Profile"
            :rules="[{ type: 'required', message: 'full name is required' }]"
          >
          </a-input-text>
        </b-col>
        <b-col cols="6">
          <a-input-text
            name="address"
            v-model="driverDto.address"
            placeholder="Home Address"
            prepend
            prependIcon="Pin location"
            :rules="[{ type: 'required', message: 'full name is required' }]"
          >
          </a-input-text>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <a-input-text
            name="phoneNumber"
            v-model="driverDto.phoneNumber"
            placeholder="Phone number"
            type="number"
            prepend
            prependIcon="Phone"
            :rules="[{ type: 'required', message: 'full name is required' }]"
          >
          </a-input-text>
        </b-col>
        <b-col cols="6">
          <a-input-datepicker
            name="dob"
            v-model="driverDto.dob"
            placeholder="DD/MM/YYYY"
            :max-date="new Date()"
            :rules="[{ type: 'required', message: 'full name is required' }]"
          >
          </a-input-datepicker>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <a-input-select
            name="genderType"
            :options="genders"
            v-model="driverDto.genderType"
            placeholder="Gender"
            prepend
            prependIcon="Arrow-Down 1"
            :rules="[{ type: 'required', message: 'full name is required' }]"
          >
          </a-input-select>
        </b-col>
        <b-col cols="6">
          <a-input-select
            name="bloodType"
            :options="bloodTypeList"
            v-model="driverDto.bloodType"
            placeholder="Blood Type"
            prepend
            prependIcon="Blood"
            :rules="[{ type: 'required', message: 'full name is required' }]"
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
import { onEditDriverEvent } from "@/libs/listeners";
export default {
  computed: {
    ...mapState({ genders: (state) => state.global.genders }),
    ...mapState({ bloodTypeList: (state) => state.global.bloodTypeList }),
  },
  mounted() {
    onEditDriverEvent((payload) => {
      this.$refs.form.open();

      Object.assign(this.driverDto, {
        id: payload.id,
        imageFile: payload.imageFile,
        imagePath: payload.imagePath,
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        addressText: payload.addressText,
        genderType: payload.genderType,
        bloodType: payload.bloodType,
        dob: payload.dob,
      });
    });
  },
  components: {
    fileDragDrop,
  },
  data: () => ({
    driverDto: {
      id: nullGuid,
      imageFile: null,
      imagePath: "",
      fullName: "",
      phoneNumber: "",
      addressText: "",
      genderType: 0,
      bloodType: 0,
      dob: new Date(),
    },
  }),
  created() {
    this.genderTypes();
    this.getBloodTypes();
  },
  methods: {
    ...mapActions([
      "genderTypes",
      "addDriver",
      "updateDriver",
      "getDrivers",
      "getBloodTypes",
    ]),
    isEdit() {
      return this.driverDto.id != nullGuid;
    },
    search(text) {
      //this.getDrivers(text);
    },
    uploadThumbImage(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (() => {
        this.driverDto.imageFile = reader.result;
      }).bind(this);
    },
    unValidThumbImage() {},
    submitForm(BvModalEvent) {
      BvModalEvent.preventDefault();
      this.$refs.observer.validate().then((success) => {
        if (success) {
          if (!this.isEdit()) {
            this.addDriver({
              dto: this.driverDto,
              cb: () => {
                this.resetDto();
              },
            });
          } else {
            this.updateDriver({
              dto: this.driverDto,
              cb: () => {
                this.resetDto();
              },
            });
          }
        }
      });
    },
    resetDto() {
      Object.assign(this.driverDto, {
        id: nullGuid,
        imageFile: null,
        imagePath: "",
        fullName: "",
        phoneNumber: "",
        addressText: "",
        genderType: 0,
        bloodType: 0,
        dob: new Date(),
      });
    },
  },
};
</script>
