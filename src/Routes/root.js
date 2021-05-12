import OrderAdd from '../Pages/Order/Add'
import OutOrder from '../Pages/Order/OutOrder'
import OrderDetail from '../Pages/Order/Detail'
import OrderManager from '../Pages/Order/Manager'
import CustomerManager from '../Pages/Customer/Manager'
import ProductManager from '../Pages/Product/Manager'
import Onboarding from '../Pages/Onboarding'
import MyInfo from '../Pages/MyInfo'
import Home from '../Pages/Home'
import PDV from '../Pages/PDV'
import Report from '../Pages/Report'
import ProductDetail from '../Pages/Product/Detail'
import Credits from '../Pages/Credits'
import Settings from '../Pages/Settings'

const RootRoutes = [
  {
    component: Credits,
    title: 'GERENCIAMENTO DE CRÉDITOS',
    path: '/logged/credits/manager',
    exact: true,
    goBack: true
  },
  {
    component: Settings,
    title: 'Configurações',
    path: '/logged/settings',
    exact: false,
    goBack: true
  },
  {
    component: OrderAdd,
    title: 'ADICIONAR ORDEM DE ENTRADA',
    path: '/logged/order-inputs',
    exact: true,
    goBack: true
  },
  {
    component: Onboarding,
    path: '/user/onboarding',
    exact: true
  },
  {
    component: MyInfo,
    title: 'MINHA CONTA',
    path: '/logged/account-myinfo',
    exact: true,
    goBack: true
  },
  {
    component: OutOrder,
    title: 'ADICIONAR ORDEM DE SAÍDA',
    path: '/logged/order-outputs',
    exact: true,
    goBack: true
  },
  {
    component: OrderDetail,
    title: 'DETALHES DA ORDEM',
    path: '/logged/order/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: OrderManager,
    title: 'ORDENS',
    path: '/logged/order/manager',
    exact: true,
    goBack: false
  },
  {
    component: ProductManager,
    title: 'PRODUTOS',
    path: '/logged/product/manager',
    exact: true,
    goBack: false
  },
  {
    component: ProductDetail,
    title: 'DETALHES DO PRODUTO',
    path: '/logged/product/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: CustomerManager,
    title: 'CLIENTES',
    path: '/logged/customer/manager',
    exact: true,
    goBack: false
  },
  {
    component: Home,
    title: 'DASHBOARD',
    path: '/logged/dashboard',
    exact: true
  },
  {
    component: PDV,
    title: 'PONTO DE VENDA',
    path: '/pdv',
    goBack: true
  },
  {
    component: Report,
    title: 'ORDENS CONSOLIDADAS',
    path: '/logged/order/report',
    goBack: true
  }
]

export default RootRoutes
