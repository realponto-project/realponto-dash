import React from 'react'
import styles from './style.module.css'
import moment from 'moment'
import { length, pathOr } from 'ramda'

const Print = ({ orderSelected }) => {
  return (
    <table className={styles.tablePrint}>
      {orderSelected && orderSelected.map((item, index) => (
        <>
          {index === 0 && <thead>
            <tr>
              <th style={{ padding: '10px' }}>
                <span className={styles.labelTable}>Colaborador</span>
                {pathOr('', ['user', 'name'], item)}
              </th>
              <th></th>
              <th>
                <span className={styles.labelTable}>Data</span>{moment(item.createdAt).format('DD/MM/YYYY')}
              </th>
            </tr>
            <tr className={styles.tr1}>
              <th>
                Cliente
            </th>
              <th>
                Produtos
            </th>
              <th style={{ textAlign: "center" }}>Quantidade</th>
            </tr>
          </thead>}

          {item.transactions.map(transactionItem => (
            <tbody>
              <tr className={styles.tr2}>
                <td style={{ width: "40%" }}>
                  {item.customer}
                </td>
                <td style={{ width: "50%" }}>{transactionItem.product.name} </td>
                <td style={{ textAlign: "center" }}>{`${transactionItem.quantity} und`}</td>
              </tr>
            </tbody>
          ))
          }

          {index === length(orderSelected) - 1 && <tfoot className={styles.footer}>
            <tr className={styles.tr4}>
              <td>
                <span className={styles.signature}></span>
                <span className={styles.labelTable}>Colaborador</span>
                {pathOr('', ['user', 'name'], item)}
              </td>
            </tr>
          </tfoot>}
        </>
      ))}
    </table>
  )
}

export default Print
