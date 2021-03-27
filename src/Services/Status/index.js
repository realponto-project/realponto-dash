import axiosIntance from '../../utils/axiosInstance'

const getAllStatus = async (params = {}) => {
  return await axiosIntance.get('/status', { params })
}

const createStatus = async (values) => {
  return await axiosIntance.post('/status', values)
}

const updateStatus = async (values) => {
  return await axiosIntance.put(`/status/${values.id}`, values)
}

export { getAllStatus, updateStatus, createStatus }
