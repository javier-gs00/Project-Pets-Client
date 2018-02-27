import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import CategoriesGrid from './categories-grid'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { apiGetProductsByCategory } from '../../api'
import Loading from '../products/loading'

import {
    addCategoriesProducts,
    startCategoriesRotatingSpinner,
    stopCategoriesRotatingSpinner,
    handleCategoriesActivePageChange,
    handleCategoriesFilterChange,
    handleCategoriesSortByPrice
} from '../../actions/actions'

const AsyncProductsDisplay = Loadable({
    loader: () => import('../products/products-display'),
    loading: Loading
})

const AsyncSingleProductView = Loadable({
    loader: () => import('../products/product-view'),
    loading: Loading
})

const mapStateToProps = ({ categories }) => ({
    pathname: categories.pathname,
    products: categories.products,
    isLoading: categories.isLoading,
    activePage: categories.activePage,
    filters: categories.filters
})

const mapDispatchToProps = {
    addCategoriesProducts: addCategoriesProducts,
    startCategoriesRotatingSpinner: startCategoriesRotatingSpinner,
    stopCategoriesRotatingSpinner: stopCategoriesRotatingSpinner,
    handleCategoriesActivePageChange: handleCategoriesActivePageChange,
    handleCategoriesFilterChange: handleCategoriesFilterChange,
    handleCategoriesSortByPrice: handleCategoriesSortByPrice
}

class categories extends React.Component {
    state = {
        categories: [
            {
                name: "Alimentos",
                icon: 'utensils',
                to: 'alimentos'
            }, {
                name: "Medicamentos",
                icon: 'medkit',
                to: 'medicamentos'
            }, {
                name: "Accesorios",
                icon: 'futbol',
                to: 'accesorios'
            }
        ]
    }

    componentDidMount() {
        const {
            history,
            location,
            products,
            pathname,
            getActiveRoute,
            startCategoriesRotatingSpinner,
            addCategoriesProducts
        } = this.props
        getActiveRoute('/categorias')

        const params = location.pathname.split('/')

        // Check for products in the store, in case the user has already navigated in the app
        if (products.length > 0) {
            return history.push(pathname)
        } else if (params.length >= 3) {
            const route = params.length > 3 ? location.pathname.slice(0, -1) : location.pathname
            let param = params[2].slice(0, -1)
            param = param === 'alimento' ? 'comida' : param
            if(/(comida|medicamento|accesorio)/.test(param)) {
                startCategoriesRotatingSpinner()
                return apiGetProductsByCategory(param)
                .then(results => addCategoriesProducts(
                    route,
                    results.products,
                    results.filters
                ))
            } else {
                return history.push('/categorias')
            }
        } else {
            return history.push('/categorias')
        } 
    }

