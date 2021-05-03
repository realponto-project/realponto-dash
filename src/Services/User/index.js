import axios from 'axios'
import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/users', { params })
}

const getUserById = async (userId, options = {}) => {
  return await axiosIntance.get(`/users/${userId}`, options)
}

const createUser = async (values) => {
  return await axiosIntance.post('/users', values)
}

const recoveryUser = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/recovery-password`,
    values
  )
}

const resetPassword = async (token, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/api/reset-password`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

const updateUser = async (values) => {
  return await axiosIntance.put(`/users/${values.id}`, values)
}

const getByIdUser = async (id) => {
  return await axiosIntance.get(`/users/${id}`)
}

const updateUserPassword = async (values) => {
  return await axiosIntance.put('/users-update-password', values)
}

const updateMyInfo = async (userId, values, options = {}) => {
  return await axiosIntance.put(`/users/${userId}`, values, options)
}

export {
  getAll,
  getUserById,
  createUser,
  updateUser,
  updateUserPassword,
  updateMyInfo,
  recoveryUser,
  resetPassword
}
