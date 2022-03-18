<template>
  <section class="payment d-flex flex-column justify-content-center align-items-center h-100">
    <form
      class="form d-flex flex-column"
      novalidate
      @submit.stop.prevent="onCreate"
    >
      <h5>Create payment</h5>

      <b-form-group id="type-group" label-for="type">
        <b-form-select
          class="form-control mb-3"
          data-vv-as="type"
          id="type"
          name="type"
          v-model="type"
          v-validate="{ required: true }"
          :class="{ 'is-danger': veeErrors.has('type') }"
          :options="typeOptions"
          :state="validateState('type')"
          size="lg"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="amount-group" label-for="amount">
        <b-form-input
          class="form-control mb-3"
          data-vv-as="amount"
          id="amount"
          name="amount"
          placeholder="Enter an amount"
          type="number"
          v-model="amount"
          v-validate="{ required: true }"
          :class="{ 'is-danger': veeErrors.has('amount') }"
          :state="validateState('amount')"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="description-group" label-for="description">
        <b-form-textarea
          class="form-control mb-3"
          data-vv-as="description"
          id="description"
          max-rows="6"
          name="description"
          placeholder="Enter a description"
          rows="3"
          v-model="description"
          v-validate="{}"
          :class="{ 'is-danger': veeErrors.has('description') }"
          :state="validateState('description')"
        ></b-form-textarea>
      </b-form-group>

      <section v-if="type === 'internal'">
        <b-form-group
          id="remitterAccountId-group"
          label-for="remitterAccountId"
        >
          <vue-bootstrap-typeahead
            class="mb-3"
            data-vv-as="remitter account"
            id="remitterAccountId"
            name="remitterAccountId"
            placeholder="Enter remitter account"
            v-model="remitterAccountId"
            v-validate="type === 'internal' ? validations[type] : {}"
            :class="{ 'is-danger': veeErrors.has('remitterAccountId') }"
            :data="['5ba50761-5958-472f-91c3-7278b469765f']"
          ></vue-bootstrap-typeahead>
        </b-form-group>

        <b-form-group
          id="beneficiaryAccountId-group"
          label-for="beneficiaryAccountId"
        >
          <vue-bootstrap-typeahead
            class="mb-3"
            data-vv-as="beneficiary account"
            id="beneficiaryAccountId"
            name="beneficiaryAccountId"
            placeholder="Enter beneficiary account"
            v-model="beneficiaryAccountId"
            v-validate="type === 'internal' ? validations[type] : {}"
            :class="{ 'is-danger': veeErrors.has('beneficiaryAccountId') }"
            :data="['5ba50761-5958-472f-91c3-7278b469765f']"
          ></vue-bootstrap-typeahead>
        </b-form-group>
      </section>
      <section v-if="type === 'incoming'">
        <b-form-group id="beneficiaryAccountId-group" label-for="beneficiaryAccountId">
          <b-form-input
            class="form-control mb-3"
            data-vv-as="remitter account"
            id="beneficiaryAccountId"
            name="beneficiaryAccountId"
            placeholder="Enter beneficiary account"
            v-model="beneficiaryAccountId"
            v-validate="type === 'incoming' ? validations[type] : {}"
            :class="{ 'is-danger': veeErrors.has('beneficiaryAccountId') }"
            :state="validateState('beneficiaryAccountId')"
          ></b-form-input>
        </b-form-group>

        <b-form-input v-model="remitterName" placeholder="Enter remitter name" class="mb-3"></b-form-input>
        <b-form-input v-model="remitterAccountNumber" placeholder="Enter remitter account number" class="mb-3"></b-form-input>
      </section>
      <section v-if="type === 'outgoing'">
        <b-form-group id="remitterAccountId-group" label-for="remitterAccountId">
          <b-form-input
            class="form-control mb-3"
            data-vv-as="remitter account"
            id="remitterAccountId"
            name="remitterAccountId"
            placeholder="Enter remitter account"
            v-model="remitterAccountId"
            v-validate="type === 'internal' ? validations[type] : {}"
            :class="{ 'is-danger': veeErrors.has('remitterAccountId') }"
            :state="validateState('remitterAccountId')"
          ></b-form-input>
        </b-form-group>
        <b-form-input v-model="beneficiaryName" placeholder="Enter beneficiary name" class="mb-3"></b-form-input>
        <b-form-input v-model="beneficiaryAccountNumber" placeholder="Enter beneficiary account number" class="mb-3"></b-form-input>
      </section>
      <b-button
        class="d-flex justify-content-center align-items-center"
        type="submit"
        variant="outline-primary"
      >
        <b-spinner small v-if="isLoading"></b-spinner> <span class="ml-3">Create new payment</span>
      </b-button>
    </form>

  </section>
</template>
<style lang="scss" scoped>
.payment {
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
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
// import { extractErrors } from '../../utils'

export default {
  name: 'Payment',
  components: {
    VueBootstrapTypeahead,
  },
  data: () => ({
    isLoading: false,
    typeOptions: [
      { text: 'Select a payment type', value: null },
      { text: 'Internal', value: 'internal' },
      { text: 'Incoming', value: 'incoming' },
      { text: 'Outgoing', value: 'outgoing' },
    ],
    type: null,
    description: '',
    amount: null,
    beneficiaryAccountId: '',
    remitterAccountId: '',
    remitterName: '',
    remitterAccountNumber: '',
    beneficiaryName: '',
    beneficiaryAccountNumber: '',
    validations: {
      internal: { required: true },
      incoming: { required: true },
      outgoing: { required: true },
    },
  }),
  methods: {
    onCreate() {
      this.$validator.validate().then((result) => {
        if (result) {
          console.log('validated!')
          // const payload = {
          //   data: {
          //     name: this.name,
          //   },
          // }
          // this.isLoading = true
          // this.CREATE_ACCOUNT(payload)
          //   .catch((err) => alert(extractErrors(err.errors)))
          //   .then(() => (this.isLoading = false))
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