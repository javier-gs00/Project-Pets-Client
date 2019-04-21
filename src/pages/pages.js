import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loader from '../components/loader/loader'

const AsyncProductsPage = Loadable({
  loader: () => import(/* webpackChunkName: "products_page" */ './products/products'),
  loading: Loader
})

const AsyncCategoriesPage = Loadable({
  loader: () => import(/* webpackChunkName: "categories_page" */ './categories/categories'),
  loading: Loader
})

const AsyncStoresPage = Loadable({
  loader: () => import(/* webpackChunkName: "stores_page" */ './stores/stores'),
  loading: Loader
})

const AsyncStorePage = Loadable({
  loader: () => import(/* webpackChunkName: "store_page" */ './store/store'),
  loading: Loader
})

const AsyncMenuPage = Loadable({
  loader: () => import(/* webpackChunkName: "menu_page" */ './menu/menu'),
  loading: Loader
})

const Pages = ({ getActiveRoute }) => {
  return (
    <Switch>
      <Redirect exact from="/" to="/productos" />
      <Route
        path="/productos"
        render={props => <AsyncProductsPage getActiveRoute={getActiveRoute} {...props} />}
      />
      <Route
        path="/categorias"
        render={props => <AsyncCategoriesPage getActiveRoute={getActiveRoute} {...props} />}
      />
      <Route
        exact
        path="/tiendas"
        render={props => <AsyncStoresPage getActiveRoute={getActiveRoute} {...props} />}
      />
      <Route
        path="/tiendas/:name"
        render={props => <AsyncStorePage getActiveRoute={getActiveRoute} {...props} />}
      />
      <Route
        exact
        path="/menu"
        render={props => <AsyncMenuPage getActiveRoute={getActiveRoute} {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  )
}

export default Pages
