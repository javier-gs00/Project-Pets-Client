import React from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { apiGetProductsByCategory } from '../../api'
import { connect } from 'react-redux'

import {
    addCategoriesProducts,
    startCategoriesRotatingSpinner
} from '../../actions/actions'

const mapStateToProps = ({ categories }) => ({ pathname: categories.pathname })

const mapDispatchToProps = {
    addCategoriesProducts: addCategoriesProducts,
    startCategoriesRotatingSpinner: startCategoriesRotatingSpinner
}

const categoriesGrid = ({ categories, pathname, addCategoriesProducts, startCategoriesRotatingSpinner }) => {
    const sendRequest = e => {
        const route = '/categorias/' + e.currentTarget.id
        // Make a new call to the API only if the user navigates to a new category
        // else do nothing. This allows to keep the filters and active page
        if (route !== pathname) {
            const parameter = e.currentTarget.id.slice(0, -1)
            const query = parameter === 'alimento' ? 'comida' : parameter
            startCategoriesRotatingSpinner()
            return apiGetProductsByCategory(query)
            .then(results => addCategoriesProducts(
                route,
                results.products,
                results.filters
            ))
        } else {
            return false
        }
    }

    const categoryItems = categories.map((categorie, index) => (
            <Link key={index}
                id={categorie.to}
                to={"/categorias/" + categorie.to}
                className={`categorie-item ${pathname === '/categorias/' + categorie.to ? 'categorie-item-active' : null }`}
                onClick={sendRequest}
                >
                <FontAwesomeIcon icon={categorie.icon} size="2x" />
                <span className="categorie-title">{categorie.name}</span>
            </Link>
        )
    )

    return (
        <div className="categories-container">
            <div className="categories-grid">
                { categoryItems }
            </div>
        </div>
    )
}

categoriesGrid.propTypes = {
    pathname: PropTypes.string.isRequired
}

const CategoriesGrid = connect(mapStateToProps, mapDispatchToProps)(categoriesGrid)

export default CategoriesGrid