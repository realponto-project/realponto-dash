import { applySpec, pipe, prop, map, omit, isNil, isEmpty, pathOr } from 'ramda'

const buildProduct = applySpec({
  statusId: prop('statusId'),
  productId: prop('productId'),
  productName: prop('name'),
  quantity: pipe(prop('quantity'), Number),
  price: pipe(
    pathOr('0', ['price']),
    (value) => value.replace(/\D/g, ''), 
    Number
  )
})

const buildProducts = pipe(prop('products'), map(buildProduct))

const getCustomerId = (values) => {
  let customerId = prop('customerId', values)
  if (isNil(customerId) || isEmpty(customerId)) {
    customerId = null
  }

  return customerId
}

const buildOrder = applySpec({
  userId: prop('userId'),
  customerId: getCustomerId,
  statusId: prop('statusId'),
  products: buildProducts,
  originType: pathOr('pdv', ['originType'])
})

const removeCustomerIdNull = (payload) => {
  if (!prop('customerId', payload)) {
    console.log(payload, 'vai vendo')
    return omit(['customerId'], payload)
  }

  return payload
}

export default pipe(buildOrder, removeCustomerIdNull)
