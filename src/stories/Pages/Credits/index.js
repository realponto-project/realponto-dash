import React from 'react'
import { random, internet, date, commerce } from 'faker'
import moment from 'moment'

import CreditsContainer from '../../../Containers/Credits'

export default {
  title: 'Pages/Creditis',
  component: CreditsContainer
}

const dataSource = new Array(50).fill(null).map((_, key) => ({
  key,
  cratedAt: moment(date.past()).format('LLL'),
  userName: internet.userName(),
  type: random.boolean() ? 'compra' : 'produto',
  descripition: commerce.productDescription(),
  credits: random.number({ max: 1000 }) - 500
}))

const Template = () => <CreditsContainer dataSource={dataSource} />

export const Page = Template.bind({})
