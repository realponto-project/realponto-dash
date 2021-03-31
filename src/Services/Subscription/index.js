import axiosIntance from '../../utils/axiosInstance'

const createSubscription = async (values = {}) => {
  return await axiosIntance.post('/subscription', values)
}

const getSubscriptionActivated = async () => {
  return await axiosIntance.get('/subscription')
}

export {
  createSubscription,
  getSubscriptionActivated,
} 
