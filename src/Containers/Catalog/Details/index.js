import React from 'react'
import { Card, Carousel, Col, Image, Row } from 'antd'
import { length, map } from 'ramda'

import emptySvg from '../../../Assets/empty.svg'
import logo from '../../../Assets/logo.svg'
import ProductCard from '../../../Components/ProductCard'

import styles from './style.module.css'

const CatalogDetails = ({ company, product, outherProducts }) => {
  return (
    <Row style={{ backgroundColor: '#F2F2F3', minHeight: '100vh' }}>
      <Row gutter={[35, 20]} style={{ maxWidth: 1200, margin: '10px auto' }}>
        <Col span={24} style={{ marginBottom: 20 }}>
          <Image src={logo} alt="logo-alxa" preview={false} width={160} />
        </Col>

        <Col span={24}>
          <Card>
            <Row>
              <Col span={24} md={12}>
                {length(product.images) === 0 ? (
                  <Row
                    justify="center"
                    align="middle"
                    style={{
                      width: '100%',
                      height: 450
                    }}>
                    <Image
                      style={{
                        maxWidth: 256,
                        maxHeight: 256,
                        width: 'auto',
                        height: 'auto'
                      }}
                      src={emptySvg}
                      alt="empty"
                      preview={false}
                    />
                  </Row>
                ) : (
                  <div className={styles.wrapperCarousel}>
                    <Carousel autoplay dots={{ className: styles.dots }}>
                      {map(
                        ({ url, alt }) => (
                          <div className={styles.wrapperImageMain}>
                            <Image
                              style={{
                                maxWidth: 450,
                                maxHeight: 450,
                                width: 'auto',
                                height: 'auto'
                              }}
                              src={url}
                              alt={alt}
                              preview={false}
                            />
                          </div>
                        ),
                        product.images
                      )}
                    </Carousel>
                  </div>
                )}
              </Col>

              <Col span={24} md={12}>
                <Row
                  justify="space-between"
                  align="end"
                  style={{ height: '100%' }}>
                  <Col span={24}>
                    <h3 className={styles.productName}>{product?.name}</h3>
                    <h2 className={styles.productPrice}>{product?.price}</h2>
                    <p className={styles.productDescription}>
                      {product?.description}
                    </p>
                  </Col>

                  <Col span={24}>
                    <Row align="bottom" style={{ height: '100%' }}>
                      <label className={styles.companyName}>
                        {company?.name}
                      </label>
                      <br />
                      {company?.address && (
                        <p className={styles.companyAddress}>
                          {company.address.street},{' '}
                          {company.address.streetNumber},{' '}
                          {company.address.neighborhood}, {company.address.city}{' '}
                          - {company.address.state}, {company.address.zipcode},
                        </p>
                      )}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <h1 className={styles.otherTitle}>Outros produtos dessa loja:</h1>
        </Col>

        {map(ProductCard, outherProducts)}
      </Row>
    </Row>
  )
}

export default CatalogDetails
