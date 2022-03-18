<template>
  <section class="account d-flex flex-column justify-content-center align-items-center h-100">
    <form
      class="form d-flex flex-column"
      novalidate
      @submit.stop.prevent="onCreate"
    >
      <h5>Create account</h5>

      <b-form-group id="name-group" label-for="name">
        <b-form-input
          data-vv-as="name"
          id="name"
          name="name"
          placeholder="Enter your name"
          v-model="name"
          v-validate="{ required: true, min: 3 }"
          :class="{ 'is-danger': veeErrors.has('name') }"
          :state="validateState('name')"
        ></b-form-input>
        <b-form-invalid-feedback id="name-feedback">{{ veeErrors.first('name') }}</b-form-invalid-feedback>
      </b-form-group>

      <b-button
        class="d-flex justify-content-center align-items-center mt-3"
        type="submit"
        variant="outline-primary"
      >
        <b-spinner small v-if="isLoading"></b-spinner> <span class="ml-3">Create new account</span>
      </b-button>
    </form>

  </section>
</template>
<style lang="scss" scoped>
.account {
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
// npm packages
import { mapActions } from 'vuex'
// our packages
import { CREATE_ACCOUNT } from '../../store/modules/account/types/action'
import { extractErrors } from '../../utils'

export default {
  name: 'Account',
  data: () => ({
    name: '',
    isLoading: false,
  }),
  methods: {
    ...mapActions([
      CREATE_ACCOUNT,
    ]),
    async onCreate() {
      this.$validator.validate().then((result) => {
        if (result) {
          const payload = {
            data: {
              name: this.name,
            },
          }
          this.isLoading = true
          this.CREATE_ACCOUNT(payload)
            .catch((err) => alert(extractErrors(err.errors)))
            .then(() => (this.isLoading = false))
        }
      })
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
  }
}
</script>