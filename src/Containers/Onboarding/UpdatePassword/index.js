/* eslint-disable prefer-promise-reject-errors */
import React from 'react'
import styles from '../style.module.css'
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd'

const { Title } = Typography
const { Paragraph } = Typography

const UpdatePass = ({ onEdit }) => {
  const [form] = Form.useForm()

  const validatorPassword = (passwordPropName, shouldBeEqual = false) => ({
    getFieldValue
  }) => {
    const validator = (rule, value) => {
      if (shouldBeEqual) {
        if (!value || getFieldValue(passwordPropName) === value) {
          return Promise.resolve()
        }
        return Promise.reject('Senhas não coincidem!')
      }

      if (value && getFieldValue(passwordPropName) === value) {
        return Promise.reject(
          'A sua nova senha deve ser diferente da sua senha antiga!'
        )
      }
      return Promise.resolve()
    }

    return { validator }
  }

  return (
    <>
      <Title level={1} className={styles.textTitleForm}>
        Atualize sua senha
      </Title>
      <Card
        style={{
          background: '#FFFFFF'
        }}>
        <Row justify="end">
          <Col>
            <Paragraph className={styles.textPessoalData}>
              Dados de segurança
            </Paragraph>
          </Col>
        </Row>
        <Form
          name="form_update_password_onboarding"
          layout="vertical"
          form={form}
          onFinish={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields()
                onEdit(values)
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }}>
          <Form.Item
            label="Senha atual"
            name="password"
            rules={[{ required: true, message: 'Campo obrigatório' }]}>
            <Input.Password placeholder='Insira sua senha atual' />
          </Form.Item>

          <Form.Item
            label="Nova senha"
            name="newPassword"
            rules={[
              validatorPassword('password', false),
              { required: true, message: 'Campo obrigatório!' }
            ]}>
            <Input.Password placeholder='Insira sua nova senha'/>
          </Form.Item>

          <Form.Item
            label="Confirmar senha"
            name="confirmPassword"
            rules={[
              validatorPassword('newPassword', true),
              { required: true, message: 'Campo obrigatório!' }
            ]}>
            <Input.Password placeholder='Confirme sua senha' />
          </Form.Item>
        </Form>
      </Card>
      <Button
        form="form_update_password_onboarding"
        key="submit"
        htmlType="submit"
        type="primary"
        className={styles.buttonLetsGo}>
        Concluir
      </Button>
    </>
  )
}

export default UpdatePass
