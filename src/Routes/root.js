import OrderAdd from '../Pages/Order/Add'
import OutOrder from '../Pages/Order/OutOrder'
import OrderDetail from '../Pages/Order/Detail'
import OrderManager from '../Pages/Order/Manager'
import CustomerManager from '../Pages/Customer/Manager'
import ProductManager from '../Pages/Product/Manager'
import StatusManager from '../Pages/Status/Manager'
import UpdateMyPassword from '../Pages/UpdateMyPassword'
import MyTeam from '../Pages/MyTeam'
import Onboarding from '../Pages/Onboarding'
import MyInfo from '../Pages/MyInfo'
import Home from '../Pages/Home'
import PDV from '../Pages/PDV'

const RootRoutes = [
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
    exact: true,
  },
  {
    component: MyInfo,
    title: 'MINHA CONTA',
    path: '/logged/account-myinfo',
    exact: true,
    goBack: true
  },
  {
    component: StatusManager,
    title: 'STATUS',
    path: '/logged/config/status',
    exact: true,
    goBack: true
  },
  {
    component: MyTeam,
    title: 'MINHA EQUIPE',
    path: '/logged/account-myteam',
    exact: true,
    goBack: true
  },
  {
    component: UpdateMyPassword,
    title: 'ALTERAR SENHA',
    path: '/logged/account-password',
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
    exact: true,
  },
  {
    component: PDV,
    title: 'PONTO DE VENDA',
    path: '/logged/pdv',
  },
]

export default RootRoutes
