import React from 'react'
import styles from '../style.module.css'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Typography,
  DatePicker
} from 'antd'

const { Title } = Typography
const { Paragraph } = Typography

const Formulario = ({ loading, setLoading, onEdit, errorMessage }) => {
  const [form] = Form.useForm()

  const handleDocument = ({ target }) =>
    form.setFieldsValue({
      document: target.value
        .replace(/([^x|X|\d])/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\w)/, '$1-$2')
        .replace(/(-\w{1})\d+?$/, '$1')
    })

  return (
    <>
      <Title level={1} className={styles.textTitleForm}>
        Preencha o formulário com seus dados
      </Title>
      <Card
        style={{
          background: '#FFFFFF'
        }}>
        <Row justify="end">
          <Col>
            <Paragraph className={styles.textPessoalData}>
              Dados pessoais
            </Paragraph>
          </Col>
        </Row>
        <Form
          name="form_onboarding"
          layout="vertical"
          form={form}
          onFinish={() => {
            setLoading(true)
            form
              .validateFields()
              .then((values) => {
                form.resetFields()
                onEdit(values)
              })
              .catch((info) => {
                setLoading(false)
                console.log('Validate Failed:', info)
              })
          }}>
          <Form.Item
            label="Documento RG"
            name="document"
            rules={[{ required: true, message: 'Campo obrigatório' }]}>
            <Input
              onChange={handleDocument}
              maxLength={12}
              placeholder="Ex: 88-888.888-8"
            />
          </Form.Item>

          <Form.Item
            label="Data de nascimento"
            name="birthday"
            rules={[{ required: true, message: 'Campo obrigatório' }]}>
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
              placeholder="Data de nascimento"
            />
          </Form.Item>

          <Form.Item label="Número crachá" name="badget">
            <Input placeholder="Digite o número do crachá" />
          </Form.Item>
        </Form>
        {errorMessage === 'user alredy exist with this document' && (
          <p style={{ color: 'red', textAlign: 'center' }}>
            Erro ao atualizar dados.
          </p>
        )}
      </Card>
      <Button
        form="form_onboarding"
        key="submit"
        htmlType="submit"
        loading={loading}
        type="primary"
        className={styles.buttonLetsGo}>
        Continuar
      </Button>
    </>
  )
}

export default Formulario
