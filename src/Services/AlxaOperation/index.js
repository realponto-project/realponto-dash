import axiosInstance from '../../utils/axiosInstance'

export const CreateAlxaOperation = async (values) =>
  await axiosInstance.post('/alxaOperation', values)

export const GetAllOperationService = async (params = {}) =>
  await axiosInstance.get('/alxaOperation', { params })
