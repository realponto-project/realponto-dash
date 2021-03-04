import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/customers', { params })
}

const createCustomer = async (values) => {
  return await axiosIntance.post('/customers', values)
}

const updateCustomer = async (values) => {
  return await axiosIntance.put(`/customers/${values.id}`, values)
}

export {
  getAll,
  createCustomer,
  updateCustomer,
}
