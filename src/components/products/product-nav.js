import React from 'react'
import PropTypes from 'prop-types'

const ProductNav = ({ pages }) => ( 
    <div className="products-nav-container" id="products-nav">
        <div className="products-nav">
            { pages.map(button => button) }
        </div>
    </div>
)

ProductNav.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.object)
}

export default ProductNav