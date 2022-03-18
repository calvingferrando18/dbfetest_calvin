import AuthService from './auth.service'
import AccountService from './account.service'
import PaymentService from './payment.service'

const Auth = new AuthService()
const Account = new AccountService()
const Payment = new PaymentService()

export {
  Auth,
  Account,
  Payment,
}