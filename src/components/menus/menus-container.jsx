import React, { Component } from 'react'
import PropTypes from 'prop-types'

import About from './about'
import TermsOfUse from './terms-of-use'
import AppVersion from './app-version'

class Menus extends Component {
    static propTypes = {
        getActiveRoute: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    }

    componentDidMount() {
        const { location } = this.props
        return this.props.getActiveRoute(location.pathname)
    }

    handleInputChange = e => this.setState({ searchValue: e.target.value })

    render() {
        return (
            <div>
                <About />
                <TermsOfUse />
                <AppVersion />
            </div>
        )
    }
}

export default Menus