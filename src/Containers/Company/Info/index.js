import React from 'react'
import { 
  Card, 
  Typography, 
  Upload, 
  Form, 
  Input,
  Button,
  Row, 
  Col
} from "antd"

const { Title } = Typography
const fileList = [{
  uid: '-1',
  name: 'image.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}]

const Info = () => {
  return (
    <Card bordered={false}>
      <Title level={5}>Informações da empresa</Title>
      <Row>
        <Col span={4}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={() => console.log('>>> onChange')}
            onPreview={() => console.log('>> onPreview')}
          />
        </Col>
        <Col span={20}>
          <Form 
            layout='vertical'
          >
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item label="Razão social">
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Nome fantasia">
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Cnpj">
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email principal">
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Tag da loja">
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Form.Item >
                  <Button type="primary">Salvar</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

export default Info
