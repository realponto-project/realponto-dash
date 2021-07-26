import React from 'react'
import fake, { random, commerce, company, address, phone } from 'faker'

import CatalogManagerContainer from '../../../Containers/Catalog/Manager'

export default {
  title: 'Pages/Catalog',
  component: CatalogManagerContainer
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

const TemplateManager = () => {
  return (
    <CatalogManagerContainer
      productList={productList}
      company={myCompany}
      count={40}
    />
  )
}

export const Manager = TemplateManager.bind({})
