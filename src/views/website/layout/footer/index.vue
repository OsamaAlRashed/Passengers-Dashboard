<template>
  <div>
    <section class="newsletter py-5 text-white">
      <b-container>
        <h2 class="mb-3">Join our newsletter and get latest updates</h2>
        <small class="text-light"
          >Join our email subscription now to get updates<br />
          on promotions and coupons.</small
        >
        <a-input-group prepend append class="mt-4">
          <template #append>
            <b-button>subsicribe</b-button>
          </template>
          <a-input-text
            class="subsicribe-input"
            name="subsicribe"
            placeholder="Your E-mail Adress"
          ></a-input-text>
          <template #prepend>
            <b-button variant="white"
              ><i class="mdi mdi-email-outline" style="font-size: 22px"></i
            ></b-button>
          </template>
        </a-input-group>
      </b-container>
    </section>
    <section class="features bg-light">
      <b-container>
        <ul class="list-unstyled border-bottom px-0 m-0">
          <b-row>
            <b-col cols="12" md="6" lg="3">
              <li>
                <i class="mdi mdi-plus"></i>
                <small>Best price on the market</small>
              </li>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <li>
                <i class="mdi mdi-plus"></i>
                <small>Best price on the market</small>
              </li>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <li>
                <i class="mdi mdi-plus"></i>
                <small>Best price on the market</small>
              </li>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <li>
                <i class="mdi mdi-plus"></i>
                <small>Best price on the market</small>
              </li>
            </b-col>
          </b-row>
        </ul>
      </b-container>
    </section>
    <footer>
      <b-container>
        <div class="p-5"></div>
        <mini-footer />
      </b-container>
    </footer>
  </div>
</template>

<script>
import miniFooter from "@core/layout/components/mini-footer.vue";
export default {
  components: {
    miniFooter
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/helpers/variables";
.newsletter {
  background: var(--primary);
}
.features {
  ul {
    padding: 20px 0 0;
    border-color: $borderColor;
    li {
      &:not(:first-of-type) {
        border-left: solid 1px $borderColor;
      }
      padding: 0 12px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 28px;
        line-height: 1;
        margin-right: 16px;
      }
    }
  }
}
</style>
