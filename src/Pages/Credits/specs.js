import { applySpec, map, pathOr, pipe, replace } from 'ramda'
import moment from 'moment'

export const buildCardUser = applySpec({
  card_holder_name: pipe(pathOr('', ['card_holder_name'])),
  card_number: pipe(pathOr('', ['card_number']), replace(/\D/g, '')),
  card_expiration_date: pipe(
    pathOr('', ['card_expiration_date']),
    replace(/\D/g, '')
  ),
  card_cvv: pipe(pathOr('', ['card_cvv']))
})

export const buildCredtisToBuy = map(
  applySpec({
    id: pathOr('', ['id']),
    name: pathOr('', ['name']),
    price: pathOr('', ['salePrice']),
    bonus: pipe(
      pathOr('{}', ['description']),
      (value) => JSON.parse(value),
      pathOr('', ['bonus'])
    )
  })
)

export const buildOperations = map(
  applySpec({
    createdAt: pipe(pathOr('', ['createdAt']), (value) =>
      moment(value).format('DD/MM/YYYY, h:mm:ss')
    ),
    userName: pathOr('', ['user', 'name']),
    type: pathOr('', ['type']),
    credits: pathOr('', ['amount'])
  })
)
