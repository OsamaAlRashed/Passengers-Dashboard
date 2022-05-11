<template>
    <div>
        <b-card no-body class="mb-2">
            <b-card-header v-if="isPlus || (!no_select && !no_delete) || title" class="py-0 d-flex align-items-center">
                <slot name="header">
                    <b-button
                        size="sm"
                        variant="flat-secondary"
                        class="btn-icon rounded-circle mr-auto"
                        style="box-shadow: none!important;"
                        @click="$emit('plus')"
                        v-if="isPlus"
                    >
                      <i class="mdi mdi-plus" style="font-size: 20px;"></i>
                    </b-button>
                    <h6 class="mb-0 title" v-if="title">{{title}}</h6>
                    <b-button
                        size="sm"
                        variant="flat-secondary"
                        class="btn-icon rounded-circle ml-auto"
                        style="box-shadow: none!important;"
                        @click="getSelectedRows()"
                        v-if="!no_select && !no_delete"
                        :disabled="isNotSelectedRows"
                    >
                        <i class="mdi mdi-delete-outline" style="font-size: 20px;"></i>
                    </b-button>
                </slot>
            </b-card-header>
            <b-card-body class="p-0">
                <vue-good-table
                    v-if="list.length > 0"
                    @on-selected-rows-change="selectionChanged"
                    :columns="columns"
                    :rows="activeItemsList"
                    :rtl="false"
                    v-bind="$attrs"
                    :small="true"
                    styleClass="vgt-table condensed"
                    ref="table"
                    @on-sort-change="onSortChange"
                    :select-options="{
                        enabled: !no_select,
                        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                        disableSelectInfo: true, // disable the select info panel on top
                        selectAllByGroup: true // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                    }"
                >
                    <template slot="table-column" slot-scope="props">
                           <slot :name="'headers'" :props="props">
                        <slot :name="'headers.' + props.column.field" :props="props">
                            {{props.column.label}}
                        </slot>
                           </slot>
                    </template>
                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field === 'details'">
                            <slot name="items.details" :props="props">
                                <b-button
                                    size="sm"
                                    variant="flat-secondary"
                                    class="btn-icon rounded-circle"
                                    style="padding: 2px 6px !important"
                                    @click="details(props)"
                                >
                                  <i class="mdi mdi-dots-vertical"></i>
                                </b-button>
                            </slot>
                        </span>
                        <span v-else>
                            <slot :name="'items.' + props.column.field" :value="props.formattedRow[props.column.field]" :props="props">
                                {{ props.formattedRow[props.column.field] }}
                            </slot>
                        </span>
                    </template>
                </vue-good-table>
                <div v-else class="text-center justify-content-center mt-2">
                    <h6 class="title"><small>{{$t('empty')}}</small></h6>
                </div>
            </b-card-body>
            <b-card-footer v-if="!no_footer" class="p-1 border-top-0"></b-card-footer>
        </b-card>
        <b-col cols="12" v-if="list.length > 0" class="d-flex justify-content-center">
            <aPagination :items="list" v-model="activeItemsList" />
        </b-col>
    </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import aPagination from "@core/components/a-pagination";
import {
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton
} from "bootstrap-vue";
import { sortListObjByArgName } from "@core/util/global"

export default {
    components: {
        VueGoodTable,
        aPagination,
        // bootstrap vue
        BCol,
        BCard,
        BCardHeader,
        BCardBody,
        BButton
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        selectedLabel: {
            type: String,
            default: () => 'id'
        },
        no_delete: {
            type: Boolean,
            default: () => false
        },
        no_select: {
            type: Boolean,
            default: () => false
        },
        isPlus: {
            type: Boolean,
            dafault: () => false
        },
        title: String,
        no_footer: Boolean
    },
    data: () => ({
        activeItemsList: [],
        selectedIds: [],
        isNotSelectedRows: true,
        list: []
    }),
    mounted() {
        this.list = this.items
    },
    methods: {
        selectionChanged() {
            this.isNotSelectedRows = !this.$refs["table"].selectedRows
                .length;

            this.$emit("selected-rows", this.$refs["table"].selectedRows);
        },
        getSelectedRows() {
            this.selectedIds = [];
            this.$refs["table"].selectedRows.forEach(row => {
                this.selectedIds.push(row[this.selectedLabel]);
            });
            this.selectionChanged()
            this.$emit("delete-selected", this.selectedIds);
        },
        details(props) {
            this.$emit("details", props);
        },
        onSortChange(params) {
            this.list = sortListObjByArgName(params[0].field, params[0].type, this.items)
        }
    },
    watch: {
        items(l) {
            this.list = l
        }
    }
};
</script>
