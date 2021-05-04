import React from 'react'
import { Card, Button, Typography, Row, Col, Tag, Upload, message, Image } from 'antd'
import PieChart from './PieChart'
import SerialNumberList from './SerialNumberList'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { length, pathOr } from 'ramda'
import moment from 'moment'

import AddSerial from './Add'
const { Title } = Typography

const Detail = ({
  productImages,
  product,
  serialData,
  openSerial,
  serialVisible,
  handleCancel,
  handleOkSerial,
  serialVisibleEdit,
  openSerialEdit,
  serialNumberSelected,
  pieChartData,
  handleOkSerialEdit,
  total,
  onChangeTable,
  handleChangeUpload,
  handleUpload,
  loading,
  page
}) => {
  const productStatus = pathOr(false, ['activated'], product)
  const createdAt = moment(pathOr('', ['createdAt'], product)).format(
    'DD/MM/YYYY - HH:mm'
  )

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={11}>
              <p style={{ marginBottom: '4px' }}>Produto</p>
              <Title level={5}>{pathOr(null, ['name'], product)}</Title>
            </Col>
            <Col span={5}>
              <p style={{ marginBottom: '4px' }}>Status</p>
              <Title level={5}>
                <Tag color={productStatus ? '#65A300' : 'rgba(0,0,0,.25)'}>
                  {productStatus ? 'Ativo' : 'Inativo'}
                </Tag>
              </Title>
            </Col>
            <Col span={4}>
              <p style={{ marginBottom: '4px' }}>Qtd disponível</p>
              <Title level={5}>{pathOr(null, ['balance'], product)} </Title>
            </Col>
            <Col span={4}>
              <p style={{ marginBottom: '4px' }}>Criado em</p>
              <Title level={5}>{createdAt}</Title>
            </Col>
          </Row>
        </Card>
      </Col>


      <Col span={18} style={{ height: '550px' }}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Card bordered={false}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    Imagens
                  </Title>
                </Col>
                <Col span={24}>
                  <Row gutter={[10]} style={{ marginTop: '20px' }}>
                    <Col>
                      <Upload 
                        name='file'
                        data={{ productId: product?.id }}
                        listType="picture-card"
                        accept='image/jpg, image/jpeg, image/png'
                        headers={{ Authorization: `Bearer ${localStorage.getItem('token')}` }}
                        fileList={productImages}
                        action={handleUpload} 
                        onChange={handleChangeUpload}
                      >
                        {length(productImages) <= 2 && <UploadOutlined />}
                      </Upload>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={12} >
            <Card bordered={false} style={{height: '100%'}}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    Número de série
                  </Title>
                  <p style={{ marginBottom: 0 }}>
                    Adicione e edite os números de séries
                  </p>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Button onClick={openSerial} icon={<PlusOutlined />}>
                    Adicionar
                  </Button>
                </Col>
                {
                  <AddSerial
                    visible={serialVisible}
                    onCancel={handleCancel}
                    onOk={handleOkSerial}
                  />
                }
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>
              <SerialNumberList
                serialNumberData={serialData}
                serialVisibleEdit={serialVisibleEdit}
                openSerialEdit={openSerialEdit}
                serialNumberSelected={serialNumberSelected}
                onCancel={handleCancel}
                onChangeTable={onChangeTable}
                onOk={handleOkSerialEdit}
                total={total}
                loading={loading}
                page={page}
              />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Card bordered={false} style={{ height: '608px' }}>
          <PieChart pieChartData={pieChartData} />
        </Card>
      </Col>
    </Row>
  )
}

export default Detail
