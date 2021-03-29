import React from 'react'
import HomeContainer from '../../Containers/Home'

const dataPieChart = [{ name: 'Vendas', value: 400 }]
const dataBarChart = [
  {
    name: '10/03/2021',
    resumeDate: '01',
    total: 4000
  },
  {
    name: '11/03/2021',
    resumeDate: '02',
    total: 3000
  },
  {
    name: '12/03/2021',
    resumeDate: '03',
    total: 2000
  },
  {
    name: '13/03/2021',
    resumeDate: '04',
    total: 2780
  },
  {
    name: '14/03/2021',
    resumeDate: '05',
    total: 1890
  },
  {
    name: '15/03/2021',
    resumeDate: '06',
    total: 2390
  },
  {
    name: '10/03/2021',
    resumeDate: '07',
    total: 4000
  },
  {
    name: '11/03/2021',
    resumeDate: '08',
    total: 3000
  },
  {
    name: '12/03/2021',
    resumeDate: '09',
    total: 2000
  },
  {
    name: '13/03/2021',
    resumeDate: '10',
    total: 2780
  },
  {
    name: '14/03/2021',
    resumeDate: '11',
    total: 1890
  },
  {
    name: '15/03/2021',
    resumeDate: '12',
    total: 2390
  },
  {
    name: '10/03/2021',
    resumeDate: '13',
    total: 4000
  },
  {
    name: '11/03/2021',
    resumeDate: '14',
    total: 3000
  },
  {
    name: '12/03/2021',
    resumeDate: '15',
    total: 2000
  }
]

const Home = () => (
  <HomeContainer
    dataBarChart={dataBarChart}
    dataPieChart={dataPieChart}
    customers={{ value: 200 }}
    orders={{ value: 800 }}
  />
)

export default Home
