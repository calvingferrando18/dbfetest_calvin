import BaseService from './base.service'

export default class PaymentService extends BaseService {
  uri = ''
  constructor() {
    super()
    this.uri = '/payments'
  }
  create(payload) {
    this.post(this.uri, payload)
  }
  search(payload) {
    this.post(`${this.uri}/search`, payload)
  }
}