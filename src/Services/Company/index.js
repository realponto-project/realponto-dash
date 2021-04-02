import axios from 'axios'

import axiosIntance from '../../utils/axiosInstance'
const baseUrl = `http://localhost:3003/register`

export const getCompanyById = async (companyId) => {
  return await axiosIntance.get(`/companies/${companyId}`)
}

export const createCompany = async (values) => {
  return await axios.post(baseUrl, values)
}
