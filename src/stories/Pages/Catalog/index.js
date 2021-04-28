import React from 'react'
import fake, { random, commerce, company, address, phone } from 'faker'

import CatalogContainer from '../../../Containers/Catalog'

export default {
  title: 'Pages/Catalog',
  component: CatalogContainer
}

fake.locale = 'pt_PT'

const productList = new Array(24).fill(null).map(() => ({
  id: random.number(),
  price: commerce.price(),
  name: commerce.productName(),
  description: commerce.productDescription()
}))

const myCompany = {
  name: company.companyName(),
  address: {
    street: address.streetName(),
    streetNumber: random.number({ max: 1000 }),
    neighborhood: address.streetName(),
    city: address.city(),
    state: address.state(),
    zipcode: address.zipCode()
  },
  phone: phone.phoneNumber()
}

const Template = () => {
  return (
    <CatalogContainer
      productList={productList}
      company={myCompany}
      count={40}
    />
  )
}

export const Defaul = Template.bind({})
