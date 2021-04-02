import axiosIntance from '../../utils/axiosInstance'

const createProduct = async (values) => {
  return await axiosIntance.post('/products', values)
}

const getAll = async (params = {}) => {
  return await axiosIntance.get('products', { params })
}

const getProductByBarCode = async (barCode) => {
  return await axiosIntance.get(`/products/getByBarCode/${barCode}`)
}

const getProductById = async (id) => {
  return await axiosIntance.get(`/products/${id}`)
}

const updateProduct = async (values) => {
  return await axiosIntance.put(`/products/${values.id}`, values)
}

export {
  createProduct,
  getAll,
  getProductByBarCode,
  getProductById,
  updateProduct
}
