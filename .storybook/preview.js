import React from 'react'
import 'moment/locale/pt-br'
import fake from 'faker'
import ptBR from 'antd/lib/locale/pt_BR'
import 'antd/dist/antd.css'
import { ConfigProvider, Empty,Image } from 'antd'

import NoData from '../src/Assets/noData.svg'

fake.locale = 'pt_PT'

export const decorators = [
  (Story) => (
    <ConfigProvider locale={ptBR}
    renderEmpty={() => (
      <Empty
        description="Não há dados"
        image={<Image width={85} src={NoData} preview={false} />}
      />
    )}>
      <Story />
    </ConfigProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
