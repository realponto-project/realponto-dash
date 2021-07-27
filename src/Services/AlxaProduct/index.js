import axiosInstance from '../../utils/axiosInstance'

export const getAllAlxaProductService = async (values) =>
  await axiosInstance.get('/alxaProducts', values)
