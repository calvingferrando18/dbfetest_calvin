import axios from 'axios'

export default class BaseService {
  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  http = ''
  constructor() {
    this.http = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL,
    })
  }
  setupHeaders(headers = {}) {
    const token = `${process.env.VUE_APP_CREDS_USERNAME}:${process.env.VUE_APP_CREDS_PASSWORD}`
    const encodedToken = Buffer.from(token).toString('base64')
    headers['Authorization'] = `Basic ${encodedToken}`
    return {
      ...this.headers,
      ...headers,
    }
  }
  post(uri, data = {}, headers = {}) {
    return this.http.post(uri, data, { headers: this.setupHeaders(headers) })
  }
  patch(uri, data = {}, headers = {}) {
    return this.http.patch(uri, data, { headers: this.setupHeaders(headers) })
  }
}