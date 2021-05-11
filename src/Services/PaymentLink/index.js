import axiosIntance from '../../utils/axiosInstance'

const getAllPaymentLink = async () => {
  return await axiosIntance.get('/payment-link')
}

const createPaymentLink = async (payload) => {
  return await axiosIntance.post('/payment-link', payload)
}

export {
  getAllPaymentLink,
  createPaymentLink
}
