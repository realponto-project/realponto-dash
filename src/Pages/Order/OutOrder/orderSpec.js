import {
  applySpec,
  pipe,
  ifElse,
  always,
  prop,
  find,
  propEq,
  map,
  omit,
  isNil,
  isEmpty,
  pathOr,
  replace
} from 'ramda'

const buildProduct = (values) =>
  applySpec({
    statusId: prop('statusId', values),
    productId: prop('productId'),
    productName: prop('name'),
    quantity: pipe(prop('quantity'), Number),
    price: pipe(pathOr('0', ['price']), String, replace(/\D/g, ''), Number)
  })

const buildProducts = (values) =>
  pipe(prop('products'), map(buildProduct(values)))(values)

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
  orderDate: prop('orderDate'),
  products: buildProducts,
  originType: pathOr('pdv', ['originType'])
})

const removeCustomerIdNull = (payload) => {
  if (!prop('customerId', payload)) {
    return omit(['customerId'], payload)
  }

  return payload
}

export default pipe(buildOrder, removeCustomerIdNull)
