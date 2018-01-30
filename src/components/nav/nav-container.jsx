import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './nav.css'

import NavItem from './nav-item'


class Nav extends Component {
    static propTypes = {
        activeRoute: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            activeRoute: this.props.activeRoute || '',
            links: [
                {
                    to: '/productos',
                    textDisplay: 'Productos',
                },{
                    to: '/tiendas',
                    textDisplay: 'Tiendas',
                },{
                    to: '/menu',
                    textDisplay: 'Menú',
                }
            ]
        }
    }

    componentWillReceiveProps = nextProps => this.props.activeRoute !== nextProps.activeRoute 
        ? this.setState({ activeRoute: nextProps.activeRoute }) 
        : false

    render() {
        const { activeRoute } = this.state 
        const links = this.state.links.map((link, index) => (
            <NavItem
                routeMatch={activeRoute === link.to ? true : false}
                key={index}
                route={link.to}
                textDisplay={link.textDisplay}
                stroke={activeRoute === link.to ? true : false} />
        ))

        return (
            <div className="navbar bg-white">
                { links }
            </div>
        )
    }
}

export default Nav