import BaseService from './base.service'

export default class AccountService extends BaseService {
  uri = ''
  constructor() {
    super()
    this.uri = '/accounts'
  }
  create(payload) {
    return this.post(this.uri, payload)
  }
  search(payload) {
    return this.post(`${this.uri}/search`, payload)
  }
  update(id, payload) {
    return this.patch(`${this.uri}/${id}`, payload)
  }
  close(id, payload) {
    return this.patch(`${this.uri}/${id}/close`, payload)
  }
}