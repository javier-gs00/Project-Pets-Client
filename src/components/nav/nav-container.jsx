import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './nav.css'

// import NavSearchIcon from '../../assets/svg/nav.search.js';
import NavProductsIcon from '../../assets/svg/nav.products.js';
import NavStoresIcon from '../../assets/svg/nav.stores.js';
// import NavLoginIcon from '../../assets/svg/nav.login.js';
import NavMenuIcon from '../../assets/svg/nav.menu.js';
import NavItem from './nav-item'

// set the width of the svg
const strokeWidth = '.53'

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
                    svg: <NavProductsIcon strokeWidth={strokeWidth} />
                },{
                    to: '/tiendas',
                    textDisplay: 'Tiendas',
                    svg: <NavStoresIcon strokeWidth={strokeWidth} />
                },{
                    to: '/menu',
                    textDisplay: 'Menú',
                    svg: <NavMenuIcon strokeWidth={strokeWidth} />
                }
            ]
        }
    }

    // componentDidMount() {
    //     return console.log(this.props.activeRoute)
    // }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeRoute !== nextProps.activeRoute) {
            return this.setState({ activeRoute: nextProps.activeRoute })
        }
    }

    render() {
        const { activeRoute } = this.state 
        const links = this.state.links.map((link, index) => {
            if (activeRoute === link.to) {
                return (
                    <NavItem
                        match={true}
                        key={index}
                        to={link.to}
                        textDisplay={link.textDisplay}
                        svg={link.svg}/>
                )
            } else {
                return (
                    <NavItem
                        match={false}
                        key={index}
                        to={link.to}
                        textDisplay={link.textDisplay}
                        svg={link.svg}/>
                )
            }
        })

        return (
            <div className="navbar bg-white">
                { links }
            </div>
        )
    }
}

export default Nav