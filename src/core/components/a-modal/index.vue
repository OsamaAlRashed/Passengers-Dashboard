<template>
<div>
    <slot name="activator">
       <activaitor @ok="is = true" @search="search" :placeholder="placeholder" :title="btn_title"/>
    </slot>
    <b-modal :title="title" content-class="rounded-xl" :size="size" backdrop shadow bg-variant="white" v-model="is"
             @ok="ok($event)" >
        <template #header>
            <div
                class="d-flex justify-content-between align-items-center px-2 py-3 border-bottom"
            >
                <slot name="header">
                    
                </slot>
                <b-button
                    variant="flat-secondary"
                    size="sm"
                    class="rounded-circle btn-icon ml-auto"
                    @click="is = false"
                >
                    <i name="mdi mdi-close"></i>
                </b-button>
            </div>
        </template>
        <template #default>
            <slot name="body">
            </slot>
        </template>
        <template #footer="{ hide }">
            <slot name="footer">
                <div class="d-flex align-items-center px-2 py-2 border-top">
                    <b-button variant="outline-danger" v-if="isEdit" @click="del">{{$t('delete')}}</b-button>
                    <b-button
                        variant="outline-primary"
                        class="ml-auto mr-2 px-3"
                        @click="hide"
                        >{{$t('cancel')}}</b-button
                    >
                </div>
            </slot>
        </template>
    </b-modal>
</div>
</template>

<script>
import activaitor from "../a-dialog/activaitor.vue";

import {
    BButton,
    BSidebar
} from "bootstrap-vue";
export default {
    components: {
        activaitor,
        // bootstrap vue
        BButton,
        BSidebar
    },
    data: () => ({
        is: false
    }),
    props: {
        placeholder: String,
        btn_title: String,
        title: {
            type: String,
            default: () => "title"
        },
        endClose: Boolean,
        isEdit: {
            type: Boolean,
            default: () => false
        },
        size:{
            type: String,
            default: () => "lg"
        }
    },
    methods: {
        ok(e) {
            this.$emit('ok', e)
            if(this.endClose) this.is = false
        },
        del() {
            this.$emit('delete')
            this.is = false
        },
        search(e) {
            this.$emit('search', e)
        },
        open() {
            this.is = true
        },
        close() {
            this.is = false
        }
    },
    watch: {
        is (is) {
            if (is) { this.$emit('open') }
                else { this.$emit('close') }
        }
    }
};
</script>

<style lang="scss">
.modal-content{
    border-radius : 16px;
}
</style>