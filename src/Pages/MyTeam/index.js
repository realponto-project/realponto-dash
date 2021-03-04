import React, { useEffect, useState } from 'react'
import ManagerContainer from '../../Containers/MyTeam/Manager'
import {
  createUser,
  getAll,
  updateUser,
} from '../../Services/User'

const Manager = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAllUsers()
  }, [])


  const getAllUsers = async () => {
    try {
      const { data: { source } } = await getAll({})
      setUsers(source)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createUser(values)
      getAllUsers()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSubmitUpdate = async (values) => {
    try {
      await updateUser(values)
      getAllUsers()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleGetUsersByFilters = async(values) => {
    const { search, activated } = values
    const emailRegex = (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    const isEmail =  emailRegex.test(String(search).toLowerCase())
    const checkedActivated = (
      activated && activated.length < 2 && activated.length !== 0
       ? { activated:  activated[0] === 'Inativo' ? false : true }
       : {}
    )

    const query = isEmail ? { email: search } : { name: search }

    const buildQuerySpec = {
      ...query,
      ...checkedActivated,
      page,
      limit: 25
    }

    const { data: { source } } = await getAll(buildQuerySpec)
    setUsers(source)
  }

  return (
    <ManagerContainer
      users={users}
      handleSubmit={handleSubmit}
      handleSubmitUpdate={handleSubmitUpdate}
      handleGetUsersByFilters={handleGetUsersByFilters}
    />
  )
}

export default Manager
