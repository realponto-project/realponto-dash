import axiosInstance from '../../utils/axiosInstance'

export const CreateAlxaOperation = async (values) =>
  await axiosInstance.post('/alxaOperation', values)
