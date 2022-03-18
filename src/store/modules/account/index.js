import { CREATE_ACCOUNT } from './types/action'
import { SET_NEW_ACCOUNT } from './types/mutation'
import { Account } from '../../../services'

const actions = {
  [CREATE_ACCOUNT]: async ({ commit }, payload) => {
    try {
      const response = await Account.create(payload)
      const { data } = response?.data
      commit(SET_NEW_ACCOUNT, data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e.response.data)
    }
  },
}
const getters = {
  newAccount: (state) =>  state.newAccount,
}
const mutations = {
  [SET_NEW_ACCOUNT]: (state, data) => {
    state.newAccount = data
  },
}
const state = {
  newAccount: null,
}

export default {
  actions,
  getters,
  mutations,
  state,
}
