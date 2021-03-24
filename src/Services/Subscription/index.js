import axiosIntance from '../../utils/axiosInstance'

const createSubscription = async (values = {}) => {
  console.log(values)
  return await axiosIntance.post('/subscription', values)
}

export default createSubscription
