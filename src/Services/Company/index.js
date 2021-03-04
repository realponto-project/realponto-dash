import axiosIntance from '../../utils/axiosInstance'

const getCompanyById = async (companyId) => {
  return await axiosIntance.get(`/companies/${companyId}`)
}


export default getCompanyById
