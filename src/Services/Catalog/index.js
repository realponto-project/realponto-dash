import axios from 'axios'
import { baseURL } from '../../utils/axiosInstance'

const getProducts = async (companyId, params = {}) => {
  return await axios.get(`${baseURL}/catalog/get-products/${companyId}`, {
    params
  })
}

export { getProducts }
