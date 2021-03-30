/* eslint-disable prefer-promise-reject-errors */
import React from 'react'
import styles from '../style.module.css'
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd'

const { Title } = Typography
const { Paragraph } = Typography

const UpdatePass = ({ onEdit }) => {
  const [form] = Form.useForm()

  // const validatorPassword = (passwordPropName, shouldBeEqual = false) => ({
  //   getFieldValue
  // }) => {
  //   const validator = (rule, value) => {
  //     if (shouldBeEqual) {
  //       if (!value || getFieldValue(passwordPropName) === value) {
  //         return Promise.resolve()
  //       }
  //       return Promise.reject('Senhas não coincidem!')
  //     }

  //     if (value && getFieldValue(passwordPropName) === value) {
  //       return Promise.reject(
  //         'A sua nova senha deve ser diferente da sua senha antiga!'
  //       )
  //     }
  //     return Promise.resolve()
  //   }

  //   return { validator }
  // }

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
                console.log('valuesssssssssss edit', values)
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }}>
          <Form.Item
            label="Senha atual"
            name="password"
            rules={[{ required: true, message: 'Campo obrigatório' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Nova senha"
            name="newPassword"
            rules={[
              // validatorPassword('password', false),
              { required: true, message: 'Campo obrigatório!' }
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Confirmar senha"
            name="confirmPassword"
            rules={[
              // validatorPassword('newPassword', true),
              { required: true, message: 'Campo obrigatório!' }
            ]}>
            <Input />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.buttonLetsGo}>
            Concluir
          </Button>
        </Form>
      </Card>
    </>
  )
}

export default UpdatePass
