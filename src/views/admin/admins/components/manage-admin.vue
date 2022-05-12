<template>
  <a-modal
    size="lg"
    :title="isEdit() ? 'Edit Admin' : 'Add Admin'"
    btn_title="Add admin"
    ref="adminDialog"
    placeholder="search"
    @search="search"
    @ok="submitForm"
    :isEdit="isEdit()"
    @delete="deleteAdmin(adminDto.id)"
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
                style="object-fit: fill;"
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
            >
          </a-input-text>
        </b-col>
        <b-col cols="6">
          <a-input-text
          name="salary"
          v-model="adminDto.salary"
          placeholder="salary"
          type="number"
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
            >
          </a-input-text>
        </b-col>
        <b-col cols="6">
          <a-input-datepicker
            name="dob"
            v-model="adminDto.dob"
            placeholder="DD/MM/YYYY"
            :max-date="new Date()"
          >
        </a-input-datepicker>
        </b-col> 
      </b-row>
      <b-row>
        <b-col cols="6">
          <a-input-text
            name="address"
            v-model="adminDto.address"
            placeholder="Home Address"
          >
          </a-input-text>
        </b-col>
        <b-col cols="6">
          <a-input-select
            name="genderType"
            :options="genders"
            v-model="adminDto.genderType"
            placeholder="Gender"
          >
        </a-input-select>
        </b-col> 
      </b-row>
    </template>
  </a-modal>
</template>
<script>
import fileDragDrop from "@core/components/file-drag-drop/file-drag-drop.vue";
import { mapActions, mapState } from 'vuex'
import { nullGuid } from "@core/util/global";
export default {
  computed:{
    ...mapState({genders: (state) => state.global.genders })
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
  created(){
        this.genderTypes();
  },
  methods: {
    ...mapActions(['genderTypes', "addAdmin", "updateAdmin", "getAdmins"]),
    isEdit() {
      return this.adminDto.id != nullGuid;
    },
    search(text){
      //this.getAdmins(text);
    },
    uploadThumbImage(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (() => {
            this.adminDto.imageFile = reader.result;
        }).bind(this);
    },
    unValidThumbImage() {
      console.log("un valid Thumb file");
    },
    submitForm(){
        if(!this.isEdit()){
            this.addAdmin({ dto: this.adminDto, cb: () => {
                this.resetDto()
            }})
        }
        else{
            this.updateAdmin({ dto: this.adminDto, cb: () => {
                this.resetDto()
            }})
        }
    },
    resetDto(){
        Object.assign(this.countryDto, {
            id: nullGuid,
            name: ""
        })
    },
  },
};
</script>
