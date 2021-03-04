import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('products', { params })
}

const createProduct = async (values) => {
  return await axiosIntance.post('/products', values)
}

const updateProduct = async (values) => {
  return await axiosIntance.put(`/products/${values.id}`, values)
}

export {
  getAll,
  createProduct,
  updateProduct,
}
