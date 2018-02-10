import React from 'react';
import PropTypes from 'prop-types'
// import './header.css'

const Header = props => {
    let text = props.activeRoute.replace('/', '')
    text = text.slice(0,1).toUpperCase() + text.slice(1)
    return (
        <div className="header">
            <span>{text}</span>
        </div>
    )
}

Header.propTypes = {
    activeRoute: PropTypes.string.isRequired
}

export default Header