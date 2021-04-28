import React from 'react'
import { Card, Col, Image, Row } from 'antd'
import { map } from 'ramda'

import emptySvg from '../../../Assets/empty.svg'

import logo from '../../../Assets/logo.svg'
import style from './style.module.css'

const CardProduct = (handleClickCard) => ({
  id,
  price,
  name,
  description,
  urlImage
}) => (
  <Col span={6} xs={24} sm={12} md={6} lg={6} key={id}>
    <div className={style.wrapperCard}>
      <Card
        onClick={() => handleClickCard(id)}
        hoverable
        style={{ width: 200 }}>
        <div className={style.cardContent}>
          <div className={style.wrapperImage}>
            <Image preview={false} src={urlImage || emptySvg} alt="product" />
          </div>

          <label>{price}</label>
          <label>{name}</label>
          <p>{description}</p>
        </div>
      </Card>
    </div>
  </Col>
)

const CatalogDetails = ({
  company,
  product,
  outherProducts,
  handleClickCard
}) => {
  return (
    <Row gutter={[35, 20]} style={{ maxWidth: 968, margin: 'auto' }}>
      <Col span={24}>
        <Image src={logo} alt="logo-alxa" preview={false} width={160} />
      </Col>

      <Col span={24} sm={12}>
        <Image
          src={product?.imageUrl ?? emptySvg}
          alt="product"
          preview={false}
        />
      </Col>

      <Col span={24} sm={12}>
        <div className={style.contentDetails}>
          <h3>{product?.name}</h3>
          <h2>{product?.price}</h2>
          <p>{product?.description}</p>

          <label>{company?.name}</label>
          <br />
          {company?.address && (
            <p>
              {company.address.street}, {company.address.streetNumber},{' '}
              {company.address.neighborhood}, {company.address.city} -{' '}
              {company.address.state}, {company.address.zipcode},
            </p>
          )}
        </div>
      </Col>

      <Col span={24}>
        <h1 className={style.otherTitle}>Outros produtos dessa loja</h1>
      </Col>

      {map(CardProduct(handleClickCard), outherProducts)}
    </Row>
  )
}

export default CatalogDetails
