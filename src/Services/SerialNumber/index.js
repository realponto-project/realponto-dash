import axiosIntance from '../../utils/axiosInstance'

const getBySerialNumber = async (params = {}) => {
  return await axiosIntance.get('/serials', { params })
}

const createSerialNumbers = async (values = {}) => {
  return await axiosIntance.post('/serials', values)
}

const associateSerialNumber = async (values = {}) => {
  return await axiosIntance.put('/serials-associate', values)
}

const getSerialOrderOutputs = async (params = {}) => {
  return await axiosIntance.get('/serials', { params })
}


export {
  getBySerialNumber,
  createSerialNumbers,
  associateSerialNumber,
  getSerialOrderOutputs
}
