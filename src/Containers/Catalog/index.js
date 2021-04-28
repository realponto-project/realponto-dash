import React from 'react'
import { Card, Col, Dropdown, Image, Input, Menu, Pagination, Row } from 'antd'
import { map } from 'ramda'
import { DownOutlined } from '@ant-design/icons'

import emptySvg from '../../Assets/empty.svg'

import logo from '../../Assets/logo.svg'
import style from './style.module.css'

const cardHeaderStyle = {
  backgroundColor: 'rgba(42, 66, 131, 1)',
  borderRadius: 8
}

const CardProduct = ({ id, price, name, description, urlImage }) => (
  <Col span={6} xs={24} sm={12} md={8} lg={6} key={id}>
    <div className={style.wrapperCard}>
      <Card hoverable style={{ width: 250 }}>
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
    <Row gutter={[35, 20]} style={{ maxWidth: 968, margin: 'auto' }}>
      <Col span={24}>
        <Image src={logo} alt="logo-alxa" preview={false} width={160} />
      </Col>

      <Col span={24}>
        <Card bodyStyle={cardHeaderStyle}>
          <div className={style.cardContentHeader}>
            <h2>Catálogo de produtos</h2>
            <p>Vejas os produtos recomendados para você!</p>
          </div>
        </Card>
      </Col>

      <Col span={24}>
        <div className={style.wrapperCompanyData}>
          <h1>{company?.name}</h1>
          {company?.address && (
            <p>
              {company.address.street}, {company.address.streetNumber},{' '}
              {company.address.neighborhood}, {company.address.city} -{' '}
              {company.address.state}, {company.address.zipcode},
            </p>
          )}
          <p>{company?.phone}</p>
        </div>
      </Col>

      <Col span={24}>
        <Row justify="space-between" align="center" gutter={50}>
          <Col flex="auto">
            <Input.Search
              defaultValue={searchValue}
              placeholder="Buscar..."
              onSearch={handleSearch}
              allowClear
            />
          </Col>
          <Col>
            <Dropdown overlay={menu(handleClickFilter)}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}>
                Filtrar <DownOutlined />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Col>

      {map(CardProduct, productList)}

      <Col span={24}>
        <Row align="end">
          <Pagination
            current={page}
            defaultCurrent={1}
            defaultPageSize={24}
            pageSize={24}
            total={count}
            onChange={handleChangePage}
          />
        </Row>
      </Col>
    </Row>
  )
}

export default Catalog
