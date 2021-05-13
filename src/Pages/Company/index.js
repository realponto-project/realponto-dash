import React from 'react'
import {Form} from 'antd'
import getAddress from '../../Services/Address';
import CompanyContainer from '../../Containers/Company'
import customerMask from '../../utils/Masks/customerMasks'
import { includes, keys } from 'ramda';

const Company = () => {
  const [form] = Form.useForm()

  const handleValueChange = async (values) => {

    const formKeys = keys(values)

    const name = formKeys[0]
    const value = values[name]

    const {name: chave, value : valor } = customerMask({name, value})

    form.setFieldsValue({ [chave]: valor })

    if(includes('zipcode', formKeys) && values.zipcode.length === 9 ){
      
      getCustomerAddress(values.zipcode)
    }
  }


  const getCustomerAddress = async (zipcode) => {
      
      const address = await getAddress(zipcode.replace(/\D/g, ''))

      form.setFieldsValue(address)
  }

  return (
    <CompanyContainer
      handleValueChange = {handleValueChange}
      form = {form}
    />
  )
}

export default Company