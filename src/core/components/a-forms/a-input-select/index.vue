<template>
  <ValidationProvider #default="{ errors }" :name="name" :rules="faildRules">
    <b-form-group
      v-bind="$attrs"
      class="a-form-group"
      :label-for="'label-for-select-' + id"
    >
      <a-input-group class="mr-2" :append="append" :prepend="prepend">
        <template slot="append" v-if="append">
          <b-img
            :src="
              require(`@/assets/icons/outline/Icon-Outline-${appendIcon}.svg`)
            "
          ></b-img>
        </template>
        <v-select
          :id="'label-for-select-' + id"
          v-model="innerVal"
          :options="options"
          :reduce="(item) => (valueLabel ? item[valueLabel] : item)"
          :label="textLabel"
          :clearable="clearable"
          :multiple="multiple"
          :placeholder="placeholder"
          :dir="getSiteLanguage() == 'ar' ? 'rtl' : 'ltr'"
          :selectable="selectable"
          class="flex-grow-1"
          :class="[fieldClass, { 'border-danger': errors[0] }]"
        >
          <template #list-header>
            <slot name="list-header"></slot>
          </template>
          <template #option="{ name }">
            <slot name="option" :label="name"></slot>
          </template>
          <template #selected-option="{ name }">
            <slot name="selected-option" :label="name"></slot>
          </template>
          <template #list-footer>
            <slot name="list-footer"></slot>
          </template>
          <template v-slot:no-options="{ search, searching }">
            <slot
              name="no-options"
              :search="search"
              :searching="searching"
            ></slot>
          </template>
        </v-select>

        <template slot="prepend" v-if="prepend">
          <b-img
            width="20"
            :src="
              require(`@/assets/icons/outline/Icon-Outline-${prependIcon}.svg`)
            "
          ></b-img>
        </template>
      </a-input-group>
      <small class="text-danger">{{ errors[0] }}</small>
    </b-form-group>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider, localize } from "vee-validate";
import { BFormGroup } from "bootstrap-vue";
import vSelect from "vue-select";
import { getSiteLanguage } from "@/libs/i18n";
import ar from "vee-validate/dist/locale/ar.json";
import {
  required,
  email,
  min,
  confirmed,
  regex,
  url,
  credit,
  password,
  between,
  alpha,
  integer,
  digits,
  alphaDash,
  alphaNum,
  length,
  no_spaces,
  positive,
} from "@validations";
export default {
  components: {
    vSelect,
    ValidationProvider,
    // bootstrap vue
    BFormGroup,
  },
  props: {
    append: Boolean,
    prepend: Boolean,
    
    appendIcon: String,
    prependIcon: String,
    options: Array,
    clearable: {
      type: Boolean,
      default: () => false,
    },
    placeholder: String,
    valueLabel: {
      type: String,
      default: () => "id",
    },
    textLabel: {
      type: String,
      default: "name",
    },
    multiple: Boolean,
    value: {
      type: null,
    },
    selectable: {
      type: Function,
      default: () => true,
    },
    name: {
      type: String,
      required: true,
    },
    vid: {
      type: String,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    fieldClass: String,
  },
  setup(props) {
    let faildRules = "";
    let fields = {};
    props.rules.forEach((rule) => {
      faildRules += rule.type + "|";
      fields[rule.type.split(":")[0]] = rule.message;
    });
    faildRules = faildRules.slice(0, faildRules.length - 1);
    localize("ar", {
      messages: ar.messages,
      fields: {
        [props.name]: fields,
      },
    });
    return { faildRules, getSiteLanguage };
  },
  mounted() {
    if (this.value) {
      this.innerVal = this.value;
    }
  },
  data: () => ({
    innerVal: null,
    id: Math.random() * 100000,

    // validation
    required,
    email,
    min,
    confirmed,
    regex,
    url,
    credit,
    password,
    between,
    alpha,
    integer,
    digits,
    alphaDash,
    alphaNum,
    length,
    no_spaces,
    positive,
  }),
  watch: {
    innerVal(v) {
      this.$emit("input", v);
    },
    value(v) {
      this.innerVal = v;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-select {
  border: solid 1px #d8d6de;
}
::v-deep .vs__dropdown-toggle {
  border: none;
  background: #ffff;
  input::placeholder {
    color: #b9bfd3;
  }
}
.a-form-group ::v-deep label {
  font-size: inherit;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: calc(0.438rem + 1px);
  padding-bottom: calc(0.438rem + 1px);
}
</style>
