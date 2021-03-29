import { always, applySpec, ifElse, prop } from 'ramda'

export const buildAddCustomer = (expand) =>
  applySpec({
    address: ifElse(
      () => expand,
      applySpec({
        city: prop('city'),
        complementary: prop('complementary'),
        neighborhood: prop('neighborhood'),
        reference: prop('reference'),
        states: prop('states'),
        street: prop('street'),
        streetNumber: prop('streetNumber'),
        zipcode: prop('zipcode')
      }),
      always(null)
    ),
    document: prop('document'),
    name: prop('name'),
    phone: prop('phone'),
    socialName: prop('socialName')
  })
