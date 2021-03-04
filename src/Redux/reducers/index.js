import { combineReducers } from 'redux'

import userReducer from './user'
import companyReducer from './company'
import statusReducer from './status'
import customerSearchReducer from './customerSearch'
import productSearchReducer from './productSearch'
import orderSearchReducer from './orderSearch'

export default combineReducers({
  user: userReducer,
  company: companyReducer,
  status: statusReducer,
  customerSearch: customerSearchReducer,
  productSearch: productSearchReducer,
  orderSearch: orderSearchReducer,
})
