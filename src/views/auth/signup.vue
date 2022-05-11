<template>
  <div class="pb-5">
    <b-form @submit.prevent>
      <h3 class="title text-center py-5">
        {{$t('auth.signup.welcome')}} <span class="text-primary appName">{{appName}}</span> 👋
        <p class="title mb-0 mt-3 lead">{{$t('auth.signup.we-are-happy')}} 🎉</p>
      </h3>
      <a-input-text
        label="Full Name"
        name="fullname"
        placeholder="type here ..."
      ></a-input-text>
      <a-input-text
        label="User Name"
        name="username"
        placeholder="type here ..."
      ></a-input-text>
      <a-input-text
        label="Password"
        name="password"
        type="password"
        placeholder="type here ..."
      ></a-input-text>
      <a-input-text
        label="Confirm Password"
        name="confirm-password"
        type="password"
        placeholder="type here ..."
      ></a-input-text>
      <b-button type="submit" variant="primary" class="px-5" @click="signup(userDto)">
        {{ $t("auth.signup.title") }}
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    appName: String
  },
  data: () => ({
    userDto: {
      
    }
  }),
  methods: {
    signup(userDto) {
      console.log(userDto)
    }
  }
}
</script>