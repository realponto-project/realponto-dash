import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import { always, applySpec, compose, map, pathOr, pipe, replace } from 'ramda'
import { connect } from 'react-redux'

import CreditsContainer from '../../Containers/Credits'
import { createCardHash } from '../../Services/pagarme'
import { CreateAlxaOperation } from '../../Services/AlxaOperation'
import { getAllAlxaProductService } from '../../Services/AlxaProduct'

// const credtisToBuy = [
//   {
//     id: 1,
//     amount: 50000,
//     price: 5000,
//     isFavorite: true,
//     isActivate: true,
//     bonus: 500
//   },
//   {
//     id: 2,
//     amount: 100000,
//     price: 10000,
//     isFavorite: false,
//     isActivate: false,
//     bonus: 2500
//   },
//   {
//     id: 3,
//     amount: 500000,
//     price: 50000,
//     isFavorite: false,
//     isActivate: false,
//     bonus: 10000
//   }
// ]

const buildCardUser = applySpec({
  card_holder_name: pipe(pathOr('', ['card_holder_name'])),
  card_number: pipe(pathOr('', ['card_number']), replace(/\D/g, '')),
  card_expiration_date: pipe(
    pathOr('', ['card_expiration_date']),
    replace(/\D/g, '')
  ),
  card_cvv: pipe(pathOr('', ['card_cvv']))
})

const Credits = ({ company }) => {
  const [form] = Form.useForm()
  const [credtisToBuy, setCredtisToBuy] = useState([])

  useEffect(() => {
    const getAllAlxaProduct = async () => {
      const { data } = await getAllAlxaProductService({ type: 'credit_buy' })

      console.log(data)
      console.log(
        map(
          applySpec({
            id: pathOr('', ['id']),
            name: pathOr('', ['name']),
            price: pathOr('', ['salePrice']),
            isFavorite: always(true),
            bonus: pathOr('', ['descriptionTest'])
          }),
          data.source
        )
      )

      setCredtisToBuy(
        map(
          applySpec({
            id: pathOr('', ['id']),
            name: pathOr('', ['name']),
            price: pathOr('', ['salePrice']),
            isFavorite: always(true),
            bonus: pathOr('', ['descriptionTest'])
          }),
          data.source
        )
      )
    }

    getAllAlxaProduct()
  }, [])

  const handleSubmit = async (values) => {
    try {
      const cardHash = await createCardHash(buildCardUser(values))

      await CreateAlxaOperation({ ...values, cardHash })

      console.log(cardHash)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CreditsContainer
      dataSource={[]}
      credtisToBuy={credtisToBuy}
      formCreditsBuy={form}
      handleSubmit={handleSubmit}
      balance={company?.goldBalance ?? 0}
    />
  )
}

const mapStateToProps = ({ company }) => ({
  company
})

const enhanced = compose(connect(mapStateToProps))

export default enhanced(Credits)
