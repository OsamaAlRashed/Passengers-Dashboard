<template>
    <div>
        <a-table :items="admins" :columns="columns" no_select>
          <template slot="items.identifierImagePath" scope-slot="{ value }">
            <b-img circle :src="$store.getters.domainHost">

            </b-img>
          </template>
          <template slot="items.genderType" scope-slot="{ value }">
          </template>
          <template slot="items.details" scope-slot="{ props }">
              <b-dropdown size="sm" right text="Right align" variant="link" toggle-class="text-decoration-none" no-caret>
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
                <b-dropdown-item href="#">Add Salary</b-dropdown-item>
                <b-dropdown-item href="#">Account Details</b-dropdown-item>
                <b-dropdown-item href="#">Edit</b-dropdown-item>
                <b-dropdown-item href="#">Delete</b-dropdown-item>
            </b-dropdown>
          </template>
        </a-table>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { nullGuid } from '@core/util/global'

export default{

    computed:{
        ...mapState({admins: (state) => state.admins.admins })
    },

    data:() => ({
        columns:[
            {
                label: "",
                field: "identifierImagePath",
                sortable: false
            },
            {
                label: "Name",
                field: "fullName",
            },
            {
                label: "Phone number",
                field: "phoneNumber",
                sortable: false
            },
            {
                label: "Address",
                field: "addressText",
                sortable: false
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
                sortable: false
            },
            {
                label: "details",
                field: "details",
                sortable: false
            },
        ],
        gender: ["", "male", "female"]
    }),

    created(){
        this.getAdmins();
    },

    methods:{
        ...mapActions(['getAdmins','addAdmin','getAdmin','updateAdmin', 'deleteAdmin']),

        openAdd(){
            this.$refs.adminDialog.open();
        },

        openDetails(props){
            this.getAdmin({ id: props.row.id, cb: ({data}) => {
                Object.assign(this.adminDto, data)
            }})
            this.$refs.adminDialog.open();
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
            Object.assign(this.adminDto, {
                id: nullGuid,
                name: ""
            })
        },

        

        deleteAdmin(ids){
            console.log(ids)
        }
    },
    
}


</script>
