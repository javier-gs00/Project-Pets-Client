import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NavItem from './nav-item'

const mapStateToProps = state => ({
    pathname: state.products.pathname
})

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoute: this.props.activeRoute || '',
            links: [
                {
                    to: '/productos',
                    svg: 'productos',
                    textDisplay: 'Productos',
                },{
                    to: '/tiendas',
                    svg: 'tiendas',
                    textDisplay: 'Tiendas',
                },{
                    to: '/menu',
                    svg: 'menu',
                    textDisplay: 'Menú',
                }
            ]
        }
    }

    componentWillReceiveProps = nextProps => this.props.activeRoute !== nextProps.activeRoute 
        ? this.setState({ activeRoute: nextProps.activeRoute }) 
        : false

    render() {
        const { activeRoute, links } = this.state 
        const { pathname } = this.props

        return (
            <div className="navbar bg-white">
                { links.map((link, index) => (
                    <NavItem
                        routeMatch={activeRoute === link.to ? true : false}
                        key={index}
                        route={link.to === '/productos' ? pathname : link.to}
                        textDisplay={link.textDisplay}
                        svg={link.svg}
                        stroke={activeRoute === link.to ? true : false} />
                )) }
            </div>
        )
    }
}

Nav.propTypes = {
    activeRoute: PropTypes.string.isRequired
}

const NavContainer = connect(mapStateToProps)(Nav)

export default NavContainer