import React from 'react'
import ClassNames from 'classnames'
import styles from './style.module.css'

const Cupom = ({ company, customer, items }) => {
  return (
    <table className={styles.printerTicket}>
      <thead>
        <tr>
          <th className={styles.title} colSpan="3">
            Company Name
          </th>
        </tr>
        <tr>
          <th colSpan="3">17/11/2015 - 11:57:52</th>
        </tr>
        <tr>
          <th colSpan="3">
            Nome do cliente <br />
            000.000.000-00
          </th>
        </tr>
        <tr>
          <th className={styles.ttu} colSpan="3">
            <b>Cupom não fiscal</b>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.top}>
          <td colSpan="3">Doce de brigadeiro</td>
        </tr>
        <tr>
          <td>R$7,99</td>
          <td>2.0</td>
          <td>R$15,98</td>
        </tr>
      </tbody>
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
          <td align="right">R$43,60</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Taxa de serviço</td>
          <td align="right">R$4,60</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Desconto</td>
          <td align="right">5,00%</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Total</td>
          <td align="right">R$45,56</td>
        </tr>
        <tr className="sup ttu p--0">
          <td colSpan="3">
            <b>Pagamentos</b>
          </td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Dinheiro</td>
          <td align="right">R$10,00</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Total pago</td>
          <td align="right">R$10,00</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Troco</td>
          <td align="right">R$0,00</td>
        </tr>
        <tr className={styles.sup}>
          <td colSpan="3" align="center">
            <b>Pedido:</b>
          </td>
        </tr>
        <tr className={styles.sup}>
          <td colSpan="3" align="center">
            www.company-site.com
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default Cupom
