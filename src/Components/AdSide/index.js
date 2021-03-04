import React from 'react'
import { Image, Typography, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import styles from './style.module.css'

import Deliveries from './deliveries.svg'

const { Title } = Typography
const AdSide = ({
  history,
}) => {
  const gotoPlan = () => history.push('/logged/plans')
  return (
    <div className={styles.adSideContainer}>
      <Image
        style={{
          position: 'relative',
          top: '-37px'
        }}
        width={220}
        src={Deliveries}
      />
      <Title level={4} style={{ paddingBottom: '4px' }}>Gestão completa!</Title>
      <p>Acesso completo e ilimitado, gerencie seu <b>estoque</b> e suas <b>manutenções</b></p>
      <Button onClick={gotoPlan} type="primary" block>Assine Agora <b> R$9,99/mês</b></Button>
    </div>
  )
}

export default withRouter(AdSide)
