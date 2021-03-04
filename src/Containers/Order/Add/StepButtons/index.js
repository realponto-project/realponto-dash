import React from 'react'
import { Button } from 'antd'

const StepButtons = ({
  current,
  steps,
  next,
  prev,
  done,
}) => (
  <div className="steps-action">
    {current > 0 && (
      <Button style={{ margin: '0 8px 0 0' }} onClick={prev}>
        Voltar
      </Button>
    )}

    {current < steps - 1 && (
      <Button type="primary" onClick={next}>
        Continuar
      </Button>
    )}

    {current === steps - 1 && (
      <Button type="primary" onClick={done}>
        Criar Ordem
      </Button>
    )}
  </div>
)

export default StepButtons
