<template>
  <div class="pb-5">
    <validation-observer ref="observer">
      <b-form @submit.prevent>
        <div class="text-center py-5">
          <b-img
            src="~@/assets/images/Logo mark.svg"
            fill="black"
            width="64"
          ></b-img>
        </div>
        <h3 class="text-center">
          <strong class="">Make ordering less stressful</strong>
        </h3>
        <p class="text-center pb-5">login to our platform & enjoy it</p>
        <a-input-text
          placeholder="Enter username"
          v-model="userDto.username"
          name="username"
          prepend
          prependIcon="Profile"
          :rules="[{ type: 'required', message: 'user name is required' }]"
        ></a-input-text>
        <a-input-text
          placeholder="password"
          type="password"
          v-model="userDto.password"
          name="password"
          prepend
          prependIcon="Lock"
          :rules="[{ type: 'required', message: 'password is required' }]"
        ></a-input-text>
        <b-checkbox
          variant="primary"
          class="mb-3"
          v-model="userDto.rememberMe"
          >{{ $t("auth.login.form.rememberme.label") }}</b-checkbox
        >
        <b-alert variant="danger" :show="setWrong">{{
          $t("auth.login.form.alert")
        }}</b-alert>
        <div class="d-flex">
          <b-button
            class="w-100"
            style="justify-content: center"
            type="submit"
            variant="primary"
            @click="login(userDto)"
          >
            Login
          </b-button>
        </div>
      </b-form>
    </validation-observer>
  </div>
</template>

<style>
.form-group {
  margin-bottom: 32px;
}
</style>

<script>
import useJwt from "@core/util/auth/jwt/useJwt";
import { getHomeRouteForLoggedInUser } from "@core/util/auth";

export default {
  props: {
    appName: String,
  },
  data: () => ({
    setWrong: false,
    userDto: {
      email: "",
      password: "",
      rememberMe: false,
    },
  }),
  methods: {
    login(userDto) {
      this.$refs.observer.validate().then((success) => {
         if (success) {
           useJwt
        .login({
          username: userDto.username,
          password: userDto.password,
          rememberMe: userDto.rememberMe,
        })
        .then(({ data }) => {
          useJwt.setUserData(JSON.stringify(data.user));
          useJwt.setToken(data.accessToken);
          useJwt.setRefreshToken(data.refreshToken);
          this.$router.replace(getHomeRouteForLoggedInUser());
        })
        .catch(() => {
          this.setWrong = true;
        });
         }
        
      })
    },
  },
};
</script>
