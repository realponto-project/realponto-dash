import axiosIntance from '../../utils/axiosInstance'

const getAllOrder = (params = {}) => {
  return axiosIntance.get(`/orders`, { params })
}

const getOrderById = (orderId) => {
  return axiosIntance.get(`/orders/${orderId}`)
}

const getAllOrderSummary = (params = {}) => {
  return axiosIntance.get('/orders-summary', { params })
}

const createOrder = (values) => {
  return axiosIntance.post('/orders', values)
}

const updateOrder =  (orderId, values) => {
  return axiosIntance.put(`/orders/${orderId}`, values)
}

const finished = (orderId) => {
  return axiosIntance.put(`/orders-finished/${orderId}`, {})
}

const customerAssocite = (orderId, values) => {
  return axiosIntance.put(`/customer-associate/${orderId}`, values)
}

export {
  createOrder,
  getAllOrder,
  getAllOrderSummary,
  getOrderById,
  updateOrder,
  finished,
  customerAssocite,
}
