import React from 'react'
import { Card, Col, Dropdown, Image, Input, Menu, Pagination, Row } from 'antd'
import { map } from 'ramda'
import { DownOutlined } from '@ant-design/icons'

import logo from '../../../Assets/logo.svg'
import ProductCard from '../../../Components/ProductCard'
import emptySvg from '../../../Assets/empty.svg'

import styles from './style.module.css'

const cardHeaderStyle = {
  backgroundColor: 'rgba(42, 66, 131, 1)',
  borderRadius: 8
}

const menu = (handleClickFilter) => (
  <Menu>
    <Menu.Item onClick={() => handleClickFilter(['salePrice', 'DESC'])} key="0">
      Maior preço
    </Menu.Item>
    <Menu.Item onClick={() => handleClickFilter(['salePrice', 'ASC'])} key="1">
      Menor preço
    </Menu.Item>
  </Menu>
)

const Catalog = ({
  productList,
  company,
  count,
  searchValue,
  handleChangePage,
  handleSearch,
  page,
  handleClickFilter
}) => {
  return (
    <Row style={{ backgroundColor: '#F2F2F3', minHeight: '100vh' }}>
      <Row gutter={[35, 20]} style={{ maxWidth: 1200, margin: '10px auto' }}>
        <Col span={24}>
          <Image src={logo} alt="logo-alxa" preview={false} width={160} />
        </Col>

        <Col span={24}>
          <Card bodyStyle={cardHeaderStyle}>
            <h2 className={styles.headerTitle}>Catálogo de produtos</h2>
            <p className={styles.headerText}>
              Vejas os produtos recomendados para você!
            </p>
          </Card>
        </Col>

        <Col span={24}>
          <Row align="middle" gutter={10}>
            {company?.logo?.url && (
              <Col>
                <Image
                  wrapperClassName={styles.wrapperImageLogo}
                  width="2.5rem"
                  src={company?.logo?.url ?? emptySvg}
                  alt={company?.logo?.name ?? 'empyt'}
                />
              </Col>
            )}
            <Col>
              <h1 className={styles.companyName}>{company?.name}</h1>
            </Col>
          </Row>
          {company?.address && (
            <p className={styles.companyInfo}>
              {company.address.street}, {company.address.streetNumber},{' '}
              {company.address.neighborhood}, {company.address.city} -{' '}
              {company.address.state}, {company.address.zipcode},
            </p>
          )}
          <p className={styles.companyInfo}>{company?.phone}</p>
        </Col>

        <Col span={24}>
          <Card style={{ borderRadius: 10 }}>
            <Row justify="space-between" align="middle" gutter={50}>
              <Col flex="auto">
                <Input.Search
                  defaultValue={searchValue}
                  placeholder="Buscar..."
                  onSearch={handleSearch}
                  allowClear
                />
              </Col>
              <Col>
                <Dropdown trigger={['click']} overlay={menu(handleClickFilter)}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}>
                    Ordenar <DownOutlined />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Card>
        </Col>

        {map(ProductCard, productList)}

        <Col span={24}>
          <Row align="end">
            <Card style={{ borderRadius: 10 }}>
              <Pagination
                current={page}
                defaultCurrent={1}
                defaultPageSize={24}
                onChange={handleChangePage}
                pageSize={24}
                total={count}
              />
            </Card>
          </Row>
        </Col>
      </Row>
    </Row>
  )
}

export default Catalog
