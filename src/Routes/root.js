import OrderAdd from '../Pages/Order/Add'
import OutOrder from '../Pages/Order/OutOrder'
import OrderDetail from '../Pages/Order/Detail'
import OrderManager from '../Pages/Order/Manager'
import CustomerAdd from '../Pages/Customer/Add'
import CustomerDetail from '../Pages/Customer/Detail'
import CustomerManager from '../Pages/Customer/Manager'
import ProductManager from '../Pages/Product/Manager'
import StatusManager from '../Pages/Status/Manager'
import UpdateMyPassword from '../Pages/UpdateMyPassword'
import MyTeam from '../Pages/MyTeam'
import MyInfo from '../Pages/MyInfo'
import PDV from '../Pages/PDV'
import Home from '../Pages/Home'

const RootRoutes = [
  {
    component: OrderAdd,
    title: 'ADICIONAR ORDEM DE ENTRADA',
    path: '/logged/order-inputs',
    exact: true,
    goBack: true
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
    component: CustomerAdd,
    title: 'ADICIONAR CLIENTE',
    path: '/logged/customer/add',
    exact: true,
    goBack: true
  },
  {
    component: CustomerDetail,
    title: 'DETALHES DO CLIENTE',
    path: '/logged/customer/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: PDV,
    title: 'PONTO DE VENDA',
    path: '/logged/pdv',
    exact: true,
    goBack: true
  },
  {
    component: Home,
    title: 'Dashboard',
    path: '/logged/dashboard',
    exact: true,
    goBack: true
  }
]

export default RootRoutes