    handleActivePageChange = e => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'})
        this.props.handleCategoriesActivePageChange(e.currentTarget.innerHTML)
    }

    handleFilterChange = e => this.props.handleCategoriesFilterChange(e.target.id)

    handleSort = e => {
        const filterName = e.currentTarget.id
        const nullSort = document.getElementById('null_sort')
        const descSort = document.getElementById('desc_sort')
        const ascSort = document.getElementById('asc_sort')
        switch (filterName) {
            case 'null_sort':
                if (nullSort.classList.contains('filter-svg-item-active')) return false
                descSort.classList.remove('filter-svg-item-active')
                ascSort.classList.remove('filter-svg-item-active')
                nullSort.style.display = 'none'
                return this.props.handleCategoriesSortByPrice('undo')
            case 'desc_sort':
                if (descSort.classList.contains('filter-svg-item-active')) return false
                descSort.classList.add('filter-svg-item-active')
                ascSort.classList.remove('filter-svg-item-active')
                nullSort.style.display = 'flex'
                return this.props.handleCategoriesSortByPrice('desc')
            case 'asc_sort':
                if (ascSort.classList.contains('filter-svg-item-active')) return false
                ascSort.classList.add('filter-svg-item-active')
                descSort.classList.remove('filter-svg-item-active')
                nullSort.style.display = 'flex'
                return this.props.handleCategoriesSortByPrice('asc')
            default:
                return false
        }
    }

    render() {
        const { categories } = this.state
        const {
            pathname,
            products,
            isLoading,
            activePage,
            filters,          
        } = this.props

        // Get the checked store filters and put them in an array
        const activeStoreFilters = filters
            .filter(filter => filter.filterType === 'store')
            .filter(store => store.checked)
            .map(store => store.id)
        // Get the checked pet filters and put them in an array
        const activePetFilters = filters
            .filter(filter => filter.filterType === 'pet')
            .filter(pet => pet.checked)
            .map(pet => pet.id)
        // Get the checked category filters and put them in an array
        const activeCategoryFilters = filters
            .filter(filter => filter.filterType === 'category')
            .filter(category => category.checked)
            .map(category => category.id)
        const totalProductsFoundLength = products.length
        // Get the products matching the active store filters
        const totalProducts = products
            .filter(product => activeStoreFilters.indexOf(product.store) !== -1)
            .filter(product => activePetFilters.indexOf(product.animal) !== -1)
            .filter(product => activeCategoryFilters.indexOf(product.category) !== -1)
        
        // Calculate the available stores, pets and categories after applying filters
        // to create a new filter object with the modified checked attributes
        // This is done to enable or disable the check prop of the input automatically
        const storesAfterFilters = totalProducts
            .map(product => product.store)
            .filter((store, index, self) => self.indexOf(store) === index)
        const petsAfterFilters = totalProducts
            .map(product => product.animal)
            .filter((pet, index, self) => self.indexOf(pet) === index)
        const categoriesAfterFilters = totalProducts
            .map(product => product.category)
            .filter((pet, index, self) => self.indexOf(pet) === index)
        const newFilters = filters
            .map(filter => {
                if (filter.filterType === 'store') {
                    return ({
                        ...filter,
                        checked: storesAfterFilters.indexOf(filter.id) !== -1 ? true : false
                    })   
                } else if (filter.filterType === 'pet') {
                    return ({
                        ...filter,
                        checked: petsAfterFilters.indexOf(filter.id) !== -1 ? true : false
                    })
                } else if (filter.filterType === 'category') {
                    return ({
                        ...filter,
                        checked: categoriesAfterFilters.indexOf(filter.id) !== -1 ? true : false
                    })
                } else {
                    return false
                }
            })

        const filteredProductsFoundLength = totalProducts.length
        // Calculate page ranges
        const start = 20 * (activePage - 1)
        const end =  20 * (activePage - 1) + 20     
        // List of products to render
        const results = totalProducts.slice(start, end)

        return (
            <div id="main" className="main">
                <CategoriesGrid categories={categories} />
                <Switch>
                    <Route path='/categorias/:category/:id' render={ props => 
                        <AsyncSingleProductView {...props} />} 
                    />
                    <Route path="/categorias/:category" render={ props =>                     
                        <AsyncProductsDisplay {...props}
                            isLoading={isLoading}
                            totalProductsFoundLength={totalProductsFoundLength}
                            filteredProductsFoundLength={filteredProductsFoundLength}
                            products={results}
                            path={pathname}
                            activePage={activePage}
                            handleActivePageChange={this.handleActivePageChange}
                            handleFilterChange={this.handleFilterChange}
                            handleSort={this.handleSort}
                            filters={newFilters} /> }
                    />
                    <Route path="/categorias" exact render={ props => 
                        <div className="categories-landing-page">
                            <span>Selecciona una de la categorías para poder ver los productos en vitrina</span>
                        </div>}
                    />
                </Switch>
            </div>
        )
    }
}

categories.propTypes = {
    pathname: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
    activePage: PropTypes.number.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired
}

const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(categories)

export default CategoriesContainer