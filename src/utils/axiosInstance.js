import axios from 'axios'

const baseURL = `https://alxa-core-staging.herokuapp.com/api`

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}))

export default axiosInstance
