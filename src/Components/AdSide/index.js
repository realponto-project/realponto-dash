import React, { useState } from 'react'
import { Image, Typography, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import styles from './style.module.css'
import Plan from '../../Containers/Plans'

import Deliveries from './deliveries.svg'

const { Title } = Typography
const AdSide = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleCancel = () => {
    setIsVisible(false)
  }

  return (
    <div className={styles.adSideContainer}>
      <Plan
        isVisible={isVisible}
        handleCancel={handleCancel}
        handleOk={console.log}
      />
      <Image
        style={{
          position: 'relative',
          top: '-37px'
        }}
        preview={false}
        width={220}
        src={Deliveries}
      />
      <Title level={4} style={{ paddingBottom: '4px' }}>
        Gestão completa!
      </Title>
      <p>
        Acesso completo e ilimitado, gerencie seu <b>estoque</b> e suas{' '}
        <b>manutenções</b>
      </p>
      <Button onClick={() => setIsVisible(true)} type="primary" block>
        Assine Agora <b> R$9,99/mês</b>
      </Button>
    </div>
  )
}

export default withRouter(AdSide)
