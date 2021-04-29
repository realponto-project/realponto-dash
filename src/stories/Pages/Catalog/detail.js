import React from 'react'
import fake, { random, commerce, company, address, phone, image } from 'faker'

import CatalogDetailsContainer from '../../../Containers/Catalog/Details'

fake.locale = 'pt_PT'

export default {
  title: 'Pages/Catalog',
  component: CatalogDetailsContainer
}

const outherProducts = new Array(4).fill(null).map(() => ({
  id: random.number(),
  price: commerce.price(),
  name: commerce.productName(),
  description: commerce.productDescription()
}))

const product = {
  name: commerce.productName(),
  price: commerce.price(),
  description: commerce.productDescription(),
  imageUrl: image.imageUrl()
}

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

const TemplateDetail = () => {
  return (
    <CatalogDetailsContainer
      product={product}
      company={myCompany}
      outherProducts={outherProducts}
    />
  )
}

export const Detail = TemplateDetail.bind({})
