<template>
  <section class="auth d-flex flex-column justify-content-center align-items-center h-100">
    <section class="form d-flex flex-column">
      <h5>Login</h5>
      <b-form-input v-model="username" placeholder="Enter your username" class="mb-3"></b-form-input>
      <b-form-input v-model="password" placeholder="Enter your password" class="mb-3" type="password"></b-form-input>
      <b-button
          class="d-flex justify-content-center align-items-center"
          variant="outline-primary"
          @click="onLogin"
      >
        <b-spinner small v-if="isLoading"></b-spinner> <span class="ml-3">Login</span>
      </b-button>
    </section>

  </section>
</template>
<style lang="scss" scoped>
.auth {
  .form {
    max-width: 320px;
    width: 100%;
    b-spinner {
      margin-right: 8px;
    }
    span {
      margin-left: 8px;
    }
  }
}
</style>
<script>
export default {
  name: 'Auth',
  data: () => ({
    username: process.env.VUE_APP_CREDS_USERNAME || '',
    password: process.env.VUE_APP_CREDS_PASSWORD || '',
    isLoading: false,
  }),
  methods: {
    onLogin() {
    },
  }
}
</script>