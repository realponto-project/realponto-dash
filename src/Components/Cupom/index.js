import React from 'react'
import moment from 'moment'
import ClassNames from 'classnames'
import { add, map, multiply, reduce } from 'ramda'

import styles from './style.module.css'
import { formatPrice } from '../../utils'

const renderItems = ({ amount, id, name, salePrice }) => (
  <tbody key={id}>
    <tr className={styles.top}>
      <td colSpan="3">{name}</td>
    </tr>
    <tr>
      <td>R$ {formatPrice(salePrice)}</td>
      <td>{amount}</td>
      <td>R$ {formatPrice(salePrice * amount)}</td>
    </tr>
  </tbody>
)

const paymentLabel = {
  boleto: 'Boleto',
  card_credit_master: 'Cartão crédito Master',
  card_credit_visa: 'Cartão crédito Visa',
  card_debit_master: 'Cartão débito Master',
  card_debit_visa: 'Cartão débito Visa',
  money: 'Dinheiro'
}

const Cupom = ({ company, customer, discount, items, payment }) => {
  const subTotal = reduce(
    add,
    0,
    map(({ amount, salePrice }) => multiply(amount, salePrice), items)
  )

  return (
    <table id="cupom-content" className={styles.printerTicket}>
      <thead>
        <tr>
          <th className={styles.title} colSpan="3">
            {company.name}
          </th>
        </tr>
        <tr>
          <th colSpan="3">{moment().format('DD/MM/YYYY - LTS')}</th>
        </tr>
        {customer && (
          <tr>
            <th colSpan="3">
              {customer.name} <br />
              {customer.document}
            </th>
          </tr>
        )}
        <tr>
          <th className={styles.ttu} colSpan="3">
            <b>Cupom não fiscal</b>
          </th>
        </tr>
      </thead>
      {map(renderItems, items)}
      <tfoot>
        <tr
          className={ClassNames(
            styles.sup,
            styles.ttu,
            styles.paddingBottomZero
          )}>
          <td colSpan="3">
            <b>Totais</b>
          </td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Sub-total</td>
          <td align="right">R$ {formatPrice(subTotal)}</td>
        </tr>
        {/* <tr className={styles.ttu}>
          <td colSpan="2">Taxa de serviço</td>
          <td align="right">R$4,60</td>
        </tr> */}
        <tr className={styles.ttu}>
          <td colSpan="2">Desconto</td>
          <td align="right">R$ {formatPrice(discount)}</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Total</td>
          <td align="right">R$ {formatPrice(subTotal - discount)}</td>
        </tr>
        <tr className="sup ttu p--0">
          <td colSpan="3">
            <b>Pagamentos</b>
          </td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">{paymentLabel[payment]}</td>
          <td align="right">R$ {formatPrice(subTotal - discount)}</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Total pago</td>
          <td align="right">R$ {formatPrice(subTotal - discount)}</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Troco</td>
          <td align="right">R$ 0,00</td>
        </tr>
        <tr className={styles.sup}>
          <td colSpan="3" align="center">
            <b>Pedido:</b>
          </td>
        </tr>
        <tr className={styles.sup}>
          <td colSpan="3" align="center">
            {company.siteUrl}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default Cupom
