import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import storage from 'redux-persist/lib/storage'

import Login from './Pages/Login'
import Register from './Pages/Accreditation/Register'
import ForgotPass from './Pages/Accreditation/Register/ForgotPass'
import ResetPass from './Pages/Accreditation/Register/ResetPass'
import Success from './Pages/Accreditation/Register/Success'
import Logged from './Pages/Logged'
import reducers from './Redux/reducers'
import HomePage from './Pages/HomePage'
import Onboarding from './Pages/Onboarding'
import PDV from './Pages/PDV'
import CatalogManager from './Pages/Catalog/Manager'
import CatalogDetails from './Pages/Catalog/Details'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/catalog/:nickName" component={CatalogManager} />
          <Route
            path="/catalog-product/:productId"
            component={CatalogDetails}
          />
          <Route exact path="/welcome-member/:token" component={Onboarding} />
          <Route path="/login" component={Login} />
          <Route exact path="/register/sucess" component={Success} />
          <Route path="/register" component={Register} />
          <Route path="/forgotPass" component={ForgotPass} />
          <Route path="/reset-password/:token" component={ResetPass} />
          <Route path="/logged" component={Logged} />
          <Route path="/pdv" component={PDV} />
          <Redirect from="*" to="/login" />
        </Switch>
      </PersistGate>
    </Provider>
  )
}

export default App
